import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView, 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { analyzeSymptoms, getSeverityMeta, SYMPTOMS } from '../logic/healthAnalyzer';
import Header from '../components/Header';


export default function ResultScreen({ navigation, route }) {
  const { selectedIds = [] } = route.params || {};

  // Run analysis
  const result = analyzeSymptoms(selectedIds);
  const severityMeta = getSeverityMeta(result.severity);

  const selectedSymptoms = SYMPTOMS.filter((s) => selectedIds.includes(s.id));

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />

      <Header
        title="Your Results"
        subtitle="Based on your selected symptoms"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Severity Badge */}
        <View style={[styles.severityBadge, { backgroundColor: severityMeta.bg, borderColor: severityMeta.color }]}>
          <Text style={styles.severityEmoji}>{severityMeta.emoji}</Text>
          <View>
            <Text style={[styles.severityLabel, { color: severityMeta.color }]}>
              {severityMeta.label}
            </Text>
            <Text style={[styles.conditionText, { color: severityMeta.color }]}>
              {result.condition}
            </Text>
          </View>
        </View>

        {/* Advice Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💬 Health Advice</Text>
          <Text style={styles.adviceText}>{result.advice}</Text>
        </View>

        {/* Selected Symptoms */}
        {selectedSymptoms.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              🩺 Reported Symptoms ({selectedSymptoms.length})
            </Text>
            <View style={styles.symptomsWrap}>
              {selectedSymptoms.map((s) => (
                <View key={s.id} style={styles.symptomChip}>
                  <Text style={styles.chipIcon}>{s.icon}</Text>
                  <Text style={styles.chipLabel}>{s.label}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Tips */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📋 What To Do</Text>
          {result.tips.map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <View style={styles.tipBullet}>
                <Text style={styles.tipBulletText}>{i + 1}</Text>
              </View>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            ⚕️ This is general health information only. It is{' '}
            <Text style={styles.bold}>not a medical diagnosis</Text>. Please consult a
            qualified healthcare professional for proper medical advice. 
          </Text>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => navigation.navigate('SymptomSelection')}
          activeOpacity={0.85}
        >
          <Text style={styles.retryText}>← Check Different Symptoms</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.85}
        >
          <Text style={styles.homeText}>🏠 Back to Home</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },

  // Severity badge
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 2,
    gap: 14,
  },
  severityEmoji: {
    fontSize: 36,
  },
  severityLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  conditionText: {
    fontSize: 20,
    fontWeight: '800',
  },

  // Cards
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  adviceText: {
    fontSize: 15,
    color: '#1f2937',
    lineHeight: 22,
  },

  // Symptom chips
  symptomsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    gap: 4,
  },
  chipIcon: {
    fontSize: 14,
  },
  chipLabel: {
    fontSize: 13,
    color: '#1e40af',
    fontWeight: '600',
  },

  // Tips
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 10,
  },
  tipBullet: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  tipBulletText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },

  // Disclaimer
  disclaimer: {
    backgroundColor: '#fefce8',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#f59e0b',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#374151',
    lineHeight: 18,
  },
  bold: {
    fontWeight: '700',
  },

  // Buttons
  retryButton: {
    borderWidth: 2,
    borderColor: '#1d4ed8',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  retryText: {
    color: '#1d4ed8',
    fontSize: 15,
    fontWeight: '700',
  },
  homeButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  homeText: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '600',
  },
});
