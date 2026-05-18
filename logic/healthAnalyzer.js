export const SYMPTOMS = [
  { id: 'fever',       label: { en: 'Fever',       fr: 'Fièvre',        wo: 'Tangaay' },       icon: '🌡️', description: { en: 'High body temperature',         fr: 'Température corporelle élevée',    wo: 'Yaram tangoon' } },
  { id: 'fatigue',     label: { en: 'Fatigue',     fr: 'Fatigue',       wo: 'Fàttaliku' },     icon: '😴', description: { en: 'Unusual tiredness or weakness',  fr: 'Fatigue ou faiblesse inhabituelle', wo: 'Doyul dox' } },
  { id: 'cough',       label: { en: 'Cough',       fr: 'Toux',          wo: 'Ottu' },           icon: '🤧', description: { en: 'Persistent or dry cough',        fr: 'Toux persistante ou sèche',        wo: 'Ottu bu dëkk' } },
  { id: 'headache',    label: { en: 'Headache',    fr: 'Mal de tête',   wo: 'Bopp dafa nyëw' }, icon: '🤕', description: { en: 'Pain or pressure in the head',   fr: 'Douleur ou pression dans la tête', wo: 'Bopp bi dafa metti' } },
  { id: 'sore_throat', label: { en: 'Sore Throat', fr: 'Mal de gorge',  wo: 'Gémmiñ metti' },  icon: '😮', description: { en: 'Pain or irritation in throat',   fr: 'Douleur dans la gorge',            wo: 'Gémmiñ bi dafa metti' } },
  { id: 'nausea',      label: { en: 'Nausea',      fr: 'Nausée',        wo: 'Dëkk dëkk' },     icon: '🤢', description: { en: 'Feeling of wanting to vomit',    fr: 'Envie de vomir',                   wo: 'Bëgg nga dëkk' } },
  { id: 'chest_pain',  label: { en: 'Chest Pain',  fr: 'Douleur thoracique', wo: 'Xol metti' }, icon: '💔', description: { en: 'Pain in the chest',              fr: 'Douleur dans la poitrine',         wo: 'Xol bi dafa metti' } },
  { id: 'dizziness',   label: { en: 'Dizziness',   fr: 'Vertiges',      wo: 'Xel dañuy dem' }, icon: '😵', description: { en: 'Feeling faint or unsteady',      fr: 'Sensation de vertige',             wo: 'Xel boo amul' } },
  { id: 'runny_nose',  label: { en: 'Runny Nose',  fr: 'Nez qui coule', wo: 'Xàr dañuy wéy' }, icon: '🤧', description: { en: 'Nasal discharge or congestion',  fr: 'Écoulement nasal',                 wo: 'Xàr wi dafa wéy' } },
  { id: 'body_ache',   label: { en: 'Body Ache',   fr: 'Douleurs corporelles', wo: 'Yaram metti' }, icon: '🦴', description: { en: 'Muscle or joint pain',       fr: 'Douleurs musculaires',             wo: 'Yaram bi dafa metti' } },
];

export const SEVERITY = {
  LOW:      'low',
  MODERATE: 'moderate',
  HIGH:     'high',
  URGENT:   'urgent',
};

export function analyzeSymptoms(selectedIds, lang = 'en') {
  const has = (id) => selectedIds.includes(id);
  const count = selectedIds.length;

  const results = {
    en: getResultsEN(has, count),
    fr: getResultsFR(has, count),
    wo: getResultsWO(has, count),
  };

  return results[lang] || results['en'];
}

