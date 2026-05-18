import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LanguageProvider } from './context/LanguageContext';

import HomeScreen from './screens/HomeScreen';
import SymptomSelectionScreen from './screens/SymptomSelectionScreen';
import ResultScreen from './screens/ResultScreen';
import ProfileScreen from './screens/ProfileScreen';
import EmergencyScreen from './screens/EmergencyScreen';

const Stack = createNativeStackNavigator(); 

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Home"             component={HomeScreen} />
          <Stack.Screen name="SymptomSelection" component={SymptomSelectionScreen} />
          <Stack.Screen name="Result"           component={ResultScreen} />
          <Stack.Screen name="Profile"          component={ProfileScreen} />
          <Stack.Screen name="Emergency"        component={EmergencyScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}
