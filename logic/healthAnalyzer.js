
export const SYMPTOMS = [
  { id: 'fever',      label: 'Fever',       icon: '🌡️',  description: 'High body temperature' },
  { id: 'fatigue',    label: 'Fatigue',     icon: '😴',  description: 'Unusual tiredness or weakness' },
  { id: 'cough',      label: 'Cough',       icon: '🤧',  description: 'Persistent or dry cough' },
  { id: 'headache',   label: 'Headache',    icon: '🤕',  description: 'Pain or pressure in the head' },
  { id: 'sore_throat',label: 'Sore Throat', icon: '😮',  description: 'Pain or irritation in the throat' },
  { id: 'nausea',     label: 'Nausea',      icon: '🤢',  description: 'Feeling of wanting to vomit' },
  { id: 'chest_pain', label: 'Chest Pain',  icon: '💔',  description: 'Pain or discomfort in the chest' },
  { id: 'dizziness',  label: 'Dizziness',   icon: '😵',  description: 'Feeling faint or unsteady' },
  { id: 'runny_nose', label: 'Runny Nose',  icon: '🤧',  description: 'Nasal discharge or congestion' },
  { id: 'body_ache',  label: 'Body Ache',   icon: '🦴',  description: 'Muscle or joint pain' },
];


export const SEVERITY = {
  LOW:      'low',
  MODERATE: 'moderate',
  HIGH:     'high',
  URGENT:   'urgent',
};

/**
 * @param {string[]} selectedIds 
 * @returns {{ condition: string, advice: string, severity: string, tips: string[] }}
 */
