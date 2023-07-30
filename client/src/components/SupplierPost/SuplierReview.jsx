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
  VStack,WrapItem, Wrap,
  Image,
  Grid,
  Button,
  Flex,
  useColorModeValue,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

//! aca esta lo mismo
async function fetchPostId() {
  // Simulamos una pausa con setTimeout (puedes reemplazarlo con tu lógica de obtención de ID asincrónico)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(/* aquí obtén el valor del ID asincrónicamente */);
    }, 1000); // Tiempo de pausa de 1 segundo (puedes ajustarlo según tus necesidades)
  });
}

export default function SupplierReview() {
  const [id, setId] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullContent, setShowFullContent] = useState(false);
  const dispatch = useDispatch();
  const professional = useSelector((state) => state.profesionalId);
  // console.log(professional);
  const bgColor = useColorModeValue("white", "gray.800")

  useEffect(() => {
    async function getIdAsync() {
      const postId = await fetchPostId();
      setId(postId);
    }

    getIdAsync();
  }, []);

  useEffect(() => {
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
    <Stack mt={12} justify="center" spacing={10} align="center">
      <Wrap
        spacing={5}
        justify="center"
        // align="center"
      >
        {professional ? (
          professional[0].reviews.map((review) => (
            <WrapItem key={review.id}>
              <Box
                bg={bgColor}
                maxW={"450px"}
                minW={"450px"}
                minH={"120px"}
                maxH={"200px"}
                // w={"full"}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
                p={6}
                marginLeft="10px"
              >
                <Flex direction="row" justify="center">
                  {[...new Array(5)].map((star, index) => {
                    return index < review.rating ?? 0 ? (
                      <FaStar color="yellow" fontSize="1.3rem" key={index} />
                    ) : (
                      <FaStar color="white" fontSize="1.3rem" key={index} />
                    );
                  })}
                </Flex>
                <Box>
                  <Text color={useColorModeValue('gray.900','gray.100')}>
                    {showFullContent
                      ? review.content
                      : review.content.substring(0, 100)}
                  </Text>
                </Box>
              </Box>
            </WrapItem>
          ))
        ) : (
          <Text>No posts found for the given identifier.</Text>
        )}
      </Wrap>
    </Stack>
  );
}
