import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
  Heading,
  ButtonGroup,
} from "@chakra-ui/react";
import {
  postSessionUser,
  postCliente,
} from "../../services/redux/actions/actions";
import { useCredentials } from "../../utils/customHooks/useCredentials";
import PrivacyNotice from "../../components/PrivacyNotice/PrivacyNotice";
import GoogleAuthButton from "../../singleComponents/GooglAuthButton";
// import { uploadFile } from "../../utils/Firebase/config";

function FormCliente(props) {
  const dispatch = useDispatch();
  const { handleUserSession } = useCredentials();

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      // image: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    // const imageData = await uploadFile(data.image);
    const newData = {
      name: data.name,
      email: data.email,
      password: data.password,
      // image: imageData,
      phone: data.phone,
    };

    const dataSession = {
      name: data.name,
      email: data.email,
      password: data.password,
      usuario: "c",
    };

    console.log(newData);
    await dispatch(postSessionUser(dataSession));
    dispatch(postCliente(newData));
    handleUserSession("Cuenta creada", "Algo salio mal");
  };

  return (
    <Flex
      minH="80vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.800", "gray.800")}
      // width={{ base: "90%", sm: "80%", md: "60%", lg: "500px" }}
    >
      <Box
        rounded="lg"
        bg={useColorModeValue("blackAlpha.800", "gray800")}
       
        p={8}
        color="gray.300"
        width={{ base: "90%", sm: "80%", md: "60%", lg: "500px" }}
      >
        <Stack spacing={4}>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Heading
            fontSize='4xl'
            bgGradient='linear(to-l, teal.300, green.400)'
            bgClip='text'
            align='center'

          >
            REGISTRATE
          </Heading>
            <FormControl marginTop="5">
              <FormLabel>Nombre y apellido</FormLabel>
              <Input
                type="text"
                {...register("name", {
                  required: "El campo nombre y apellido es requerido",
                  pattern: {
                    value: /^[a-zA-ZñÑ\s]+$/,
                    message:
                      "El nombre y apellido no puede contener expresiones especiales o símbolos",
                  },
                  minLength: {
                    value: 2,
                    message:
                      "El nombre y apellido deben tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message:
                      "El nombre y apellido no puede tener más de 100 caracteres",
                  },
                })}
              />
              {errors.name && (
                <span style={{ color: "red" }}>{errors.name.message}</span>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                {...register("email", {
                  required: "El campo email es requerido",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    message: "El formato del email es incorrecto",
                  },
                })}
              />
              {errors.email && (
                <span style={{ color: "red" }}>{errors.email.message}</span>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                isRequired
                {...register("password", {
                  required: "El campo contraseña es requerido",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                    message:
                      "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número",
                  },
                })}
              />
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password.message}</span>
              )}
            </FormControl>

            <FormControl mb="30px">
              <FormLabel>Telefono</FormLabel>
              <Input
                type="number"
                {...register("phone", {
                  required: "El campo teléfono es requerido",
                  pattern: {
                    value: /^\d+$/,
                    message: "El teléfono solo debe contener números",
                  },
                  minLength: {
                    value: 10,
                    message: "El teléfono debe tener al menos 10 dígitos",
                  },
                  maxLength: {
                    value: 10,
                    message: "El teléfono no puede tener más de 10 dígitos",
                  },
                })}
              />
              {errors.phone && (
                <span style={{ color: "red" }}>{errors.phone.message}</span>
              )}
            </FormControl>

            <FormControl>
              <FormLabel />
              <ButtonGroup
                flexWrap='wrap-reverse'
                justifyContent='center'
                spacing={5}
              >
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg="blue.400"
                  color="white"
                  mt={4}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Registrarme
                </Button>
                <GoogleAuthButton
                  setValue={setValue}
                />
                <PrivacyNotice />
              </ButtonGroup>
            </FormControl>
          </form>
        </Stack>
      </Box>
    </Flex>
  );
}

export default FormCliente;
