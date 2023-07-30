import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ArrowBackIcon } from '@chakra-ui/icons'
import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  Wrap,
  useColorModeValue,
  Container,
  Stack,
  Icon,
  Button,
  Flex,
  ScaleFade,
  Avatar,
  Spacer,
  Spinner,
  useColorMode
} from "@chakra-ui/react";
import {
  FaUserAlt,
  FaRegPaperPlane,
  FaMailBulk,
  FaPhone,
} from "react-icons/fa";

import NoAvatar from "../../assets/defaultImages/sinfoto.webp";
import InfoLabel from "../../singleComponents/InfoLabel";
import SupplierPost from "../../components/SupplierPost/SupplierPost";
import ClieProfChatBot from "./ChatClieProf";

import {
  cleanDetail,
  getProfesionalIdOnline,
} from "../../services/redux/actions/actions";
import SupplierReview from "../../components/SupplierPost/SuplierReview";

const ArticleList = () => {
  const { id } = useParams();
  const profesionalId = useSelector((state) => state.profesionalId);
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();


  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    dispatch(getProfesionalIdOnline(id));

    window.scrollTo(0, 0);
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const hoverStyles = {
    transform: "scale(1.01)",
    cursor: "pointer",
  };
  
  // const bgColor = useColorModeValue("gray.800", "gray.500")
  // const bgColorTwo = useColorModeValue("blackAlpha.800", "gray.800")
  // const bgColorThree = useColorModeValue("teal.500", "teal.400")

  const bgColor = useColorModeValue("gray.100","gray.800")
  const bgColorTwo = useColorModeValue("gray.800","blackAlpha.800")
  const bgColorThree = useColorModeValue("teal.400","teal.500")
  const textColor = useColorModeValue('gray.100', 'white');
  const textColorSection = useColorModeValue('gray.900', 'gray.100');
  const dividerColor = colorMode === 'dark' ? 'gray.100' : 'black';

  if (!profesionalId) {
    return <div>Loading...</div>;
  }
  // console.log(profesionalId[0])

  return (
    <>
      <Spacer h="100px"  bg={bgColor}/>

      <Container
        key={profesionalId.id}
        // color="gray.300"
          bg={bgColor}
        maxW="100%"
        // py="5"
        px={{ base: "2", md: "8", lg: "10rem" }}
        align={"center"}
        justify={"center"}
      >
        {profesionalId.length === 0 ? (
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="lg" />) : 
        (<ScaleFade initialScale={0.9} in>
          <Box>
            <Flex direction={{ base: "column"}}  justify="center" align="center" gap={{ base: "1rem", md: "1rem", lg: "1rem" }} maxW={{ base: "full", md: "900px" }} width="100%">
                <Box flex={{ base: "1", md: "2" }} alignSelf='flex-start'>
                  <Link to="/categories">
                    <Button
                      bg="teal.400"
                      color="white"
                      _hover={{ bg: "teal.500" }}
                      size="lg"
                      w="100%"
                      order={{ base: 2, md: 1 }}
                      alignSelf={{ base: "center", md: "auto" }}
                    >
                      {/* Volver */}
                      <ArrowBackIcon/>
                    </Button>
                  </Link>
                </Box>
                {profesionalId.map(
                  ({ id, name, email, image, ubication, description, professions, years_exp, genre, phone, posts, }) => 
                  (
                    <Box key={id} rounded={{ base: "none", md: "md" }} boxShadow={"2xl"} align={"center"} _hover={hoverStyles} maxW={{ base: "100%", md: "500px" }} mx={{ base: "auto", md: "0" }} mb={{ base: "3rem", md: "0" }} flex={{ base: "1", md: "2" }} bg={bgColorTwo} >
                      <Image src={image || NoAvatar} loading="lazy" alt="Image" boxSize={{ base: "300px", md: "auto" }} maxW={{ base: "300px", md: "100%" }} maxH="300px" objectFit="contain" marginTop="5" borderRadius="10px" />
                      <Stack direction="column" spacing={2} p={8} align="center" textTransform={"uppercase"} fontWeight={700} fontSize={{ base: "lg", md: "2xl" }} letterSpacing={1.1} textAlign="center" >
                        <Heading as="h1" textTransform="uppercase" color={textColor}>
                          {name || "Sin nombre"}
                        </Heading>
                        <InfoLabel textLabel={genre} iconLabel={FaUserAlt} />

                        <InfoLabel textLabel={email} iconLabel={FaMailBulk} />
                        <InfoLabel textLabel={phone} iconLabel={FaPhone} />
                        <Box>
                          <Text fontSize="16px" color={textColor}>Años de experiencia:</Text>
                          <InfoLabel fontSize="20px" textLabel={years_exp} />
                        </Box>
                        <Button onClick={handleChatToggle} bg={bgColorThree} color="white" _hover={{ bg: "teal.600" }} leftIcon={<Icon as={FaRegPaperPlane} />}>
                          Contactar
                        </Button>
                      </Stack>
                    </Box>
                  )
                )}
                <Box flex={{ base: "1", md: "1" }}>
                  {isChatOpen && (
                    <ClieProfChatBot profesionalId={profesionalId} />
                  )}
                </Box>
              </Flex>
            </Box>

            <Box>
              {/* Profesional posteos correocliente@gmail.com Ell12345*/}
              <Flex direction="column" align="center" justify="center" gap={{ base: "1rem"}} my={{ base: 8, md: 16 }}>
                <Heading as="h2" textTransform="uppercase" color={textColorSection}>
                  Trabajos Recientes
                </Heading>
                <Divider my={2} borderColor={dividerColor}/>
                {profesionalId[0].posts.length > 0 ? ( 
                  <Wrap spacing="50px" justify="center">
                    <SupplierPost profesionalId={id} key={profesionalId.id} />
                  </Wrap>
                  ) : (
                  <Text color='white'>No hay trabajos recientes</Text>
                )}
             </Flex>
            </Box>
            <>
              <Heading as="h2" textTransform="uppercase" color={textColorSection}> Reseñas</Heading>
              <Divider my={2} borderColor={dividerColor} />
              {profesionalId[0].reviews.length > 0 ? ( 
               <Flex justifyContent="center" alignItems="center" flexDirection={{ base: "column", md: "row" }}>
                  <SupplierReview profesionalId={id} key={profesionalId.id} />
                </Flex>
                ) : (
                <Text color='white'>No hay reseñas de los usuarios</Text>
              )}
            </>
          </ScaleFade>
        )}
        <Divider padding="10px" borderColor={dividerColor} />
      </Container>
    </>
  );
};

export default ArticleList;
