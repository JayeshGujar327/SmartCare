import { DevelopmentMilestone, GrowthLog } from '../types';

export interface WHOStandardPoint {
  month: number;
  p3: number;
  p15: number;
  p50: number; // Median
  p85: number;
  p97: number;
}

// WHO Child Growth Standards for Boys (Weight in kg)
export const whoBoysWeightStandards: WHOStandardPoint[] = [
  { month: 0, p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.9, p97: 4.4 },
  { month: 1, p3: 3.4, p15: 3.9, p50: 4.5, p85: 5.1, p97: 5.8 },
  { month: 2, p3: 4.3, p15: 4.9, p50: 5.6, p85: 6.3, p97: 7.1 },
  { month: 3, p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.2, p97: 8.0 },
  { month: 4, p3: 5.6, p15: 6.2, p50: 7.0, p85: 7.8, p97: 8.7 },
  { month: 5, p3: 6.0, p15: 6.7, p50: 7.5, p85: 8.4, p97: 9.3 },
  { month: 6, p3: 6.4, p15: 7.1, p50: 7.9, p85: 8.8, p97: 9.8 },
  { month: 9, p3: 7.1, p15: 8.0, p50: 8.9, p85: 9.9, p97: 11.0 },
  { month: 12, p3: 7.7, p15: 8.6, p50: 9.6, p85: 10.8, p97: 12.0 },
  { month: 15, p3: 8.3, p15: 9.2, p50: 10.3, p85: 11.5, p97: 12.8 },
  { month: 18, p3: 8.8, p15: 9.8, p50: 10.9, p85: 12.2, p97: 13.7 },
  { month: 24, p3: 9.7, p15: 10.8, p50: 12.2, p85: 13.6, p97: 15.3 },
  { month: 36, p3: 11.3, p15: 12.7, p50: 14.3, p85: 16.2, p97: 18.3 },
  { month: 48, p3: 12.7, p15: 14.4, p50: 16.3, p85: 18.6, p97: 21.2 },
  { month: 60, p3: 14.1, p15: 16.0, p50: 18.3, p85: 21.0, p97: 24.2 }
];

// WHO Child Growth Standards for Girls (Weight in kg)
export const whoGirlsWeightStandards: WHOStandardPoint[] = [
  { month: 0, p3: 2.4, p15: 2.8, p50: 3.2, p85: 3.7, p97: 4.2 },
  { month: 1, p3: 3.2, p15: 3.6, p50: 4.2, p85: 4.8, p97: 5.5 },
  { month: 2, p3: 3.9, p15: 4.5, p50: 5.1, p85: 5.8, p97: 6.6 },
  { month: 3, p3: 4.5, p15: 5.2, p50: 5.8, p85: 6.6, p97: 7.5 },
  { month: 4, p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.3, p97: 8.2 },
  { month: 5, p3: 5.4, p15: 6.1, p50: 6.9, p85: 7.8, p97: 8.8 },
  { month: 6, p3: 5.7, p15: 6.5, p50: 7.3, p85: 8.2, p97: 9.3 },
  { month: 9, p3: 6.5, p15: 7.3, p50: 8.2, p85: 9.3, p97: 10.5 },
  { month: 12, p3: 7.0, p15: 7.9, p50: 8.9, p85: 10.1, p97: 11.5 },
  { month: 15, p3: 7.6, p15: 8.5, p50: 9.6, p85: 10.9, p97: 12.4 },
  { month: 18, p3: 8.1, p15: 9.1, p50: 10.2, p85: 11.6, p97: 13.2 },
  { month: 24, p3: 9.0, p15: 10.2, p50: 11.5, p85: 13.0, p97: 14.8 },
  { month: 36, p3: 10.8, p15: 12.2, p50: 13.9, p85: 15.8, p97: 18.1 },
  { month: 48, p3: 12.3, p15: 14.0, p50: 16.1, p85: 18.5, p97: 21.5 },
  { month: 60, p3: 13.7, p15: 15.8, p50: 18.2, p85: 21.2, p97: 24.9 }
];

