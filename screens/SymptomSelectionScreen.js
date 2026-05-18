import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SYMPTOMS } from '../logic/healthAnalyzer';
import SymptomCard from '../components/SymptomCard';
import Header from '../components/Header';
import { useLanguage } from '../context/LanguageContext';

export default function SymptomSelectionScreen({ navigation }) {
  const { t, language } = useLanguage();
  const [selectedIds, setSelectedIds] = useState([]);

  const handleToggle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleClear = () => {
    Alert.alert(
      'Clear Selection',
      'Are you sure you want to clear all selected symptoms?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => setSelectedIds([]) },
      ]
    );
  };

  const handleAnalyze = () => {
    navigation.navigate('Result', { selectedIds });
  };

  const selectionCount = selectedIds.length;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <Header
        title={t('selectSymptoms')}
        subtitle={t('selectSymptomsSubtitle')}
        showBack
        onBack={() => navigation.goBack()}
      />

      <View style={styles.countBar}>
        <Text style={styles.countText}>
          {selectionCount === 0
            ? t('noSymptomsSelected')
            : `${selectionCount} ${t('symptomsSelected')}`}
        </Text>
        {selectionCount > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Text style={styles.clearText}>{t('clearAll')}</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.hint}>{t('selectAllThatApply')}</Text>
        {SYMPTOMS.map((symptom) => (
          <SymptomCard
            key={symptom.id}
            symptom={symptom}
            selected={selectedIds.includes(symptom.id)}
            onToggle={handleToggle}
            lang={language}
          />
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.analyzeButton, selectionCount === 0 && styles.analyzeButtonDisabled]}
          onPress={handleAnalyze}
          activeOpacity={0.85}
        >
          <Text style={styles.analyzeText}>
            {selectionCount === 0
              ? t('analyzeNoSymptoms')
              : `${t('analyze')} ${selectionCount} →`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8fafc' },
  countBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#eff6ff', paddingHorizontal: 18, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: '#dbeafe',
  },
  countText: { fontSize: 13, color: '#1e40af', fontWeight: '600' },
  clearText: { fontSize: 13, color: '#ef4444', fontWeight: '600' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },
  hint: { fontSize: 13, color: '#6b7280', marginBottom: 14, lineHeight: 18 },
  bottomBar: { padding: 16, backgroundColor: '#ffffff', borderTopWidth: 1, borderTopColor: '#e5e7eb' },
  analyzeButton: {
    backgroundColor: '#1d4ed8', borderRadius: 14, paddingVertical: 16, alignItems: 'center',
    shadowColor: '#1d4ed8', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  analyzeButtonDisabled: { backgroundColor: '#93c5fd', shadowOpacity: 0, elevation: 0 },
  analyzeText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
});
