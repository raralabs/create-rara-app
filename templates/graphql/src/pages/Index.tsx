import { Image, Box, Center, Text, Button } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/layout';
function Index() {
  return (
    <Center h="100vh">
      <Box boxSize="sm">
        <VStack spacing="9">
          <Image src="/icons/favicon.svg" alt="Dan Abramov" />

          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Create-Rara-App with Vite, GraphQL, Typescript, React-query, React-location
          </Text>
          <Button> Learn more</Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default Index;
