import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../context/LanguageContext';

const PROFILE_KEY = 'user_profile';

export default function HomeScreen({ navigation }) {
  const { t } = useLanguage();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadName);
    return unsubscribe;
  }, [navigation]);

  const loadName = async () => {
    try {
      const saved = await AsyncStorage.getItem(PROFILE_KEY);
      if (saved) {
        const profile = JSON.parse(saved);
        setUserName(profile.name || '');
      }
    } catch (e) {}
  };

  const features = [
    { icon: '🩺', titleKey: 'symptomSelection',  descKey: 'symptomSelectionDesc' },
    { icon: '🔬', titleKey: 'smartAnalysis',      descKey: 'smartAnalysisDesc' },
    { icon: '💊', titleKey: 'personalizedAdvice', descKey: 'personalizedAdviceDesc' },
    { icon: '🚀', titleKey: 'fastSimple',         descKey: 'fastSimpleDesc' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />

      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroIconWrap}>
          <Text style={styles.heroIcon}>💙</Text>
        </View>
        {userName ? (
          <Text style={styles.heroGreeting}>{t('hello')}, {userName}! 👋</Text>
        ) : null}
        <Text style={styles.heroTitle}>{t('appName')}</Text>
        <Text style={styles.heroTagline}>{t('tagline')}</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Quick Actions */}
        <View style={styles.quickRow}>
          <TouchableOpacity
            style={styles.quickBtn}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.quickIcon}>👤</Text>
            <Text style={styles.quickLabel}>{t('myProfile')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickBtn, styles.quickBtnRed]}
            onPress={() => navigation.navigate('Emergency')}
          >
            <Text style={styles.quickIcon}>🆘</Text>
            <Text style={styles.quickLabel}>{t('emergency')}</Text>
          </TouchableOpacity>
        </View>

        {/* Features Grid */}
        <Text style={styles.sectionTitle}>{t('whatAppDoes')}</Text>
        <View style={styles.grid}>
          {features.map((f, i) => (
            <View key={i} style={styles.featureCard}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureTitle}>{t(f.titleKey)}</Text>
              <Text style={styles.featureDesc}>{t(f.descKey)}</Text>
            </View>
          ))}
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerIcon}>ℹ️</Text>
          <Text style={styles.disclaimerText}>
            {t('disclaimer')}
            <Text style={styles.bold}>{t('disclaimerNot')}</Text>
            {t('disclaimerEnd')}
          </Text>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('SymptomSelection')}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>{t('checkSymptoms')}</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>{t('builtWith')}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#1d4ed8' },




  hero: { alignItems: 'center', paddingVertical: 24, paddingHorizontal: 24, backgroundColor: '#1d4ed8' },
  heroIconWrap: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  heroIcon: { fontSize: 32 },
  heroGreeting: { color: '#93c5fd', fontSize: 14, fontWeight: '600', marginBottom: 4 },
  heroTitle: { fontSize: 28, fontWeight: '800', color: '#ffffff', letterSpacing: -0.5, textAlign: 'center', marginBottom: 8 },
  heroTagline: { fontSize: 13, color: '#bfdbfe', textAlign: 'center', lineHeight: 18 },


  scroll: { flex: 1, backgroundColor: '#f8fafc', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  scrollContent: { padding: 20, paddingBottom: 40 },

  
  quickRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  quickBtn: {
    flex: 1, backgroundColor: '#eff6ff', borderRadius: 14, paddingVertical: 14,
    alignItems: 'center', borderWidth: 1.5, borderColor: '#bfdbfe',
  },
  quickBtnRed: { backgroundColor: '#fef2f2', borderColor: '#fecaca' },
  quickIcon: { fontSize: 24, marginBottom: 4 },
  quickLabel: { fontSize: 13, fontWeight: '700', color: '#1e40af' },

  
  sectionTitle: { fontSize: 12, fontWeight: '700', color: '#6b7280', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 18 },
  featureCard: {
    width: '47.5%', backgroundColor: '#ffffff', borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: '#e5e7eb',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  featureIcon: { fontSize: 24, marginBottom: 8 },
  featureTitle: { fontSize: 12, fontWeight: '700', color: '#1f2937', marginBottom: 4 },
  featureDesc: { fontSize: 11, color: '#6b7280', lineHeight: 15 },

  
  disclaimer: {
    flexDirection: 'row', backgroundColor: '#eff6ff', borderRadius: 12,
    padding: 12, marginBottom: 18, borderLeftWidth: 3, borderLeftColor: '#3b82f6', gap: 8,
  },
  disclaimerIcon: { fontSize: 14, marginTop: 1 },
  disclaimerText: { flex: 1, fontSize: 12, color: '#374151', lineHeight: 17 },
  bold: { fontWeight: '700' },

  
  ctaButton: {
    backgroundColor: '#1d4ed8', borderRadius: 16, paddingVertical: 17, alignItems: 'center',
    shadowColor: '#1d4ed8', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 5, marginBottom: 16,
  },
  ctaText: { color: '#ffffff', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
  footer: { textAlign: 'center', color: '#9ca3af', fontSize: 11 },
});
