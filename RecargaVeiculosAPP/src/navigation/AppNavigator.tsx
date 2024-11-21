import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConsultationsListScreen from '../screens/BatteryScreen';  // Corrigido o caminho da tela
import ChargingPreferencesScreen from '../screens/ChargingPreferencesScreen';  // Nova tela de ajustes de carregamento

// Definindo o RootStackParamList com todos os parâmetros corretos
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  ConsultationsList: undefined;
  ChargingPreferences: {  // Alteração: agora inclui os parâmetros 'model', 'time', 'status', e 'type'
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
        options={{ title: 'Tela Inicial' }} // Título personalizável
      />
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ title: 'Acesse sua conta' }} // Título personalizável
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} 
        options={{ title: 'Cadastrar' }} // Título personalizável
      />
      <Stack.Screen 
        name="ConsultationsList" 
        component={ConsultationsListScreen} 
        options={{ title: 'Tela de Recarga' }} // Título personalizável
      />
      <Stack.Screen 
        name="ChargingPreferences" 
        component={ChargingPreferencesScreen}  // A nova tela
        options={{ title: 'Cadastro de veículo realizado com sucesso!' }} // Título para a nova tela
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
