import { Flex,Box,Grid, Spacer } from '@chakra-ui/react';
import EditClient from '../../../components/DashboardClient/EditClient/EditClient';
import SidebarClient from '../../../components/DashboardClient/SidebarClient/SidebarClient';

const DashboardClientEditForm = () => {
  return (   
    <Flex >

      <SidebarClient />

      <Spacer />

      <EditClient/>
    </Flex>
    // <Box display={{ base: 'grid', lg: 'flex' }} height="100vh">
    //   <Grid templateRows="5% 95%" display={{ base: 'grid', sm: 'grid',md: 'flex', lg: 'flex'}} width='100%'>
    //     <SidebarClient />
    //     <EditClient/>
    //   </Grid>
    // </Box>
  );
};

export default DashboardClientEditForm;