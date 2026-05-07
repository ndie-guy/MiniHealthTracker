
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {
  const features = [
    { icon: '🩺', title: 'Symptom Selection',  desc: 'Choose from 10 common health symptoms' },
    { icon: '🔬', title: 'Smart Analysis',      desc: 'Rule-based health advice engine' },
    { icon: '💊', title: 'Personalized Advice', desc: 'Tailored tips based on your symptoms' },
    { icon: '🚀', title: 'Fast & Simple',       desc: 'No sign-up, no complexity' },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />

      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.heroIconWrap}>
          <Text style={styles.heroIcon}>💙</Text>
        </View>
        <Text style={styles.heroTitle}>Mini Health</Text>
        <Text style={styles.heroTitle2}>Tracker</Text>
        <Text style={styles.heroTagline}>
          Select your symptoms and get instant health guidance
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Features Grid */}
        <Text style={styles.sectionTitle}>What this app does</Text>
        <View style={styles.grid}>
          {features.map((f, i) => (
            <View key={i} style={styles.featureCard}>
              <Text style={styles.featureIcon}>{f.icon}</Text>
              <Text style={styles.featureTitle}>{f.title}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          ))}
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerIcon}>ℹ️</Text>
          <Text style={styles.disclaimerText}>
            This app provides general health guidance only and does{' '}
            <Text style={styles.bold}>not</Text> replace professional medical advice.
            Always consult a doctor for serious conditions.
          </Text>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('SymptomSelection')}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>Check My Symptoms →</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Built with React Native · Expo</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#1d4ed8',
  },

  // Hero
  hero: {
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 24,
    backgroundColor: '#1d4ed8',
  },
  heroIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  heroIcon: {
    fontSize: 36,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
    lineHeight: 38,
  },
  heroTitle2: {
    fontSize: 34,
    fontWeight: '800',
    color: '#93c5fd',
    letterSpacing: -0.5,
    lineHeight: 38,
    marginBottom: 10,
  },
  heroTagline: {
    fontSize: 14,
    color: '#bfdbfe',
    textAlign: 'center',
    lineHeight: 20,
  },

  // Scroll
  scroll: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  scrollContent: {
    padding: 22,
    paddingBottom: 40,
  },

  // Features
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6b7280',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  featureCard: {
    width: '47.5%',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    fontSize: 26,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 11,
    color: '#6b7280',
    lineHeight: 16,
  },

  // Disclaimer
  disclaimer: {
    flexDirection: 'row',
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 22,
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
    gap: 10,
  },
  disclaimerIcon: {
    fontSize: 16,
    marginTop: 1,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    color: '#374151',
    lineHeight: 18,
  },
  bold: {
    fontWeight: '700',
  },

  // CTA
  ctaButton: {
    backgroundColor: '#1d4ed8',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#1d4ed8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 18,
  },
  ctaText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  footer: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 11,
  },
});
