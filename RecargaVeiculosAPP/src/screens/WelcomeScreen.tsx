import React from 'react';
import { NativeBaseProvider, Box, Button, Center, VStack, Text } from 'native-base';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator'; // Certifique-se de importar isso

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Welcome'
>;

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

const WelcomeScreen = ({ navigation }: Props) => {
  return (
    <NativeBaseProvider>
      <Center flex={1} bg="#f0f0f0" px={6}>
        <Box w="100%" maxW="400px" p={6} bg="white" borderRadius={10} shadow={3}>
          <VStack space={4} alignItems="center">
            <Text fontSize="xl" color="gray.700" bold>
              Bem-vindo!
            </Text>
            <Text fontSize="md" color="gray.500" textAlign="center">
              Explore nosso aplicativo para gerenciar seus veículos e preferências de carregamento.
            </Text>
            <Button
              mt={4}
              onPress={() => navigation.navigate('Login')}
              bg="green.500"
              _text={{ color: 'white', fontSize: 'md' }}
              borderRadius={8}
              _hover={{ bg: 'green.600' }}
              _focus={{ bg: 'green.700' }}
            >
              Ir para Login
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
};

export default WelcomeScreen;
