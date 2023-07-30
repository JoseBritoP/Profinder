import { Flex,Box,Grid, Spacer} from '@chakra-ui/react';
import HelpClient from '../../../components/DashboardClient/HelpClient/HelpClient';
import SidebarClient from '../../../components/DashboardClient/SidebarClient/SidebarClient';

const DashboardClient = () => {

  return (
    <Flex h="100vh">
      <SidebarClient />
      <Spacer />
      <HelpClient maxH="100%"  />
    </Flex>
//   <Box display={{ base: 'grid', lg: 'flex' }} height="100vh">
  //   <Grid templateRows="5% 95%" display={{ base: 'grid', sm: 'grid',md: 'flex', lg: 'flex'}} width='100%'>
  //     <SidebarClient />
  //     <HelpClient />
  //   </Grid>
  // </Box>
  );
};

export default DashboardClient;