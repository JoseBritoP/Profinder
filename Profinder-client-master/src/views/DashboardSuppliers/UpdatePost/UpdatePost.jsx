import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { uploadFiles2 } from "../../../utils/Firebase/config";
import {
  getAllCategories,
  updatePosts,
} from "../../../services/redux/actions/actions";
import { useSessionState } from "../../../services/zustand/useSession";
import SelectCategories from "../../../singleComponents/SelectCategories";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"



function UpdatePost() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: "",
      ocupation: "",
      category: "",
      images: [],
      content: "",
    },
  });

  const { id } = useParams();
  //console.log(id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedOccupations, setSelectedOccupations] = useState("");
  const dataSuppliers = useSelector((state) => state.profesionales);
  // console.log(dataSuppliers);
  // const userSession = JSON.parse(localStorage.getItem("userSession"));
  const session = useSessionState((state) => state.session);
  const profile = dataSuppliers.find((user) => user.id === session.id);
  // console.log(profile);

  //aqui tengo todos los posteos del profesional,ahora es enviar dicho id
  // const data = profile.posts;
  // console.log(data);

  // const postIguales = dataSuppliers.find((p) => p.post.id === dataSuppliers[0].id)
  // console.log(postIguales);

  const envioCategoria = (value) => {
    setSelectedCategory(value);
  };

  const envioOcupaciones = (value) => {
    setSelectedOccupations(value);
  };

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const imageUrls = await uploadFiles2(data.images);
    const newData = {
      title: data.title,
      image: imageUrls,
      content: data.content,
      ProfesionalId: session.id,
      category: selectedCategory,
      ocupation: selectedOccupations,
    };
    //en new data va la info para actualizar
     console.log(newData);
    dispatch(updatePosts(newData, id));

    navigate("/dashboardSuppliers");
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.800", "gray.800")}
    >
      <Box
        rounded="lg"
        bg={useColorModeValue("blackAlpha.800", "gray800")}
        boxShadow="lg"
        p={8}
        color="gray.300"
        width={{ base: "90%", sm: "80%", md: "70%", lg: "50%" }}
      >
        <Stack spacing={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Titulo</FormLabel>
              <Input
                type="text"
                {...register("title", {
                  required: "El campo nombre es requerido",
                })}
              />
              {errors.title && (
                <span style={{ color: "red" }}>{errors.title.message}</span>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Fotos de trabajos</FormLabel>
              <Input
                type="file"
                multiple // Allow multiple file selection
                {...register("images", {
                  required: "Solo se permiten archivos de imagen JPEG o PNG",
                  validate: {
                    isImage: (value) => {
                      if (value) {
                        const acceptedFormats = [".jpg", ".jpeg", ".png"];
                        for (const file of value) {
                          const fileExtension = file.name.substring(
                            file.name.lastIndexOf(".")
                          );
                          if (!acceptedFormats.includes(fileExtension)) {
                            return false;
                          }
                        }
                      }
                      return true;
                    },
                  },
                })}
              />
              {errors.images && (
                <span style={{ color: "red" }}>{errors.images.message}</span>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Categorías</FormLabel>
              <SelectCategories
                fnSelectCategory={envioCategoria}
                fnSelectOcupation={envioOcupaciones}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Descripcion Trabajo</FormLabel>
              <Textarea
                type="text"
                {...register("content", {
                  required: "El campo es requerido",
                  maxLength: {
                    value: 250,
                    message:
                      "La descripción no puede tener más de 250 caracteres",
                  },
                })}
              />
              {errors.content && (
                <span style={{ color: "red" }}>{errors.content.message}</span>
              )}

              <Button
                size="lg"
                bg="grey.400"
                color="white"
                _hover={{ bg: "grey.500" }}
                type="submit"
                my={2}
              >
                Actualizar
              </Button>
            </FormControl>
          </form>
        </Stack>
      </Box>
    </Flex>
  );
}

export default UpdatePost;
