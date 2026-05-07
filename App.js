
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import SymptomSelectionScreen from './screens/SymptomSelectionScreen';
import ResultScreen from './screens/ResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,   
          animation: 'slide_from_right',
        }}
      >
        {/* Screen 1: Home / Landing */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        {/* Screen 2: Symptom Selection */}
        <Stack.Screen
          name="SymptomSelection"
          component={SymptomSelectionScreen}
        />

        {/* Screen 3: Result / Advice */}
        <Stack.Screen
          name="Result"
          component={ResultScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