export function analyzeSymptoms(selectedIds) {
  const has = (id) => selectedIds.includes(id);
  const count = selectedIds.length;

  if (count === 0) {
    return {
      condition: 'No Symptoms Selected',
      advice: 'You appear to be in good health! Keep maintaining a healthy lifestyle.',
      severity: SEVERITY.LOW,
      tips: [
        'Drink at least 8 glasses of water daily',
        'Get 7–9 hours of sleep each night',
        'Exercise regularly and eat balanced meals',
      ],
    };
  }

  
  if (has('chest_pain') && (has('dizziness') || has('fatigue') || has('nausea'))) {
    return {
      condition: 'Possible Cardiac Emergency',
      advice: '⚠️ Seek emergency medical attention immediately. These symptoms combined may indicate a serious cardiac condition.',
      severity: SEVERITY.URGENT,
      tips: [
        'Call emergency services (15 / 18 / 112) immediately',
        'Do not drive yourself to the hospital',
        'Stay calm and rest until help arrives',
        'Do not eat or drink anything',
      ],
    };
  }

  
  if (has('chest_pain')) {
    return {
      condition: 'Chest Discomfort',
      advice: 'Chest pain should not be ignored. Please consult a doctor as soon as possible.',
      severity: SEVERITY.URGENT, 
      tips: [
        'Avoid physical exertion',
        'Seek medical consultation immediately',
        'Monitor for worsening symptoms',
      ],
    };
  }

 
  if (has('fever') && has('fatigue') && has('body_ache')) {
    return {
      condition: 'Flu-like Illness',
      advice: 'Your symptoms suggest a flu-like illness. Rest and stay hydrated. Consider seeing a doctor if symptoms worsen.',
      severity: SEVERITY.MODERATE,
      tips: [
        'Rest as much as possible',
        'Stay well-hydrated with water and warm fluids',
        'Take fever-reducing medication if needed',
        'Monitor your temperature every few hours',
        'Seek medical attention if fever exceeds 39.5°C',
      ],
    };
  }

  if (has('fever') && has('fatigue')) {
    return {
      condition: 'Viral Infection',
      advice: 'Fever combined with fatigue often indicates a viral infection. Rest and hydration are key.',
      severity: SEVERITY.MODERATE,
      tips: [
        'Get plenty of rest',
        'Drink fluids frequently',
        'Use a cool damp cloth to manage fever',
        'Consult a doctor if fever lasts more than 3 days',
      ],
    };
  }

  if (has('cough') && has('runny_nose') && has('sore_throat')) {
    return {
      condition: 'Common Cold',
      advice: 'You likely have a common cold. It is usually self-limiting and resolves in 7–10 days.',
      severity: SEVERITY.LOW,
      tips: [
        'Rest and keep warm',
        'Gargle with warm salt water for sore throat',
        'Use saline nasal spray for congestion',
        'Take over-the-counter cold medication as needed',
      ],
    };
  }

  if (has('headache') && has('nausea') && has('dizziness')) {
    return {
      condition: 'Possible Migraine',
      advice: 'Your symptoms may indicate a migraine episode. Rest in a quiet, dark room.',
      severity: SEVERITY.MODERATE,
      tips: [
        'Lie down in a quiet, dark room',
        'Apply a cold compress to your forehead',
        'Stay hydrated',
        'Avoid screens and bright lights',
        'Consult a doctor if migraines are frequent',
      ],
    };
  }

  if (has('fever') && count <= 2) {
    return {
      condition: 'Fever',
      advice: 'You have a fever. Monitor your temperature and rest. Seek medical advice if it persists.',
      severity: SEVERITY.MODERATE,
      tips: [
        'Drink plenty of fluids',
        'Take paracetamol to reduce fever if needed',
        'Rest and avoid strenuous activity',
        'See a doctor if fever exceeds 39°C or lasts more than 48h',
      ],
    };
  }

  if (has('cough') && count === 1) {
    return {
      condition: 'Persistent Cough',
      advice: 'An isolated cough can have many causes. If it persists beyond 2 weeks, consult a doctor.',
      severity: SEVERITY.LOW,
      tips: [
        'Stay hydrated',
        'Avoid smoke and strong odors',
        'Try honey and warm water for relief',
        'Consult a doctor if cough is productive or bloody',
      ],
    };
  }

  if (has('sore_throat') && count <= 2) {
    return {
      condition: 'Throat Irritation',
      advice: 'A sore throat may indicate a minor infection or irritation. Most cases resolve on their own.',
      severity: SEVERITY.LOW,
      tips: [
        'Gargle with warm salt water',
        'Drink warm liquids like tea with honey',
        'Avoid cold drinks and ice cream',
        'See a doctor if pain is severe or swallowing is difficult',
      ],
    };
  }

  if (has('nausea') && count <= 2) {
    return {
      condition: 'Nausea / Digestive Upset',
      advice: 'Nausea can result from various causes including dietary issues or mild infection.',
      severity: SEVERITY.LOW,
      tips: [
        'Eat small, bland meals (rice, toast)',
        'Avoid fatty or spicy foods',
        'Stay hydrated with small sips of water',
        'Rest in an upright position',
      ],
    };
  }

  if (count >= 4) {
    return {
      condition: 'Multiple Symptoms',
      advice: 'You are experiencing several symptoms at once. It is advisable to consult a healthcare professional.',
      severity: SEVERITY.HIGH,
      tips: [
        'Avoid self-medicating with multiple drugs',
        'Rest and stay hydrated',
        'Write down all your symptoms and when they started',
        'Seek a medical consultation as soon as possible',
      ],
    };
  }

  return {
    condition: 'General Discomfort',
    advice: 'Your symptoms suggest general discomfort. Monitor them closely and rest.',
    severity: SEVERITY.LOW,
    tips: [
      'Drink plenty of water',
      'Get adequate sleep',
      'Eat nutritious meals',
      'Consult a doctor if symptoms persist or worsen',
    ],
  };
}


export function getSeverityMeta(severity) {
  switch (severity) {
    case SEVERITY.LOW:
      return { color: '#22c55e', bg: '#f0fdf4', label: 'Low Concern',    emoji: '✅' };
    case SEVERITY.MODERATE:
      return { color: '#f59e0b', bg: '#fffbeb', label: 'Moderate',       emoji: '⚠️' };
    case SEVERITY.HIGH:
      return { color: '#ef4444', bg: '#fef2f2', label: 'High Concern',   emoji: '🚨' };
    case SEVERITY.URGENT:
      return { color: '#dc2626', bg: '#fff1f2', label: 'URGENT',         emoji: '🆘' };
    default:
      return { color: '#6b7280', bg: '#f9fafb', label: 'Unknown',        emoji: '❓' };
  }
}
