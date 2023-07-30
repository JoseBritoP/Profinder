import { Flex,Grid,Box,Spacer, useColorModeValue } from '@chakra-ui/react';
import FeedbackForm from '../../../components/DashboardClient/FeedbackForm/FeedbackForm';


import SidebarClient from '../../../components/DashboardClient/SidebarClient/SidebarClient';

const DashboardClient = () => {
  const backgroundColor = useColorModeValue('gray.100', 'gray.800');
  return (
    <Flex bg={backgroundColor} >
        <SidebarClient />
        <Spacer  />
        <FeedbackForm/>
      </Flex>
 
    // <Box display={{ base: 'grid', lg: 'flex' }} height="auto">
    //   <Grid templateRows="5% 95%" display={{ base: 'grid', sm: 'grid', md: 'flex', lg: 'flex'}} >
    //     <SidebarClient />
    //     <FeedbackForm />
    //   </Grid>
    // </Box>
  );
};

export default DashboardClient;