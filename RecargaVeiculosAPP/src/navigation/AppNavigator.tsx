import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConsultationsListScreen from '../screens/BatteryScreen';  
import ChargingPreferencesScreen from '../screens/ChargingPreferencesScreen';  

// Definindo o RootStackParamList com todos os parâmetros corretos
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  ConsultationsList: undefined;
  ChargingPreferences: {  
    model: string;
    time: string;
    status: string;
    type: string;  // Adicionando o novo parâmetro 'type'
  };
  ConfirmAppointment: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
        options={{ title: 'Tela Inicial' }}
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ title: 'Acesse sua conta' }} 
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} 
        options={{ title: 'Cadastrar' }} 
      />
      <Stack.Screen 
        name="ConsultationsList" 
        component={ConsultationsListScreen} 
        options={{ title: 'Tela de Recarga' }} 
      />
      <Stack.Screen 
        name="ChargingPreferences" 
        component={ChargingPreferencesScreen}  
        options={{ title: 'Cadastro de veículo realizado com sucesso!' }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
