import {
    Image,
    Box,
    Center,
    Text,
    Code,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Kbd,
  } from '@chakra-ui/react';
  import { VStack } from '@chakra-ui/layout';

  function Index() {
    return (
      <Center h="100vh">
        <VStack boxSize="xl">
          <Box w="sm" mb="8">
            <Image src="/icons/favicon.svg" alt="Rara Labs" />
          </Box>
          <Text fontSize="xl" textAlign="center">
            Create-Rara-App with Vite, GraphQL, Typescript, React-query, React-location
          </Text>

          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Generate Schema</AlertTitle>
            <AlertDescription>
              To Generate Schemas from the given schema path(VITE_SCHEMA_PATH) you need to add any
              queries in a <Kbd> *.graphql</Kbd> file (recommended: within graphql folder)
            </AlertDescription>
          </Alert>

          <Alert status="info">
            <AlertIcon />
            <AlertTitle mr={2}>Run Script</AlertTitle>
            <AlertDescription>
              To start vite server and watch for changing graphql file (Recommended)
              <Code>Yarn dev</Code> or <Code>npm run dev</Code>
            </AlertDescription>
          </Alert>
        </VStack>
      </Center>
    );
  }

  export default Index;