function getResultsEN(has, count) {
  if (count === 0) return { condition: 'No Symptoms', advice: 'You appear to be in good health! Keep maintaining a healthy lifestyle.', severity: SEVERITY.LOW, tips: ['Drink at least 8 glasses of water daily', 'Get 7–9 hours of sleep each night', 'Exercise regularly and eat balanced meals'] };
  if (has('chest_pain') && (has('dizziness') || has('fatigue') || has('nausea'))) return { condition: 'Possible Cardiac Emergency', advice: '⚠️ Seek emergency medical attention immediately.', severity: SEVERITY.URGENT, tips: ['Call emergency services immediately', 'Do not drive yourself', 'Stay calm and rest', 'Do not eat or drink anything'] };
  if (has('chest_pain')) return { condition: 'Chest Discomfort', advice: 'Chest pain should not be ignored. Please consult a doctor immediately.', severity: SEVERITY.URGENT, tips: ['Avoid physical exertion', 'Seek medical consultation immediately', 'Monitor for worsening symptoms'] };
  if (has('fever') && has('fatigue') && has('body_ache')) return { condition: 'Flu-like Illness', advice: 'Your symptoms suggest a flu-like illness. Rest and stay hydrated.', severity: SEVERITY.MODERATE, tips: ['Rest as much as possible', 'Stay well-hydrated', 'Take fever-reducing medication if needed', 'Seek help if fever exceeds 39.5°C'] };
  if (has('fever') && has('fatigue')) return { condition: 'Viral Infection', advice: 'Fever combined with fatigue often indicates a viral infection.', severity: SEVERITY.MODERATE, tips: ['Get plenty of rest', 'Drink fluids frequently', 'Consult a doctor if fever lasts more than 3 days'] };
  if (has('cough') && has('runny_nose') && has('sore_throat')) return { condition: 'Common Cold', advice: 'You likely have a common cold. It usually resolves in 7–10 days.', severity: SEVERITY.LOW, tips: ['Rest and keep warm', 'Gargle with warm salt water', 'Take over-the-counter cold medication'] };
  if (has('headache') && has('nausea') && has('dizziness')) return { condition: 'Possible Migraine', advice: 'Your symptoms may indicate a migraine. Rest in a quiet, dark room.', severity: SEVERITY.MODERATE, tips: ['Lie in a quiet dark room', 'Apply cold compress to forehead', 'Stay hydrated', 'Avoid screens and bright lights'] };
  if (has('fever') && count <= 2) return { condition: 'Fever', advice: 'Monitor your temperature and rest. Seek advice if it persists.', severity: SEVERITY.MODERATE, tips: ['Drink plenty of fluids', 'Take paracetamol if needed', 'See a doctor if fever exceeds 39°C'] };
  if (has('cough') && count === 1) return { condition: 'Persistent Cough', advice: 'If your cough persists beyond 2 weeks, consult a doctor.', severity: SEVERITY.LOW, tips: ['Stay hydrated', 'Avoid smoke', 'Try honey and warm water'] };
  if (count >= 4) return { condition: 'Multiple Symptoms', advice: 'You are experiencing several symptoms. Consult a healthcare professional.', severity: SEVERITY.HIGH, tips: ['Avoid self-medicating', 'Rest and stay hydrated', 'Seek medical consultation soon'] };
  return { condition: 'General Discomfort', advice: 'Monitor your symptoms closely and rest.', severity: SEVERITY.LOW, tips: ['Drink plenty of water', 'Get adequate sleep', 'Consult a doctor if symptoms persist'] };
}

function getResultsFR(has, count) {
  if (count === 0) return { condition: 'Aucun Symptôme', advice: 'Vous semblez être en bonne santé ! Continuez à maintenir un mode de vie sain.', severity: SEVERITY.LOW, tips: ['Buvez au moins 8 verres d\'eau par jour', 'Dormez 7 à 9 heures par nuit', 'Faites de l\'exercice régulièrement'] };
  if (has('chest_pain') && (has('dizziness') || has('fatigue') || has('nausea'))) return { condition: 'Urgence Cardiaque Possible', advice: '⚠️ Consultez immédiatement les urgences médicales.', severity: SEVERITY.URGENT, tips: ['Appelez les secours immédiatement', 'Ne conduisez pas vous-même', 'Restez calme et reposez-vous', 'Ne mangez ni ne buvez rien'] };
  if (has('chest_pain')) return { condition: 'Douleur Thoracique', advice: 'La douleur thoracique ne doit pas être ignorée. Consultez immédiatement.', severity: SEVERITY.URGENT, tips: ['Évitez tout effort physique', 'Consultez un médecin immédiatement', 'Surveillez l\'aggravation des symptômes'] };
  if (has('fever') && has('fatigue') && has('body_ache')) return { condition: 'Maladie Grippale', advice: 'Vos symptômes suggèrent une grippe. Reposez-vous et restez hydraté.', severity: SEVERITY.MODERATE, tips: ['Reposez-vous autant que possible', 'Restez bien hydraté', 'Prenez un médicament antipyrétique si nécessaire'] };
  if (has('fever') && has('fatigue')) return { condition: 'Infection Virale', advice: 'La fièvre combinée à la fatigue indique souvent une infection virale.', severity: SEVERITY.MODERATE, tips: ['Reposez-vous bien', 'Buvez régulièrement des liquides', 'Consultez si la fièvre dure plus de 3 jours'] };
  if (has('cough') && has('runny_nose') && has('sore_throat')) return { condition: 'Rhume Commun', advice: 'Vous avez probablement un rhume. Il se résout généralement en 7 à 10 jours.', severity: SEVERITY.LOW, tips: ['Reposez-vous et gardez-vous au chaud', 'Gargarisez-vous avec de l\'eau salée tiède', 'Prenez des médicaments contre le rhume'] };
  if (has('headache') && has('nausea') && has('dizziness')) return { condition: 'Migraine Possible', advice: 'Vos symptômes peuvent indiquer une migraine. Reposez-vous dans une pièce calme.', severity: SEVERITY.MODERATE, tips: ['Allongez-vous dans une pièce sombre', 'Appliquez une compresse froide', 'Restez hydraté', 'Évitez les écrans'] };
  if (has('fever') && count <= 2) return { condition: 'Fièvre', advice: 'Surveillez votre température et reposez-vous.', severity: SEVERITY.MODERATE, tips: ['Buvez beaucoup de liquides', 'Prenez du paracétamol si nécessaire', 'Consultez si la fièvre dépasse 39°C'] };
  if (count >= 4) return { condition: 'Symptômes Multiples', advice: 'Vous présentez plusieurs symptômes. Consultez un professionnel de santé.', severity: SEVERITY.HIGH, tips: ['Évitez l\'automédication', 'Reposez-vous et restez hydraté', 'Consultez un médecin rapidement'] };
  return { condition: 'Malaise Général', advice: 'Surveillez vos symptômes et reposez-vous.', severity: SEVERITY.LOW, tips: ['Buvez beaucoup d\'eau', 'Dormez suffisamment', 'Consultez si les symptômes persistent'] };
}

