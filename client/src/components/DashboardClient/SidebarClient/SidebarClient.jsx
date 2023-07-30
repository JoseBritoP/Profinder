// import { AiOutlineUsergroupAdd} from 'react-icons/ai'
import { Box, Stack, Text, useColorModeValue, IconButton, Collapse, useMediaQuery, Tooltip} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, EditIcon, StarIcon, QuestionOutlineIcon, ChatIcon} from '@chakra-ui/icons';
import { useState } from 'react';

const SidebarClient = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  if(isLargerThanMd && isOpen){
    setIsOpen(!isOpen)
  }
  const linkStyle = {
    display: 'block',
    padding: '10px',
    textDecoration: 'none',
    color: useColorModeValue('gray.700', 'gray.200'),
    _hover: {
      bg: useColorModeValue('gray.200', 'gray.700'),
    },
    
  };

  return (
    <Box as="aside" width={{
      md: "100px",
      lg:"200px"
    }} 
    h="100vh" bg={useColorModeValue("gray.200", "gray.900")} py={4} px={2}  >
      {!isLargerThanMd ? (
        // Flex y tenía el iconButton y todo Collapse
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          size="md"
          onClick={toggleCollapse}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          alignSelf="flex-end"
         
        />
      ) : (
        <Stack spacing={4}>
          <NavLink to="/dashboardClient/editForm" style={linkStyle} activeClassName="active">
            <Text>Editar perfil</Text>
          </NavLink>
          <NavLink
            to="/dashboardClient/recomended"
            style={linkStyle}
            activeClassName="active"
          >
            <Text>Recomendados</Text>
          </NavLink>
          {/* <NavLink
            to="/categories"
            style={linkStyle}
            activeClassName="active"
          >
            <Text>Profesionales</Text>
          </NavLink> */}
          {/* <NavLink to="/dashboardClient/favorites" style={linkStyle} activeClassName='active'>
            <Text>Favoritos</Text>
          </NavLink> */}
          <NavLink
            to="/dashboardClient/feedbackform"
            style={linkStyle}
            activeClassName="active"
          >
            <Text>Formulario de feedback</Text>
          </NavLink>
          <NavLink
            to="/dashboardClient/help"
            style={linkStyle}
            activeClassName="active"
          >
            <Text>Ayuda</Text>
          </NavLink>
        </Stack>
      )}
      <Collapse in={isOpen}>
        <Stack spacing={4}>
          <NavLink to="/dashboardClient/editForm" style={linkStyle} activeClassName="active">
            <Tooltip label="Editar perfil" aria-label="Editar perfil">
              <EditIcon />
            </Tooltip>
          </NavLink>
          <NavLink to="/dashboardClient/recomended" style={linkStyle} activeClassName="active">
            <Tooltip label="Recomendados" aria-label="Recomendados">
              <StarIcon />
            </Tooltip>
          </NavLink>
          {/* <NavLink to="/dashboardClient/favorites" style={linkStyle} activeClassName= "active">
            <Tooltip label="Favoritos" aria-label="Favoritos">
              <StarIcon />
            </Tooltip>
          </NavLink> */}
          {/* <NavLink to="/categories" style={linkStyle} activeClassName="active">
            <Tooltip label="Profesionales" aria-label="Profesionales">
              <SearchIcon/>
            </Tooltip>
          </NavLink> */}
          <NavLink to="/dashboardClient/feedbackform" style={linkStyle} activeClassName="active">
            <Tooltip label="Feedback" aria-label="Feedback">
              <ChatIcon />
            </Tooltip>
          </NavLink>
          <NavLink to="/dashboardClient/help" style={linkStyle} activeClassName="active">
            <Tooltip label="Ayuda" aria-label="Ayuda">
              <QuestionOutlineIcon />
            </Tooltip>
          </NavLink>
        </Stack>
      </Collapse>
    </Box>
  );
};

export default SidebarClient;