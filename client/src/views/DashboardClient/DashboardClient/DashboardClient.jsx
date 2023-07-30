import { Grid,Box, useMediaQuery,Flex,Spacer } from '@chakra-ui/react';
import IntroductionDash from '../../../components/DashboardClient/IntroductionDash/IntroductionDash';

import SidebarClient from '../../../components/DashboardClient/SidebarClient/SidebarClient';

const DashboardClient = () => {

  return (
    //! Como estaba antes
  
    <Flex>
      <SidebarClient />
      <Spacer  />
      <IntroductionDash/>
    </Flex>
      
    // <Box display={{ base: 'grid', lg: 'flex' }} height="100vh">
    //   <Grid templateRows="5% 95%" display={{ base: 'grid', sm: 'grid',md: 'flex', lg: 'flex'}} width='100%'>
    //     <SidebarClient />
    //     <IntroductionDash />
    //   </Grid>
    // </Box>
   
  );
};

export default DashboardClient;