// WHO Child Growth Standards for Boys (Height/Length in cm)
export const whoBoysHeightStandards: WHOStandardPoint[] = [
  { month: 0, p3: 46.1, p15: 48.0, p50: 49.9, p85: 51.8, p97: 53.7 },
  { month: 1, p3: 50.8, p15: 52.8, p50: 54.7, p85: 56.7, p97: 58.6 },
  { month: 2, p3: 54.4, p15: 56.4, p50: 58.4, p85: 60.4, p97: 62.4 },
  { month: 3, p3: 57.3, p15: 59.4, p50: 61.4, p85: 63.5, p97: 65.5 },
  { month: 4, p3: 59.7, p15: 61.8, p50: 63.9, p85: 66.0, p97: 68.0 },
  { month: 5, p3: 61.7, p15: 63.8, p50: 65.9, p85: 68.0, p97: 70.1 },
  { month: 6, p3: 63.3, p15: 65.5, p50: 67.6, p85: 69.8, p97: 71.9 },
  { month: 9, p3: 67.5, p15: 69.7, p50: 72.0, p85: 74.2, p97: 76.5 },
  { month: 12, p3: 71.0, p15: 73.4, p50: 75.7, p85: 78.1, p97: 80.5 },
  { month: 15, p3: 74.1, p15: 76.6, p50: 79.1, p85: 81.7, p97: 84.2 },
  { month: 18, p3: 76.9, p15: 79.6, p50: 82.3, p85: 85.0, p97: 87.7 },
  { month: 24, p3: 82.1, p15: 85.1, p50: 87.8, p85: 90.9, p97: 93.9 },
  { month: 36, p3: 88.7, p15: 92.4, p50: 96.1, p85: 99.8, p97: 103.5 },
  { month: 48, p3: 94.9, p15: 99.1, p50: 103.3, p85: 107.5, p97: 111.7 },
  { month: 60, p3: 100.7, p15: 105.3, p50: 110.0, p85: 114.6, p97: 119.2 }
];

// WHO Child Growth Standards for Girls (Height/Length in cm)
export const whoGirlsHeightStandards: WHOStandardPoint[] = [
  { month: 0, p3: 45.4, p15: 47.3, p50: 49.1, p85: 51.0, p97: 52.9 },
  { month: 1, p3: 49.8, p15: 51.7, p50: 53.7, p85: 55.6, p97: 57.6 },
  { month: 2, p3: 53.0, p15: 55.0, p50: 57.1, p85: 59.1, p97: 61.1 },
  { month: 3, p3: 55.6, p15: 57.7, p50: 59.8, p85: 61.9, p97: 64.0 },
  { month: 4, p3: 57.8, p15: 60.0, p50: 62.1, p85: 64.3, p97: 66.4 },
  { month: 5, p3: 59.6, p15: 61.8, p50: 64.0, p85: 66.2, p97: 68.5 },
  { month: 6, p3: 61.2, p15: 63.5, p50: 65.7, p85: 68.0, p97: 70.3 },
  { month: 9, p3: 65.3, p15: 67.7, p50: 70.1, p85: 72.6, p97: 75.0 },
  { month: 12, p3: 68.9, p15: 71.4, p50: 74.0, p85: 76.6, p97: 79.2 },
  { month: 15, p3: 72.0, p15: 74.7, p50: 77.5, p85: 80.3, p97: 83.0 },
  { month: 18, p3: 74.9, p15: 77.7, p50: 80.7, p85: 83.6, p97: 86.5 },
  { month: 24, p3: 80.0, p15: 83.2, p50: 86.4, p85: 89.6, p97: 92.9 },
  { month: 36, p3: 87.4, p15: 91.2, p50: 95.1, p85: 98.9, p97: 102.7 },
  { month: 48, p3: 94.1, p15: 98.4, p50: 102.7, p85: 107.0, p97: 111.3 },
  { month: 60, p3: 99.9, p15: 104.7, p50: 109.4, p85: 114.2, p97: 118.9 }
];

