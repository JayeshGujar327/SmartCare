import { db } from './db';
import {
  NotificationChannel,
  NotificationType,
  NotificationLog,
  Language,
  PatientProfile,
  VaccinationScheduleItem,
  MedicineItem
} from '../src/types';

export class NotificationService {
  /**
   * Send or log a simulated/live multi-channel notification
   */
  public static async dispatchNotification(
    userId: string,
    type: NotificationType,
    channel: NotificationChannel,
    title: string,
    message: string,
    recipient: string,
    patientId?: string,
    patientName?: string
  ): Promise<NotificationLog> {
    const log: NotificationLog = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId,
      patientId,
      patientName,
      type,
      channel,
      title,
      message,
      scheduledFor: new Date().toISOString(),
      sentAt: new Date().toISOString(),
      status: 'DELIVERED',
      recipient
    };

    db.notificationLogs.unshift(log);
    // Keep max 100 recent logs
    if (db.notificationLogs.length > 100) {
      db.notificationLogs = db.notificationLogs.slice(0, 100);
    }

    return log;
  }

  /**
   * Trigger reminders for upcoming/due vaccines and today's medicines
   */
  public static async generateDailyReminders(userId: string): Promise<{ createdCount: number }> {
    const user = db.users.find(u => u.id === userId);
    if (!user) return { createdCount: 0 };

    const prefs = db.preferences[userId] || {
      userId,
      smsEnabled: true,
      whatsappEnabled: true,
      emailEnabled: true,
      voiceEnabled: false,
      inAppEnabled: true,
      reminderIntervalsDays: [10, 7, 5, 1],
      preferredLanguage: user.preferredLanguage || 'en'
    };

    const userPatients = db.patients.filter(p => p.userId === userId);
    let createdCount = 0;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    for (const patient of userPatients) {
      const scheduleItems = db.scheduleItems.filter(i => i.patientId === patient.id);

      for (const item of scheduleItems) {
        if (item.status === 'COMPLETED') continue;

        const expDate = new Date(item.expectedDate);
        const diffDays = Math.round((expDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

        // Check if matching interval or due today or missed
        if (diffDays === 0 || prefs.reminderIntervalsDays.includes(diffDays) || diffDays < 0) {
          const { title, message } = this.formatVaccineMessage(patient, item, diffDays, prefs.preferredLanguage);

          if (prefs.whatsappEnabled) {
            await this.dispatchNotification(
              userId,
              diffDays < 0 ? 'MISSED_VACCINE_ALERT' : 'VACCINATION_REMINDER',
              'WHATSAPP',
              title,
              message,
              `${user.mobile} (WhatsApp)`,
              patient.id,
              patient.name
            );
            createdCount++;
          }

          if (prefs.smsEnabled) {
            await this.dispatchNotification(
              userId,
              diffDays < 0 ? 'MISSED_VACCINE_ALERT' : 'VACCINATION_REMINDER',
              'SMS',
              title,
              message,
              `${user.mobile} (SMS)`,
              patient.id,
              patient.name
            );
            createdCount++;
          }

          if (prefs.inAppEnabled) {
            await this.dispatchNotification(
              userId,
              diffDays < 0 ? 'MISSED_VACCINE_ALERT' : 'VACCINATION_REMINDER',
              'IN_APP',
              title,
              message,
              'In-App Notification Center',
              patient.id,
              patient.name
            );
            createdCount++;
          }
        }
      }

      // Check active medicines for today
      const activeMeds = db.medicines.filter(m => m.patientId === patient.id && m.isActive);
      for (const med of activeMeds) {
        for (const time of med.reminderTimes) {
          const { title, message } = this.formatMedicineMessage(patient, med, time, prefs.preferredLanguage);

          if (prefs.inAppEnabled) {
            await this.dispatchNotification(
              userId,
              'MEDICINE_REMINDER',
              'IN_APP',
              title,
              message,
              'In-App Notification Center',
              patient.id,
              patient.name
            );
            createdCount++;
          }
        }
      }
    }

    return { createdCount };
  }

  private static formatVaccineMessage(
    patient: PatientProfile,
    item: VaccinationScheduleItem,
    diffDays: number,
    lang: Language
  ): { title: string; message: string } {
    if (lang === 'hi') {
      if (diffDays < 0) {
        return {
          title: `छूटे हुए टीके का अलर्ट: ${item.vaccineName}`,
          message: `नमस्ते, ${patient.name} का ${item.vaccineName} टीका ${Math.abs(diffDays)} दिन पहले लगना था। कृपया नजदीकी सरकारी स्वास्थ्य केंद्र (PHC) पर जाकर तुरंत टीका लगवाएं।`
        };
      }
      if (diffDays === 0) {
        return {
          title: `आज टीकाकरण देय है: ${item.vaccineName}`,
          message: `नमस्ते, आज ${patient.name} के लिए ${item.vaccineName} टीका लगाने का दिन है।`
        };
      }
      return {
        title: `आगामी टीका रिमाइंडर: ${item.vaccineName} (${diffDays} दिन शेष)`,
        message: `स्मार्टकेयर सूचना: ${patient.name} के लिए ${item.vaccineName} टीका ${item.expectedDate} को देय है। नजदीकी केंद्र स्मार्टकेयर पर खोजें।`
      };
    }

    if (lang === 'mr') {
      if (diffDays < 0) {
        return {
          title: `चुकलेल्या लसीची सूचना: ${item.vaccineName}`,
          message: `नमस्कार, ${patient.name} यांचा ${item.vaccineName} डोस ${Math.abs(diffDays)} दिवस आधी दिला जाणे अपेक्षित होते. कृपया जवळच्या शासकीय PHC केंद्रात संपर्क साधा.`
        };
      }
      if (diffDays === 0) {
        return {
          title: `आज लसीचा दिनांक: ${item.vaccineName}`,
          message: `नमस्कार, आज ${patient.name} यांच्यासाठी ${item.vaccineName} लस देण्याचा दिनांक आहे.`
        };
      }
      return {
        title: `पुढील लस स्मरणपत्र: ${item.vaccineName} (${diffDays} दिवस बाकी)`,
        message: `स्मार्टकेअर सूचना: ${patient.name} यांच्यासाठी ${item.vaccineName} लस ${item.expectedDate} रोजी देय आहे.`
      };
    }

    // English
    if (diffDays < 0) {
      return {
        title: `Missed Vaccine Alert: ${item.vaccineName}`,
        message: `Reminder: ${patient.name} was due for ${item.vaccineName} ${Math.abs(diffDays)} days ago. Please visit your nearest Govt PHC or clinic to receive the catch-up dose.`
      };
    }
    if (diffDays === 0) {
      return {
        title: `Vaccination Due Today: ${item.vaccineName}`,
        message: `Reminder: Today is the scheduled vaccination date for ${patient.name} (${item.vaccineName}).`
      };
    }
    return {
      title: `Upcoming Vaccine Reminder: ${item.vaccineName} (${diffDays} days left)`,
      message: `SmartCare Notice: ${patient.name} is due for ${item.vaccineName} on ${item.expectedDate}. Check nearby centers on SmartCare.`
    };
  }

  private static formatMedicineMessage(
    patient: PatientProfile,
    med: MedicineItem,
    time: string,
    lang: Language
  ): { title: string; message: string } {
    const timingMap: Record<string, { en: string; hi: string; mr: string }> = {
      AFTER_FOOD: { en: 'After Food', hi: 'भोजन के बाद', mr: 'जेवणानंतर' },
      BEFORE_FOOD: { en: 'Before Food (Empty stomach)', hi: 'भोजन से पहले (खाली पेट)', mr: 'जेवणापूर्वी' },
      WITH_FOOD: { en: 'With Meal', hi: 'भोजन के साथ', mr: 'जेवणासोबत' },
      EMPTY_STOMACH: { en: 'Early Morning Empty Stomach', hi: 'सुबह खाली पेट', mr: 'सकाळी उपाशी पोटी' },
      NO_RESTRICTION: { en: 'Anytime', hi: 'कभी भी', mr: 'कधीही' }
    };

    const foodNote = timingMap[med.foodTiming]?.[lang] || timingMap[med.foodTiming]?.en;

    if (lang === 'hi') {
      return {
        title: `दवा रिमाइंडर (${time}): ${med.name}`,
        message: `${patient.name} के लिए ${med.name} की ${med.dosage} खुराक ${foodNote} देने का समय हो गया है।`
      };
    }
    if (lang === 'mr') {
      return {
        title: `औषध स्मरण (${time}): ${med.name}`,
        message: `${patient.name} यांच्यासाठी ${med.name} ची मात्रा ${med.dosage} (${foodNote}) देण्याची वेळ झाली आहे.`
      };
    }
    return {
      title: `Medicine Reminder (${time}): ${med.name}`,
      message: `Time to give ${med.dosage} of ${med.name} (${foodNote}) to ${patient.name}.`
    };
  }
}
