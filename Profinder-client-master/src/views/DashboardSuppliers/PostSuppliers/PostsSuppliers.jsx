import { useSessionState } from "../../../services/zustand/useSession";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostProfesional,
  deletePost,
} from "../../../services/redux/actions/actions";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  Grid,
  Button,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PostsSuppliers = () => {
  const session = useSessionState((state) => state.session);
 // console.log(session);

  const profesionales = useSelector((state) => state.profesionales);
  //console.log(profesionales);
  const filteredPosts = profesionales.filter((post) => post.id === session.id);
 console.log(filteredPosts.posts);

  const dispatch = useDispatch();
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    dispatch(getPostProfesional());
  }, [dispatch]);

  const handleToggleContent = () => {
    setShowFullContent((prevValue) => !prevValue);
  };

  const navigate = useNavigate();

  const handleDeletePost = async (postId) => {
    console.log("ID del posteo a eliminar:", postId);
    try {
      await dispatch(deletePost(postId));
      navigate("/dashboardSuppliers");
    } catch (error) {
      console.error("Error al eliminar el post:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Stack mt={12} justify="center" spacing={10} align="center">
      {/* <Flex > */}
      <Grid
        templateColumns={["1fr", "1fr", "1fr", "repeat(3, 1fr)"]}
        gap={5}
        justifyContent="center"
      >
        {filteredPosts.map((professional) =>
          professional.posts.map((post) => (
            <Box
              key={post.id}
              maxW={"450px"}
              w={"full"}
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
              p={6}
              marginLeft="10px"
              bg={useColorModeValue("blackAlpha.800", "gray.800")}
            >
              <Box justifyContent="center" marginTop="5">
                {/* Título del post */}
                <Text
                  color={"teal.400"}
                  textTransform={"uppercase"}
                  fontWeight={700}
                  fontSize={"xl"}
                  letterSpacing={1.1}
                >
                  {post.title}
                </Text>
              </Box>

              <Box justifyContent="center">
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
                      borderRadius="xl"
                      marginTop="5"
                      bg="gray.800"
                    />
                  ))}
                </Slider>
              </Box>
              {/* Botón Leer más / Ver menos */}
              {post.content.length > 100 && (
                <Button
                  colorScheme="blue"
                  size="sm"
                  mt={2}
                  onClick={handleToggleContent}
                  bg="teal.400"
                  color="white"
                  _hover={{ bg: "teal.500" }}
                >
                  {showFullContent ? "Ver menos" : "Leer más"}
                </Button>
              )}

              {/* Contenido del post */}
              <Text color={"gray.500"}>
                {showFullContent
                  ? post.content
                  : post.content.substring(0, 100)}
              </Text>

              <Box justifyContent="flex-end">
                <Link to={`/dashboardSuppliers/updatepost/${post.id}`}>
                  <EditIcon cursor="pointer" bg="gray.500" />
                </Link>
                <DeleteIcon
                  cursor="pointer"
                  onClick={() => handleDeletePost(post.id)}
                  color="gray.500"
                  w={6}
                  h={6}
                  ml={2}
                  p={1}
                />
              </Box>
            </Box>
          ))
        )}
      </Grid>
    </Stack>
  );
};

export default PostsSuppliers;
