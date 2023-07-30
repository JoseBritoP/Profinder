import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  cleanDetail,
  getPostProfesional,
} from "./../../services/redux/actions/actions";
import {
  Box,
  Text,
  VStack,
  Image,
  Grid,
  Button,
  Flex,
  useColorModeValue,
  SimpleGrid,
  Stack,
  useColorMode
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

//! aca esta lo mismo
async function fetchPostId() {
  // Simulamos una pausa con setTimeout (puedes reemplazarlo con tu lógica de obtención de ID asincrónico)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(/* aquí obtén el valor del ID asincrónicamente */);
    }, 1000); // Tiempo de pausa de 1 segundo (puedes ajustarlo según tus necesidades)
  });
}

export default function SupplierPost() {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const professional = useSelector((state) => state.profesionalId);
  const [id, setId] = useState(null); // Utilizamos useState para almacenar el valor del ID
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullContent, setShowFullContent] = useState(false);
  // console.log(professional);
  const cardBgColor = colorMode === 'light' ? 'white' : bgColor;

  useEffect(() => {
    // Función asincrónica para obtener el ID
    async function getIdAsync() {
      const postId = await fetchPostId();
      setId(postId);
    }

    getIdAsync(); // Llamamos a la función para obtener el ID asincrónicamente
  }, []);

  useEffect(() => {
    // Llamamos a la acción de Redux solo cuando tengamos el ID
    if (id) {
      dispatch(getPostProfesional(id));
    }
  }, [dispatch, id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const handleToggleContent = () => {
    setShowFullContent((prevValue) => !prevValue);
  };

  if (!professional || !professional[0]) {
    return <Text>Loading...</Text>;
  }

  return (
    <Stack mt={12} justify="center" spacing={10} align="center" >
      <Grid
        templateColumns={["3fr", "3fr", "3fr", "repeat(3, 1fr)"]}
        gap={5}
        justifyContent="center"
      >
        {professional ? (
          professional[0].posts.map((post) => (
            <Box
              key={post.id}
              bg={bgColor}
              
              maxW={"450px"}
              w={"full"}
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
              p={6}
              marginLeft="10px"
            >
              <Box justifyContent="center">
                <EditIcon
                  position="absolute"
                  top="20px"
                  right="20px"
                  cursor="pointer"
                />
              </Box>
              <Box justifyContent="center" marginTop="5">
                <Text
                  color={"teal.500"}
                  textTransform={"uppercase"}
                  fontWeight={700}
                  letterSpacing={1.1}
                  fontSize={{ base: "xl", md: "2xl" }}
                >
                  {post.title}
                </Text>
              </Box>

              <Slider {...settings}>
                {post.image.map((img, index) => (
                  <Image
                    key={index}
                    justifyContent="center"
                    src={img}
                    alt={`Image ${index}`}
                    boxSize={{ base: "300px", md: "auto" }}
                    maxW={{ base: "300px", md: "100%" }}
                    maxH="300px"
                    objectFit="contain"
                    borderRadius="lg"
                    marginTop="5"
                  />
                ))}
              </Slider>
              <Box>
                {post.content.length > 100 && (
                  <Button
                    bg="teal.400"
                    color="white"
                    _hover={{ bg: "teal.500" }}
                    size="sm"
                    mt={2}
                    onClick={handleToggleContent}
                  >
                    {showFullContent ? "Ver menos" : "Leer más"}
                  </Button>
                )}

                {/* Contenido del post */}
                <Text color={useColorModeValue('gray.900','gray.100')}>
                  {showFullContent
                    ? post.content
                    : post.content.substring(0, 100)}
                </Text>
              </Box>
            </Box>
          ))
        ) : (
          <Text>No posts found for the given identifier.</Text>
        )}
      </Grid>
    </Stack>
  );
}
