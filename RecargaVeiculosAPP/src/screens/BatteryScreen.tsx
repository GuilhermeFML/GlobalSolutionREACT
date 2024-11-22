import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, Button, Center, Text, Input, FormControl, HStack, IconButton, VStack } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator'; // Importação da tipagem correta
import { Ionicons } from '@expo/vector-icons';

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
  const [chargingType, setChargingType] = useState('');
  const [submittedData, setSubmittedData] = useState<
    { id: number; model: string; time: number; status: string; type: string; countdown: number }[]
  >([]);

  // Atualiza a contagem regressiva para todos os itens
  useEffect(() => {
    const timer = setInterval(() => {
      setSubmittedData((prevData) =>
        prevData.map((item) => ({
          ...item,
          countdown: item.countdown > 0 ? item.countdown - 1 : 0,
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    if (!vehicleModel || !chargingTime || !chargingStatus || !chargingType) return;

    const timeInSeconds = parseInt(chargingTime) * 3600; // Convertendo horas para segundos
    const newData = {
      id: Date.now(),
      model: vehicleModel,
      time: timeInSeconds,
      status: chargingStatus,
      type: chargingType,
      countdown: timeInSeconds,
    };
    setSubmittedData([...submittedData, newData]);
    setVehicleModel('');
    setChargingTime('');
    setChargingStatus('');
    setChargingType('');
  };

  const handleDelete = (id: number) => {
    setSubmittedData(submittedData.filter((item) => item.id !== id));
  };

  // Formata a contagem regressiva em HH:MM:SS
  const formatCountdown = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} bg="#f0f0f0" p={4}>
        <Box w="100%" maxW="400px" p={6} bg="white" borderRadius={10} shadow={3}>
          <FormControl isRequired>
            <FormControl.Label _text={{ color: 'gray.700' }}>Modelo do Veículo</FormControl.Label>
            <Input
              value={vehicleModel}
              onChangeText={setVehicleModel}
              placeholder="Exemplo: Carro Elétrico XYZ"
              borderColor="gray.400"
              bg="gray.100"
              _focus={{ borderColor: 'green.500' }}
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormControl.Label _text={{ color: 'gray.700' }}>Tipo de Carga para o Veículo</FormControl.Label>
            <Input
              value={chargingType}
              onChangeText={setChargingType}
              placeholder="Elétrico ou Solar"
              borderColor="gray.400"
              bg="gray.100"
              _focus={{ borderColor: 'green.500' }}
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormControl.Label _text={{ color: 'gray.700' }}>Tempo de Carga (Horas)</FormControl.Label>
            <Input
              value={chargingTime}
              onChangeText={setChargingTime}
              placeholder="Exemplo: 2"
              keyboardType="numeric"
              borderColor="gray.400"
              bg="gray.100"
              _focus={{ borderColor: 'green.500' }}
            />
          </FormControl>

          <FormControl isRequired mt={4}>
            <FormControl.Label _text={{ color: 'gray.700' }}>Status da Estação</FormControl.Label>
            <Input
              value={chargingStatus}
              onChangeText={setChargingStatus}
              placeholder="Exemplo: Desconectada"
              borderColor="gray.400"
              bg="gray.100"
              _focus={{ borderColor: 'green.500' }}
            />
          </FormControl>

          <Button
            mt={4}
            onPress={handleSubmit}
            bg="green.500"
            _text={{ color: 'white' }}
            borderRadius={8}
            _hover={{ bg: 'green.600' }}
            _focus={{ bg: 'green.700' }}
          >
            Salvar dados do Veículo
          </Button>
        </Box>

        {/* Lista de cadastros */}
        {submittedData.length > 0 && (
          <VStack mt={6} w="100%" maxW="400px" space={4}>
            {submittedData.map((item) => (
              <Box
                key={item.id}
                p={4}
                bg="white"
                borderRadius={8}
                shadow={2}
                borderWidth={1}
                borderColor="gray.200"
              >
                <HStack justifyContent="space-between" alignItems="center">
                  <VStack>
                    <Text fontSize="md" color="gray.700" bold>
                      Veículo: {item.model}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Tipo de Carga: {item.type}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Tempo Inicial: {Math.floor(item.time / 3600)} horas
                    </Text>
                    <Text fontSize="sm" color="red.600">
                      Contagem Regressiva: {formatCountdown(item.countdown)}
                    </Text>
                  </VStack>
                  <IconButton
                    icon={<Ionicons name="trash-outline" size={24} color="red" />}
                    onPress={() => handleDelete(item.id)}
                    _pressed={{ bg: 'red.50' }}
                  />
                </HStack>
              </Box>
            ))}
          </VStack>
        )}
      </Center>
    </NativeBaseProvider>
  );
};

export default ConsultationsListScreen;
