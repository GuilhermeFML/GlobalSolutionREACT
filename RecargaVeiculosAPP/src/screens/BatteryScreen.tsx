import React, { useState } from 'react';
import { NativeBaseProvider, Box, Button, Center, Text, Input, FormControl } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator'; // Importação da tipagem correta

type ConsultationsListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ConsultationsList'
>;

type Props = {
  navigation: ConsultationsListScreenNavigationProp;
};

const ConsultationsListScreen = ({ navigation }: Props) => {
  const [vehicleModel, setVehicleModel] = useState('');
  const [chargingTime, setChargingTime] = useState('');
  const [chargingStatus, setChargingStatus] = useState('');
  const [chargingType, setChargingType] = useState(''); // Novo estado para o tipo de carga
  const [submittedData, setSubmittedData] = useState<{ model: string; time: string; status: string; type: string } | null>(null); 

  const handleSubmit = () => {
    // Armazenando os dados no estado, incluindo o tipo de carga
    const data = { model: vehicleModel, time: chargingTime, status: chargingStatus, type: chargingType };
    setSubmittedData(data);

    // Navegando para a tela de detalhes e passando todos os dados
    navigation.navigate('ChargingPreferences', data);
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} bg="white" p={4}>
        <Box w="100%">
          <FormControl isRequired>
            <FormControl.Label>Modelo do Veículo</FormControl.Label>
            <Input
              value={vehicleModel}
              onChangeText={setVehicleModel}
              placeholder="Exemplo: Carro Elétrico XYZ"
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormControl.Label>Tipo de Carga para o Veículo</FormControl.Label>
            <Input
              value={chargingType}
              onChangeText={setChargingType}
              placeholder="Elétrico ou Solar"
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormControl.Label>Tempo de Carga (Horas)</FormControl.Label>
            <Input
              value={chargingTime}
              onChangeText={setChargingTime}
              placeholder="Exemplo: 2"
              keyboardType="numeric"
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormControl.Label>Status da Recarga</FormControl.Label>
            <Input
              value={chargingStatus}
              onChangeText={setChargingStatus}
              placeholder="Exemplo: Em andamento"
            />
          </FormControl>

          <Button mt={4} onPress={handleSubmit}>
            Salvar dados do Veículo
          </Button>

          {/* Exibindo os dados preenchidos abaixo, se houver */}
          {submittedData && (
            <Box mt={6}>
              <Text fontSize="md">Veículo: {submittedData.model}</Text>
              <Text fontSize="md">Tipo de Carga: {submittedData.type}</Text> {/* Exibindo tipo de carga */}
              <Text fontSize="md">Tempo de Carregamento: {submittedData.time} horas</Text>
              <Text fontSize="md">Status: {submittedData.status}</Text>
            </Box>
          )}
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default ConsultationsListScreen;
