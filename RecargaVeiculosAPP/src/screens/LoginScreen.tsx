import React, { useState } from 'react';
import { NativeBaseProvider, Box, Button, Input, Center, VStack, Text } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Alert as RNAlert } from 'react-native'; // Importar o Alert do React Native
import { login } from '../api/auth'; // Importe a função de login que você já criou

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const token = await login(username, password);
      console.log('Token:', token);
      RNAlert.alert('Login realizado com sucesso!');
      navigation.navigate('ConsultationsList');
    } catch (err: unknown) {
      // Verificar se err é uma instância de Error
      if (err instanceof Error) {
        RNAlert.alert('Erro', err.message);
      } else {
        RNAlert.alert('Erro', 'Ocorreu um erro inesperado.');
      }
    }
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} bg="#f0f0f0" px={6}>
        <Box w="100%" maxW="400px" p={6} bg="white" borderRadius={10} shadow={3}>
          <VStack space={4}>
            <Text fontSize="xl" color="gray.700" bold textAlign="center">
              Bem-vindo!
            </Text>
            <Text fontSize="md" color="gray.500" textAlign="center">
              Insira suas credenciais para continuar
            </Text>

            <Input
              placeholder="Usuário"
              value={username}
              onChangeText={setUsername}
              borderColor="gray.400"
              bg="gray.100"
              _focus={{ borderColor: 'green.500' }}
            />
            <Input
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              borderColor="gray.400"
              bg="gray.100"
              _focus={{ borderColor: 'green.500' }}
            />

            <Button
              mt={4}
              onPress={handleLogin}
              bg="green.500"
              _text={{ color: 'white', fontSize: 'md' }}
              borderRadius={8}
              _hover={{ bg: 'green.600' }}
              _focus={{ bg: 'green.700' }}
            >
              Entrar
            </Button>

            <Button
              onPress={() => navigation.navigate('SignUp')}
              bg="blue.500"
              _text={{ color: 'white', fontSize: 'md' }}
              borderRadius={8}
              _hover={{ bg: 'blue.600' }}
              _focus={{ bg: 'blue.700' }}
            >
              Cadastrar
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default LoginScreen;
