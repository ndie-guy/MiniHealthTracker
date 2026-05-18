
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

export default function Header({ title, subtitle, showBack, onBack }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1d4ed8" />
      {showBack && (
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      )}
      <View style={[styles.textBlock, showBack && { marginLeft: 36 }]}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d4ed8',
    paddingTop: 16,
    paddingBottom: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    top: 18,
    padding: 4,
    zIndex: 10,
  },
  backArrow: { color: '#ffffff', fontSize: 22, fontWeight: 'bold' },
  textBlock: { flex: 1 },
  title: { color: '#ffffff', fontSize: 20, fontWeight: '700', letterSpacing: 0.3 },
  subtitle: { color: '#bfdbfe', fontSize: 12, marginTop: 2 },
});