// Comprehensive WHO & Indian Academy of Pediatrics (IAP) Milestones
export const developmentalMilestonesList: DevelopmentMilestone[] = [
  // 0 - 2 Months
  {
    id: 'm-0-2-motor-1',
    category: 'MOTOR',
    minAgeMonths: 0,
    maxAgeMonths: 2,
    ageRangeText: '0 - 2 Months',
    title: 'Lifts head momentarily when on tummy (Tummy time)',
    description: 'When placed on the stomach, baby briefly raises head and turns side to side.',
    tipsForParents: 'Practice 2-3 minutes of gentle supervised tummy time daily on a firm clean surface.',
    redFlags: 'Does not respond to loud sounds, does not watch things as they move, or cannot lift head when on tummy.'
  },
  {
    id: 'm-0-2-social-1',
    category: 'SOCIAL',
    minAgeMonths: 0,
    maxAgeMonths: 2,
    ageRangeText: '0 - 2 Months',
    title: 'First Social Smile',
    description: 'Smiles in response to parents voice, gentle touch, or friendly eye contact.',
    tipsForParents: 'Hold your baby 8-12 inches from your face and talk, sing, or smile directly to encourage bonding.'
  },
  {
    id: 'm-0-2-lang-1',
    category: 'LANGUAGE',
    minAgeMonths: 0,
    maxAgeMonths: 2,
    ageRangeText: '0 - 2 Months',
    title: 'Makes cooing sounds (ooh, aah)',
    description: 'Produces soft vowel sounds and turns head toward familiar voices.',
    tipsForParents: 'Respond promptly to coos with warm words and copy their sounds to encourage communication.'
  },

  // 2 - 4 Months
  {
    id: 'm-2-4-motor-1',
    category: 'MOTOR',
    minAgeMonths: 2,
    maxAgeMonths: 4,
    ageRangeText: '2 - 4 Months',
    title: 'Holds head steady without support when held upright',
    description: 'Neck muscles strengthen; infant holds head upright without bobbing when supported.',
    tipsForParents: 'Engage in upright lap sitting while safely supporting the chest and ribcage.'
  },
  {
    id: 'm-2-4-motor-2',
    category: 'MOTOR',
    minAgeMonths: 2,
    maxAgeMonths: 4,
    ageRangeText: '2 - 4 Months',
    title: 'Brings hands to mouth and reaches for toys',
    description: 'Develops hand-eye coordination by opening hands and batting at dangling objects.',
    tipsForParents: 'Provide safe, colorful infant rattles and play gyms within baby’s arm reach.'
  },
  {
    id: 'm-2-4-social-1',
    category: 'SOCIAL',
    minAgeMonths: 2,
    maxAgeMonths: 4,
    ageRangeText: '2 - 4 Months',
    title: 'Spontaneous laughing & chuckling',
    description: 'Laughs out loud during playful interactions, tickles, or peek-a-boo.',
    tipsForParents: 'Play gentle games and make humorous facial expressions to stimulate emotional joy.'
  },

  // 4 - 6 Months
  {
    id: 'm-4-6-motor-1',
    category: 'MOTOR',
    minAgeMonths: 4,
    maxAgeMonths: 6,
    ageRangeText: '4 - 6 Months',
    title: 'Rolls from tummy to back (and back to tummy)',
    description: 'Uses upper body strength and core rotational motion to roll over.',
    tipsForParents: 'Place enticing toys just out of reach on the side during floor play to encourage rolling.'
  },
  {
    id: 'm-4-6-motor-2',
    category: 'MOTOR',
    minAgeMonths: 4,
    maxAgeMonths: 6,
    ageRangeText: '4 - 6 Months',
    title: 'Sits with slight hand support (Tripod sitting)',
    description: 'Props on hands while sitting on the floor with good head and trunk control.',
    tipsForParents: 'Surround with pillows for safety and offer interesting toys to hold with one hand.'
  },
  {
    id: 'm-4-6-lang-1',
    category: 'LANGUAGE',
    minAgeMonths: 4,
    maxAgeMonths: 6,
    ageRangeText: '4 - 6 Months',
    title: 'Strings consonant-vowel babbling (ba-ba, ma-ma, da-da)',
    description: 'Begins expressive babbling and vocal turn-taking with caregivers.',
    tipsForParents: 'Have reciprocal "conversations" with baby, pausing to let them respond with sounds.'
  },
  {
    id: 'm-4-6-cog-1',
    category: 'COGNITIVE',
    minAgeMonths: 4,
    maxAgeMonths: 6,
    ageRangeText: '4 - 6 Months',
    title: 'Passes objects from one hand to another',
    description: 'Transfers toys between left and right hands smoothly while exploring shapes and textures.',
    tipsForParents: 'Offer lightweight graspable sensory toys and textured silicone teething rings.'
  },

  // 6 - 9 Months
  {
    id: 'm-6-9-motor-1',
    category: 'MOTOR',
    minAgeMonths: 6,
    maxAgeMonths: 9,
    ageRangeText: '6 - 9 Months',
    title: 'Sits independently without support',
    description: 'Maintains upright sitting posture for several minutes with free hands to play.',
    tipsForParents: 'Provide safe floor seating with toys around their perimeter to stimulate trunk rotation.'
  },
  {
    id: 'm-6-9-motor-2',
    category: 'MOTOR',
    minAgeMonths: 6,
    maxAgeMonths: 9,
    ageRangeText: '6 - 9 Months',
    title: 'Crawls or scoots across the room',
    description: 'Moves forward on belly (commando crawl) or on hands and knees.',
    tipsForParents: 'Child-proof your home: cover electrical outlets, cushion sharp corners, and secure stair gates.'
  },
  {
    id: 'm-6-9-cog-1',
    category: 'COGNITIVE',
    minAgeMonths: 6,
    maxAgeMonths: 9,
    ageRangeText: '6 - 9 Months',
    title: 'Object Permanence (Searches for partially hidden objects)',
    description: 'Understands that items still exist even when covered by a cloth or out of sight.',
    tipsForParents: 'Play peek-a-boo with cloths or hide a favorite squeaky toy under a small blanket.'
  },
  {
    id: 'm-6-9-social-1',
    category: 'SOCIAL',
    minAgeMonths: 6,
    maxAgeMonths: 9,
    ageRangeText: '6 - 9 Months',
    title: 'Stranger Anxiety & Responding to own name',
    description: 'Turns promptly when name is called and shows cautious preference for primary caregivers.',
    tipsForParents: 'Comfort your child during stranger encounters; give them time to warm up to relatives.'
  },

  // 9 - 12 Months
  {
    id: 'm-9-12-motor-1',
    category: 'MOTOR',
    minAgeMonths: 9,
    maxAgeMonths: 12,
    ageRangeText: '9 - 12 Months',
    title: 'Pulls up to stand holding furniture (Cruising)',
    description: 'Stands up holding a table or sofa and takes lateral steps along furniture.',
    tipsForParents: 'Ensure heavy furniture is anchored securely to the wall for cruising safety.'
  },
  {
    id: 'm-9-12-motor-2',
    category: 'MOTOR',
    minAgeMonths: 9,
    maxAgeMonths: 12,
    ageRangeText: '9 - 12 Months',
    title: 'Fine Pincer Grasp (Thumb and index finger pick-up)',
    description: 'Picks up small pieces of food or finger foods using index finger and thumb tips.',
    tipsForParents: 'Offer soft cooked carrots, steamed peas, and small pieces of banana under supervision.'
  },
  {
    id: 'm-9-12-lang-1',
    category: 'LANGUAGE',
    minAgeMonths: 9,
    maxAgeMonths: 12,
    ageRangeText: '9 - 12 Months',
    title: 'Says first meaningful word (e.g., Mama, Papa, Didi)',
    description: 'Uses at least one specific word with intent and understands simple requests like "Come here" or "No".',
    tipsForParents: 'Point to objects and name them clearly; celebrate their verbal attempts.'
  },
  {
    id: 'm-9-12-social-1',
    category: 'SOCIAL',
    minAgeMonths: 9,
    maxAgeMonths: 12,
    ageRangeText: '9 - 12 Months',
    title: 'Waves "bye-bye" and plays clapping games (Pat-a-cake)',
    description: 'Imitates simple social gestures and waves spontaneously.',
    tipsForParents: 'Sing action rhymes and wave goodbye when leaving the room.'
  },

  // 12 - 18 Months
  {
    id: 'm-12-18-motor-1',
    category: 'MOTOR',
    minAgeMonths: 12,
    maxAgeMonths: 18,
    ageRangeText: '12 - 18 Months',
    title: 'Walks independently without support',
    description: 'Takes steady independent steps across the room and stoops to pick up toys.',
    tipsForParents: 'Encourage bare-foot walking indoors on clean floors to strengthen arch and foot muscles.'
  },
  {
    id: 'm-12-18-cog-1',
    category: 'COGNITIVE',
    minAgeMonths: 12,
    maxAgeMonths: 18,
    ageRangeText: '12 - 18 Months',
    title: 'Stacks 2-3 wooden blocks & Drinks from an open cup',
    description: 'Demonstrates hand precision, object stacking, and self-feeding with spoon/cup.',
    tipsForParents: 'Offer durable non-breakable cups and wooden building blocks.'
  },
  {
    id: 'm-12-18-lang-1',
    category: 'LANGUAGE',
    minAgeMonths: 12,
    maxAgeMonths: 18,
    ageRangeText: '12 - 18 Months',
    title: 'Uses 4-10 single words and points to body parts',
    description: 'Points to "nose", "eyes", or "belly" when asked and follows 1-step commands.',
    tipsForParents: 'Read picture books daily, asking "Where is the doggie?" and pointing together.'
  },

  // 18 - 24 Months
  {
    id: 'm-18-24-motor-1',
    category: 'MOTOR',
    minAgeMonths: 18,
    maxAgeMonths: 24,
    ageRangeText: '18 - 24 Months',
    title: 'Runs steadily, kicks a ball forward, and climbs stairs holding railing',
    description: 'Demonstrates dynamic balance, kicking coordination, and ascending stairs with two feet per step.',
    tipsForParents: 'Provide safe outdoor play time in parks to run and kick soft soccer balls.'
  },
  {
    id: 'm-18-24-lang-1',
    category: 'LANGUAGE',
    minAgeMonths: 18,
    maxAgeMonths: 24,
    ageRangeText: '18 - 24 Months',
    title: 'Combines 2 words into simple phrases ("More milk", "Want ball")',
    description: 'Has vocabulary of 50+ words and speaks 2-word telegraphic sentences.',
    tipsForParents: 'Expand their phrases: If child says "Big car", respond "Yes, that is a fast red car!".'
  },
  {
    id: 'm-18-24-cog-1',
    category: 'COGNITIVE',
    minAgeMonths: 18,
    maxAgeMonths: 24,
    ageRangeText: '18 - 24 Months',
    title: 'Pretend play (feeding teddy bear, talking on toy phone)',
    description: 'Engages in symbolic play and sorts shapes (circles, squares).',
    tipsForParents: 'Provide dolls, kitchen sets, or toy vehicles for imaginative play.'
  },

  // 2 - 3 Years
  {
    id: 'm-2-3-motor-1',
    category: 'MOTOR',
    minAgeMonths: 24,
    maxAgeMonths: 36,
    ageRangeText: '2 - 3 Years',
    title: 'Jumps with both feet and pedals a tricycle',
    description: 'Jumps off small step, pedals tricycle, and copies vertical/horizontal lines.',
    tipsForParents: 'Provide age-appropriate ride-on toys and thick non-toxic crayons for drawing.'
  },
  {
    id: 'm-2-3-lang-1',
    category: 'LANGUAGE',
    minAgeMonths: 24,
    maxAgeMonths: 36,
    ageRangeText: '2 - 3 Years',
    title: 'Speaks in 3-4 word sentences and knows own name & gender',
    description: 'Asks "Why?" and "What?", speech is understandable to family 75% of the time.',
    tipsForParents: 'Listen patiently without interrupting, ask open-ended questions about their day.'
  },

  // 4 - 5 Years
  {
    id: 'm-4-5-motor-1',
    category: 'MOTOR',
    minAgeMonths: 48,
    maxAgeMonths: 60,
    ageRangeText: '4 - 5 Years',
    title: 'Hops on one foot, cuts with safety scissors, dresses independently',
    description: 'High motor dexterity, draws a person with 4+ body parts, and uses toilet independently.',
    tipsForParents: 'Encourage buttoning shirts, tying shoe laces, and practicing safety scissors.'
  },
  {
    id: 'm-4-5-social-1',
    category: 'SOCIAL',
    minAgeMonths: 48,
    maxAgeMonths: 60,
    ageRangeText: '4 - 5 Years',
    title: 'Cooperative play, sharing with peers, following rules in group games',
    description: 'Enjoys playing with other children, shows empathy when a friend is hurt, and follows rules.',
    tipsForParents: 'Organize playdates and praise turn-taking and empathetic behavior.'
  }
];

