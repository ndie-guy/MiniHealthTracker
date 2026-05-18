import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, Linking, Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header';
import { useLanguage } from '../context/LanguageContext';

const EMERGENCY_CONTACTS = [
  { name: 'SAMU Sénégal',       number: '15',   icon: '🚑', color: '#ef4444', bg: '#fef2f2', desc: 'Medical Emergency' },
  { name: 'Pompiers',           number: '18',   icon: '🚒', color: '#f97316', bg: '#fff7ed', desc: 'Fire & Rescue' },
  { name: 'Police Nationale',   number: '17',   icon: '🚔', color: '#3b82f6', bg: '#eff6ff', desc: 'Police Emergency' },
  { name: 'Numéro d\'Urgence',  number: '112',  icon: '📞', color: '#8b5cf6', bg: '#f5f3ff', desc: 'Universal Emergency' },
  { name: 'Croix Rouge',        number: '338691010', icon: '🏥', color: '#22c55e', bg: '#f0fdf4', desc: 'Red Cross Senegal' },
  { name: 'Anti-Poison Center', number: '338236362', icon: '⚗️', color: '#f59e0b', bg: '#fffbeb', desc: 'Poison Control' },
];

export default function EmergencyScreen({ navigation }) {
  const { t } = useLanguage();

  const handleCall = (number, name) => {
    Alert.alert(
      `📞 Call ${name}?`,
      `You are about to call ${number}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: t('callNow'),
          style: 'destructive',
          onPress: () => Linking.openURL(`tel:${number}`),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <Header
        title={t('emergencyTitle')}
        subtitle={t('emergencySubtitle')}
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Warning Banner */}
        <View style={styles.warningBanner}>
          <Text style={styles.warningIcon}>🆘</Text>
          <Text style={styles.warningText}>{t('emergencyNote')}</Text>
        </View>

        {/* Contact Cards */}
        {EMERGENCY_CONTACTS.map((contact, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.contactCard, { borderLeftColor: contact.color }]}
            onPress={() => handleCall(contact.number, contact.name)}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: contact.bg }]}>
              <Text style={styles.contactIcon}>{contact.icon}</Text>
            </View>

            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactDesc}>{contact.desc}</Text>
              <Text style={[styles.contactNumber, { color: contact.color }]}>
                📱 {contact.number}
              </Text>
            </View>

            <View style={[styles.callBtn, { backgroundColor: contact.color }]}>
              <Text style={styles.callBtnText}>{t('callNow')}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* First Aid Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>🩹 Basic First Aid Tips</Text>
          {[
            'Stay calm and assess the situation',
            'Check if the person is conscious and breathing',
            'Do not move someone with a possible spinal injury',
            'Apply pressure to stop bleeding',
            'Keep the person warm and comfortable until help arrives',
          ].map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <View style={styles.tipBullet}>
                <Text style={styles.tipBulletText}>{i + 1}</Text>
              </View>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 16, paddingBottom: 40 },

  // Warning banner
  warningBanner: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fef2f2',
    borderRadius: 12, padding: 14, marginBottom: 16,
    borderWidth: 1.5, borderColor: '#fecaca', gap: 10,
  },
  warningIcon: { fontSize: 24 },
  warningText: { flex: 1, fontSize: 13, color: '#991b1b', lineHeight: 18, fontWeight: '500' },

  // Contact cards
  contactCard: {
    backgroundColor: '#ffffff', borderRadius: 14, padding: 14,
    marginBottom: 10, flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#e5e7eb', borderLeftWidth: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
    gap: 12,
  },
  iconCircle: {
    width: 48, height: 48, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center',
  },
  contactIcon: { fontSize: 22 },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 15, fontWeight: '700', color: '#1f2937', marginBottom: 2 },
  contactDesc: { fontSize: 11, color: '#9ca3af', marginBottom: 3 },
  contactNumber: { fontSize: 13, fontWeight: '700' },
  callBtn: {
    paddingVertical: 8, paddingHorizontal: 14,
    borderRadius: 10, alignItems: 'center',
  },
  callBtnText: { color: '#ffffff', fontSize: 12, fontWeight: '700' },

  // Tips card
  tipsCard: {
    backgroundColor: '#ffffff', borderRadius: 14, padding: 16,
    marginTop: 6, borderWidth: 1, borderColor: '#e5e7eb',
  },
  tipsTitle: { fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 14 },
  tipRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 10 },
  tipBullet: {
    width: 22, height: 22, borderRadius: 11, backgroundColor: '#ef4444',
    alignItems: 'center', justifyContent: 'center', marginTop: 1,
  },
  tipBulletText: { color: '#ffffff', fontSize: 11, fontWeight: '700' },
  tipText: { flex: 1, fontSize: 14, color: '#374151', lineHeight: 20 },
});
