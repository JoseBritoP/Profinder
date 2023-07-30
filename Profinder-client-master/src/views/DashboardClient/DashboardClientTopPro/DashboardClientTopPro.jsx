import { Flex,Grid,Box,useColorModeValue } from '@chakra-ui/react';
import TopPro from '../../../components/Home/TopPro/TopPro';
import SidebarClient from '../../../components/DashboardClient/SidebarClient/SidebarClient';

const DashboardClient = () => {
  const backgroundColor = useColorModeValue('gray.100', 'gray.800');

  return (
    <Flex bg={backgroundColor}>
      <SidebarClient />
      <Flex justifyContent="center" alignItems="center" height="100%" width="100%" >
        <TopPro />
      </Flex>
    </Flex>
  );
};

export default DashboardClient;