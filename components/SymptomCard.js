import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default function SymptomCard({ symptom, selected, onToggle }) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      onPress={() => onToggle(symptom.id)}
      activeOpacity={0.75}
    >
      {/* Selection indicator */}
      <View style={[styles.checkCircle, selected && styles.checkCircleActive]}>
        {selected && <Text style={styles.checkMark}>✓</Text>}
      </View>

      {/* Icon */}
      <Text style={styles.icon}>{symptom.icon}</Text>

      {/* Text */}
      <View style={styles.textBlock}>
        <Text style={[styles.label, selected && styles.labelSelected]}>
          {symptom.label}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {symptom.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkCircleActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  checkMark: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 26,
    marginRight: 12,
  },
  textBlock: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  labelSelected: {
    color: '#1d4ed8',
  },
  description: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
});
