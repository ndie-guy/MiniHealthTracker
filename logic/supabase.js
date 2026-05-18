import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nwylomjrxnpktmhxvhfe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eWxvbWpyeG5wa3RtaHh2aGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMjE4NzYsImV4cCI6MjA5NDY5Nzg3Nn0.R45chhUvW9rlA4hStwfPUK66u67oIgO35nJ4AlWNFYg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export async function saveSymptomCheck(userId, selectedSymptoms, result) {
  const { data, error } = await supabase
    .from('symptom_history')
    .insert([
      {
        user_id: userId,
        selected_symptoms: selectedSymptoms,
        condition: result.condition,
        severity: result.severity,
        advice: result.advice,
      },
    ]);
  return { data, error };
}

export async function loadSymptomHistory(userId) {
  const { data, error } = await supabase
    .from('symptom_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function deleteSymptomCheck(id) {
  const { error } = await supabase
    .from('symptom_history')
    .delete()
    .eq('id', id);
  return { error };
}
