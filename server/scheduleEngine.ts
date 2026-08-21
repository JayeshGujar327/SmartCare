import { PatientProfile, VaccinationScheduleItem, VaccineRule, VaccinationScoreData } from '../src/types';
import { db } from './db';

export class VaccinationScheduleService {
  /**
   * Calculate precise age breakdown from Date of Birth
   */
  public static calculateAge(dobString: string, referenceDate: Date = new Date()): {
    days: number;
    weeks: number;
    months: number;
    years: number;
    formattedText: string;
  } {
    const dob = new Date(dobString);
    const diffTime = referenceDate.getTime() - dob.getTime();
    const days = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.4375);
    const years = Math.floor(days / 365.25);

    let formattedText = '';
    if (days < 30) {
      formattedText = `${days} days`;
    } else if (months < 12) {
      const remDays = Math.floor(days % 30.4375);
      formattedText = `${months} mo ${remDays > 0 ? `${remDays} d` : ''}`;
    } else if (years < 5) {
      const remMonths = months % 12;
      formattedText = `${years} yr ${remMonths > 0 ? `${remMonths} mo` : ''}`;
    } else {
      formattedText = `${years} years`;
    }

    return { days, weeks, months, years, formattedText };
  }

  /**
   * Calculate vaccination score, missed alerts, and next upcoming dose for a patient
   */
  public static getPatientVaccinationMetrics(patientId: string): VaccinationScoreData {
    const items = db.scheduleItems.filter(item => item.patientId === patientId);
    
    // Sort by expected date
    items.sort((a, b) => new Date(a.expectedDate).getTime() - new Date(b.expectedDate).getTime());

    const total = items.length;
    const completed = items.filter(i => i.status === 'COMPLETED').length;
    const due = items.filter(i => i.status === 'DUE').length;
    const missed = items.filter(i => i.status === 'MISSED').length;
    const upcoming = items.filter(i => i.status === 'UPCOMING').length;

    const scorePercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    const todayStr = new Date().toISOString().split('T')[0];
    const nextUpcoming = items.find(i => (i.status === 'UPCOMING' || i.status === 'DUE') && i.expectedDate >= todayStr);
    const missedItems = items.filter(i => i.status === 'MISSED');
    const dueItems = items.filter(i => i.status === 'DUE');

    return {
      total,
      completed,
      due,
      upcoming,
      missed,
      scorePercentage,
      nextUpcoming,
      missedItems,
      dueItems
    };
  }

  /**
   * Automatically inspect schedules and classify overdue non-completed items as MISSED
   */
  public static runMissedVaccineDetector(patientId?: string): { updatedCount: number; missedList: VaccinationScheduleItem[] } {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const targets = patientId
      ? db.scheduleItems.filter(item => item.patientId === patientId)
      : db.scheduleItems;

    let updatedCount = 0;
    const missedList: VaccinationScheduleItem[] = [];

    for (const item of targets) {
      if (item.status === 'COMPLETED') continue;

      const expDate = new Date(item.expectedDate);
      const isPast = item.expectedDate < todayStr;
      const diffDays = (expDate.getTime() - today.getTime()) / (1000 * 3600 * 24);

      if (isPast && item.status !== 'MISSED') {
        item.status = 'MISSED';
        updatedCount++;
        missedList.push(item);
      } else if (!isPast && diffDays <= 7 && diffDays >= 0 && item.status !== 'DUE') {
        item.status = 'DUE';
        updatedCount++;
      } else if (item.status === 'MISSED') {
        missedList.push(item);
      }
    }

    return { updatedCount, missedList };
  }
}