// Helper: Calculate child age in months based on DOB and recorded date
export function calculateAgeInMonths(dobStr: string, recordedDateStr: string): number {
  const dob = new Date(dobStr);
  const recorded = new Date(recordedDateStr);
  let months = (recorded.getFullYear() - dob.getFullYear()) * 12 + (recorded.getMonth() - dob.getMonth());
  if (recorded.getDate() < dob.getDate()) {
    months -= 1;
  }
  return Math.max(0, months);
}

// Helper: Calculate BMI
export function calculateBMI(weightKg: number, heightCm: number): number {
  if (!weightKg || !heightCm || heightCm <= 0) return 0;
  const heightMeters = heightCm / 100;
  const bmi = weightKg / (heightMeters * heightMeters);
  return Math.round(bmi * 10) / 10;
}

// Helper: Evaluate growth status against standard percentiles
export function evaluateGrowthStatus(
  gender: 'MALE' | 'FEMALE' | 'OTHER',
  ageMonths: number,
  weightKg: number,
  heightCm: number
): {
  status: 'HEALTHY' | 'UNDERWEIGHT' | 'OVERWEIGHT' | 'STUNTED' | 'NORMAL';
  label: string;
  weightPercentileEst: number;
  heightPercentileEst: number;
  bmi: number;
  advice: string;
} {
  const standards = gender === 'FEMALE' ? whoGirlsWeightStandards : whoBoysWeightStandards;
  const heightStandards = gender === 'FEMALE' ? whoGirlsHeightStandards : whoBoysHeightStandards;

  // Find closest standard age point
  const std = standards.reduce((prev, curr) => 
    Math.abs(curr.month - ageMonths) < Math.abs(prev.month - ageMonths) ? curr : prev
  , standards[0]);

  const hStd = heightStandards.reduce((prev, curr) => 
    Math.abs(curr.month - ageMonths) < Math.abs(prev.month - ageMonths) ? curr : prev
  , heightStandards[0]);

  const bmi = calculateBMI(weightKg, heightCm);

  // Approximate percentile estimation
  let weightP = 50;
  if (weightKg < std.p3) weightP = 2;
  else if (weightKg < std.p15) weightP = 10;
  else if (weightKg < std.p50) weightP = 35;
  else if (weightKg < std.p85) weightP = 65;
  else if (weightKg < std.p97) weightP = 90;
  else weightP = 98;

  let heightP = 50;
  if (heightCm < hStd.p3) heightP = 2;
  else if (heightCm < hStd.p15) heightP = 10;
  else if (heightCm < hStd.p50) heightP = 35;
  else if (heightCm < hStd.p85) heightP = 65;
  else if (heightCm < hStd.p97) heightP = 90;
  else heightP = 98;

  if (weightKg < std.p3) {
    return {
      status: 'UNDERWEIGHT',
      label: 'Underweight (Below 3rd Percentile)',
      weightPercentileEst: weightP,
      heightPercentileEst: heightP,
      bmi,
      advice: 'Child’s weight is below recommended WHO threshold. Focus on calorie-dense nutrient foods (ghee, lentils, eggs, breastmilk/formula) and consult a pediatrician for dietary counseling.'
    };
  } else if (weightKg > std.p97) {
    return {
      status: 'OVERWEIGHT',
      label: 'High Weight for Age (Above 97th Percentile)',
      weightPercentileEst: weightP,
      heightPercentileEst: heightP,
      bmi,
      advice: 'Child’s weight is higher than standard percentiles. Encourage active physical playtime and wholesome fiber-rich balanced meals.'
    };
  } else if (heightCm < hStd.p3) {
    return {
      status: 'STUNTED',
      label: 'Low Height / Length for Age',
      weightPercentileEst: weightP,
      heightPercentileEst: heightP,
      bmi,
      advice: 'Height is below the 3rd percentile. Discuss nutritional micronutrients (Zinc, Vitamin D3, Calcium, Protein) with your pediatrician.'
    };
  }

  return {
    status: 'HEALTHY',
    label: 'Healthy & Normal Growth Track',
    weightPercentileEst: weightP,
    heightPercentileEst: heightP,
    bmi,
    advice: 'Child is tracking well along standard WHO/IAP development percentiles. Continue age-appropriate balanced nutrition and active stimulation.'
  };
}
