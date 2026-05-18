import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, SafeAreaView, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header';
import { useLanguage } from '../context/LanguageContext';

const PROFILE_KEY = 'user_profile';

export default function ProfileScreen({ navigation }) {
  const { t, language, setLanguage } = useLanguage();

  const [name, setName]       = useState('');
  const [age, setAge]         = useState('');
  const [gender, setGender]   = useState('');
  const [editing, setEditing] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  // Load saved profile on mount
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const saved = await AsyncStorage.getItem(PROFILE_KEY);
      if (saved) {
        const profile = JSON.parse(saved);
        setName(profile.name || '');
        setAge(profile.age || '');
        setGender(profile.gender || '');
        setHasProfile(true);
        setEditing(false);
      } else {
        setEditing(true);
      }
    } catch (e) {
      setEditing(true);
    }
  };

  const saveProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name.');
      return;
    }
    try {
      const profile = { name: name.trim(), age, gender };
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      setHasProfile(true);
      setEditing(false);
      Alert.alert('✅', t('profileSaved'));
    } catch (e) {
      Alert.alert('Error', 'Could not save profile.');
    }
  };

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'wo', label: 'Wolof', flag: '🇸🇳' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <Header
        title={t('profileTitle')}
        subtitle={t('profileSubtitle')}
        showBack
        onBack={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

          {/* Profile Display (when not editing) */}
          {hasProfile && !editing ? (
            <View style={styles.profileCard}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>
                  {name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.profileHello}>{t('hello')}, {name}!</Text>
              {age ? <Text style={styles.profileInfo}>🎂 {age} {t('years')}</Text> : null}
              {gender ? <Text style={styles.profileInfo}>👤 {t(gender.toLowerCase())}</Text> : null}
              <TouchableOpacity style={styles.editBtn} onPress={() => setEditing(true)}>
                <Text style={styles.editBtnText}>✏️ {t('editProfile')}</Text>
              </TouchableOpacity>
            </View>
          ) : (

            /* Profile Form */
            <View style={styles.card}>
              {/* Name */}
              <Text style={styles.label}>{t('fullName')}</Text>
              <TextInput
                style={styles.input}
                placeholder={t('fullNamePlaceholder')}
                value={name}
                onChangeText={setName}
                placeholderTextColor="#9ca3af"
              />

              {/* Age */}
              <Text style={styles.label}>{t('age')}</Text>
              <TextInput
                style={styles.input}
                placeholder={t('agePlaceholder')}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                placeholderTextColor="#9ca3af"
              />

              {/* Gender */}
              <Text style={styles.label}>{t('gender')}</Text>
              <View style={styles.genderRow}>
                {['Male', 'Female', 'Other'].map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[styles.genderBtn, gender === g && styles.genderBtnActive]}
                    onPress={() => setGender(g)}
                  >
                    <Text style={[styles.genderText, gender === g && styles.genderTextActive]}>
                      {t(g.toLowerCase())}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Save Button */}
              <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
                <Text style={styles.saveBtnText}>{t('saveProfile')}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Language Selector */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>{t('selectLanguage')}</Text>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[styles.langRow, language === lang.code && styles.langRowActive]}
                onPress={() => setLanguage(lang.code)}
              >
                <Text style={styles.langFlag}>{lang.flag}</Text>
                <Text style={[styles.langLabel, language === lang.code && styles.langLabelActive]}>
                  {lang.label}
                </Text>
                {language === lang.code && (
                  <Text style={styles.langCheck}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 16, paddingBottom: 40 },

  // Profile display card
  profileCard: {
    backgroundColor: '#ffffff', borderRadius: 16, padding: 24,
    alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#e5e7eb',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  avatarCircle: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: '#1d4ed8',
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  avatarText: { color: '#ffffff', fontSize: 32, fontWeight: '800' },
  profileHello: { fontSize: 20, fontWeight: '700', color: '#1f2937', marginBottom: 6 },
  profileInfo: { fontSize: 15, color: '#6b7280', marginBottom: 4 },
  editBtn: {
    marginTop: 14, backgroundColor: '#eff6ff', borderRadius: 10,
    paddingVertical: 10, paddingHorizontal: 20, borderWidth: 1, borderColor: '#bfdbfe',
  },
  editBtnText: { color: '#1d4ed8', fontWeight: '600', fontSize: 14 },

  // Form card
  card: {
    backgroundColor: '#ffffff', borderRadius: 14, padding: 16, marginBottom: 16,
    borderWidth: 1, borderColor: '#e5e7eb',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1,
  },
  label: { fontSize: 13, fontWeight: '700', color: '#374151', marginBottom: 6, marginTop: 10 },
  input: {
    borderWidth: 1.5, borderColor: '#d1d5db', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: '#1f2937', backgroundColor: '#f9fafb',
  },

  // Gender
  genderRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  genderBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1.5,
    borderColor: '#d1d5db', alignItems: 'center', backgroundColor: '#f9fafb',
  },
  genderBtnActive: { borderColor: '#3b82f6', backgroundColor: '#eff6ff' },
  genderText: { fontSize: 13, color: '#6b7280', fontWeight: '600' },
  genderTextActive: { color: '#1d4ed8' },

  // Save button
  saveBtn: {
    backgroundColor: '#1d4ed8', borderRadius: 12, paddingVertical: 15,
    alignItems: 'center', marginTop: 18,
    shadowColor: '#1d4ed8', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  saveBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },

  // Language selector
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#374151', marginBottom: 12, letterSpacing: 0.3 },
  langRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 12,
    paddingHorizontal: 14, borderRadius: 10, marginBottom: 8,
    backgroundColor: '#f9fafb', borderWidth: 1.5, borderColor: '#e5e7eb',
  },
  langRowActive: { backgroundColor: '#eff6ff', borderColor: '#3b82f6' },
  langFlag: { fontSize: 22, marginRight: 12 },
  langLabel: { flex: 1, fontSize: 15, color: '#374151', fontWeight: '600' },
  langLabelActive: { color: '#1d4ed8' },
  langCheck: { color: '#1d4ed8', fontSize: 16, fontWeight: '800' },
});