function getResultsWO(has, count) {
  if (count === 0) return { condition: 'Symptôme Amul', advice: 'Yaram bi dafa baax! Jëfandikoo yaram bi ngir baax.', severity: SEVERITY.LOW, tips: ['Nan ndox ju bari bu bés', 'Dëkk 7 ak 9 waxtu ci guddi', 'Dox ak lekk lii baax'] };
  if (has('chest_pain') && (has('dizziness') || has('fatigue') || has('nausea'))) return { condition: 'Urgence Cardiaque', advice: '⚠️ Woo doktor ci kanam!', severity: SEVERITY.URGENT, tips: ['Woo secours ci kanam', 'Dégluye', 'Dëkk ak jàpp', 'Lekkal wala nanul dara'] };
  if (has('chest_pain')) return { condition: 'Xol Metti', advice: 'Xol bi metti dafay metti loolu. Jaambur ak doktor ci kanam.', severity: SEVERITY.URGENT, tips: ['Bul dox', 'Woo doktor ci kanam', 'Xool symptômes yi'] };
  if (has('fever') && has('fatigue') && has('body_ache')) return { condition: 'Grippe', advice: 'Sa symptômes yi nekk ci grippe. Dëkk ak nan ndox.', severity: SEVERITY.MODERATE, tips: ['Dëkk bu bari', 'Nan ndox bu bari', 'Jëfandikoo médicament bu tangaay'] };
  if (has('fever') && has('fatigue')) return { condition: 'Infection Virale', advice: 'Tangaay ak fàttaliku dañuy wax infection virale.', severity: SEVERITY.MODERATE, tips: ['Dëkk bu baax', 'Nan ndox', 'Jaambur ak doktor bu tangaay dëkk 3 fan'] };
  if (count >= 4) return { condition: 'Symptômes yu Bari', advice: 'Am na sa symptômes yu bari. Jaambur ak doktor.', severity: SEVERITY.HIGH, tips: ['Bul jëfandikoo médicament wu dox', 'Dëkk ak nan ndox', 'Jaambur ak doktor'] };
  return { condition: 'Yaram Metti Kaw', advice: 'Xool sa symptômes yi te dëkk.', severity: SEVERITY.LOW, tips: ['Nan ndox bu bari', 'Dëkk bu baax', 'Jaambur ak doktor bu dëkk'] };
}

export function getSeverityMeta(severity) {
  switch (severity) {
    case SEVERITY.LOW:      return { color: '#22c55e', bg: '#f0fdf4', label: 'Low Concern',   emoji: '✅' };
    case SEVERITY.MODERATE: return { color: '#f59e0b', bg: '#fffbeb', label: 'Moderate',      emoji: '⚠️' };
    case SEVERITY.HIGH:     return { color: '#ef4444', bg: '#fef2f2', label: 'High Concern',  emoji: '🚨' };
    case SEVERITY.URGENT:   return { color: '#dc2626', bg: '#fff1f2', label: 'URGENT',        emoji: '🆘' };
    default:                return { color: '#6b7280', bg: '#f9fafb', label: 'Unknown',       emoji: '❓' };
  }
}
