import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView,
  TouchableOpacity, Alert, ActivityIndicator, RefreshControl,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { loadSymptomHistory, deleteSymptomCheck } from '../logic/supabase';
import { getSeverityMeta } from '../logic/healthAnalyzer';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

export default function HistoryScreen({ navigation }) {
  const { user } = useAuth();
  const [history, setHistory]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Reload history every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  const fetchHistory = async () => {
    setLoading(true);
    const { data, error } = await loadSymptomHistory(user.id);
    if (!error && data) setHistory(data);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const { data, error } = await loadSymptomHistory(user.id);
    if (!error && data) setHistory(data);
    setRefreshing(false);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Record',
      'Are you sure you want to delete this record?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const { error } = await deleteSymptomCheck(id);
            if (!error) {
              setHistory((prev) => prev.filter((h) => h.id !== id));
            } else {
              Alert.alert('Error', 'Could not delete this record.');
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <Header
        title="Symptom History"
        subtitle="Your past health checks"
        showBack
        onBack={() => navigation.goBack()}
      />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#1d4ed8" />
          <Text style={styles.loadingText}>Loading your history...</Text>
        </View>
      ) : history.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyTitle}>No history yet</Text>
          <Text style={styles.emptySubtitle}>
            Your symptom checks will appear here after you analyze symptoms.
          </Text>
          <TouchableOpacity
            style={styles.startBtn}
            onPress={() => navigation.navigate('SymptomSelection')}
          >
            <Text style={styles.startBtnText}>Check Symptoms Now →</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1d4ed8']} />
          }
        >
          <Text style={styles.countText}>{history.length} record{history.length > 1 ? 's' : ''} found</Text>

          {history.map((item) => {
            const meta = getSeverityMeta(item.severity);
            return (
              <View key={item.id} style={[styles.historyCard, { borderLeftColor: meta.color }]}>

                {/* Top row — date and delete */}
                <View style={styles.cardTop}>
                  <Text style={styles.dateText}>🕐 {formatDate(item.created_at)}</Text>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Text style={styles.deleteBtn}>🗑️</Text>
                  </TouchableOpacity>
                </View>

                {/* Condition & severity */}
                <View style={[styles.severityRow, { backgroundColor: meta.bg }]}>
                  <Text style={styles.severityEmoji}>{meta.emoji}</Text>
                  <View>
                    <Text style={[styles.conditionText, { color: meta.color }]}>
                      {item.condition}
                    </Text>
                    <Text style={[styles.severityLabel, { color: meta.color }]}>
                      {meta.label}
                    </Text>
                  </View>
                </View>

                {/* Symptoms */}
                <View style={styles.symptomsRow}>
                  {item.selected_symptoms.map((s, i) => (
                    <View key={i} style={styles.chip}>
                      <Text style={styles.chipText}>{s.replace('_', ' ')}</Text>
                    </View>
                  ))}
                </View>

                {/* Advice preview */}
                <Text style={styles.advicePreview} numberOfLines={2}>
                  💬 {item.advice}
                </Text>

              </View>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 16, paddingBottom: 40 },

  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  loadingText: { marginTop: 12, color: '#6b7280', fontSize: 14 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#1f2937', marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: '#6b7280', textAlign: 'center', lineHeight: 20, marginBottom: 20 },
  startBtn: {
    backgroundColor: '#1d4ed8', borderRadius: 12, paddingVertical: 14,
    paddingHorizontal: 24,
  },
  startBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },

  countText: { fontSize: 12, color: '#6b7280', fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 12 },

  historyCard: {
    backgroundColor: '#ffffff', borderRadius: 14, padding: 14,
    marginBottom: 12, borderWidth: 1, borderColor: '#e5e7eb', borderLeftWidth: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  dateText: { fontSize: 12, color: '#6b7280' },
  deleteBtn: { fontSize: 18 },

  severityRow: {
    flexDirection: 'row', alignItems: 'center', borderRadius: 10,
    padding: 10, marginBottom: 10, gap: 10,
  },
  severityEmoji: { fontSize: 24 },
  conditionText: { fontSize: 15, fontWeight: '700' },
  severityLabel: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },

  symptomsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  chip: {
    backgroundColor: '#eff6ff', borderRadius: 20, paddingHorizontal: 10,
    paddingVertical: 4, borderWidth: 1, borderColor: '#bfdbfe',
  },
  chipText: { fontSize: 11, color: '#1e40af', fontWeight: '600', textTransform: 'capitalize' },

  advicePreview: { fontSize: 12, color: '#6b7280', lineHeight: 17 },
});
