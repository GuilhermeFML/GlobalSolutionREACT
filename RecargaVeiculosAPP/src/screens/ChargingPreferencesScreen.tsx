import React from 'react';
import { NativeBaseProvider, Box, Text, Button, Center } from 'native-base';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type ChargingPreferencesScreenRouteProp = RouteProp<RootStackParamList, 'ChargingPreferences'>;

const ChargingPreferencesScreen = ({ route }: { route: ChargingPreferencesScreenRouteProp }) => {
  const { model, time, status, type } = route.params;

  return (
    <NativeBaseProvider>
      <Center flex={1} bg="white" p={4}>
        <Box w="100%">
          <Text fontSize="xl" mb={4}>Detalhes do Cadastro de Recarga</Text>
          <Text fontSize="lg">Modelo do Veículo: {model}</Text>
          <Text fontSize="lg">Tipo de Carga: {type}</Text> {/* Exibindo o tipo de carga */}
          <Text fontSize="lg">Tempo de Carregamento: {time} horas</Text>
          <Text fontSize="lg">Status da Recarga: {status}</Text>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default ChargingPreferencesScreen;
