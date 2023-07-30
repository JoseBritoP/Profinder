/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
// import {useState,useEffect} from 'react'
import {
  Heading,
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Tag from "../../singleComponents/Tag";
import NoAvatar from "../../assets/defaultImages/sinfoto.webp";
// import FavoriteButton from '../FavoriteButton/FavoriteButton'
// import { useDispatch } from 'react-redux'
// import { addFavorite,getFavorites,removeFavorite } from '../../services/redux/actions/actions'

import { useSessionState } from "./../../services/zustand/useSession";

export default function SocialProfileSimple({
  id,
  name,
  email,
  image,
  ubication,
  professions,
  rating,
}) {
  const session = useSessionState((state) => state.session);

  // console.log(session)

  // Dispatch
  // const dispatch = useDispatch();
  // // const location = useLocation();
  // // Favorites State
  // const [isFavorite, setIsFavorite] = useState(() => {
  //   const favoriteStatus = localStorage.getItem(`favorite_${id}`);
  //   return favoriteStatus === 'true';
  // });  const [isButtonDisable,setIsButtonDisable] = useState(false)

  // const toggleFavorite = async (id) => {
  //   // Deshabilitar el botón temporalmente para evitar múltiples clics rápidos
  //   setIsButtonDisable(true);

  //   // Obtener el userId del estado de sesión
  //   const userId = session.id;

  //   // Obtener el estado actual de isFavorite desde el localStorage
  //   const currentIsFavorite = localStorage.getItem(`favorite_${userId}_${id}`) === "true";

  //   // Cambiar el estado con o sin retraso según el valor actual de isFavorite
  //   if (currentIsFavorite) {
  //     // Si isFavorite === true, aplicar el retraso de 1500 milisegundos
  //     setTimeout(() => {
  //       setIsFavorite(false);

  //       // Actualizar el localStorage con el nuevo estado de favorito específico para este cliente
  //       localStorage.setItem(`favorite_${userId}_${id}`, "false");
  //     }, 1500);
  //   } else {
  //     // Si isFavorite === false, cambiar el estado inmediatamente sin retraso
  //     setIsFavorite(true);

  //     // Actualizar el localStorage con el nuevo estado de favorito específico para este cliente
  //     localStorage.setItem(`favorite_${userId}_${id}`, "true");
  //   }

  //   // Ejecutar la acción correspondiente (addFavorite o removeFavorite) con un retraso de 1 segundo
  //   setTimeout(async () => {
  //     if (currentIsFavorite) {
  //       await dispatch(removeFavorite(id));
  //     } else {
  //       await dispatch(addFavorite(id));
  //     }

  //     // Luego de realizar la acción, obtener los favoritos actualizados
  //     await dispatch(getFavorites());

  //     // Habilitar nuevamente el botón después de que se realicen las acciones
  //     setIsButtonDisable(false);
  //   }, 900);
  // };
  // Favorites

  // console.log(rating)

  const bgElement = useColorModeValue("white", "gray.800");
  const txtColor = useColorModeValue("gray.600", "gray.100");

  //  UseEffect
  // useEffect(() => {
  //   localStorage.setItem(`favorite_${id}`, isFavorite);
  // }, [id, isFavorite]);

  // // Efecto para recuperar el estado del localStorage al montar el componente
  // useEffect(() => {
  //   const favoriteStatus = localStorage.getItem(`favorite_${id}`);
  //   setIsFavorite(favoriteStatus === 'true');
  // }, [id]);

  return (
    <Box
      maxW="350px"
      height="430px"
      // height='460px'
      w="full"
      bg={bgElement}
      boxShadow="lg"
      rounded="lg"
      p={6}
      textAlign="center"
    >
      {/* {session.status === false || (session.usuario !== "c" && session.status === true )? '' : (
      <Box display='flex' justifyContent='flex-end' >
       <FavoriteButton isFavorite={isFavorite} onClick={()=>toggleFavorite(id)} isDisabled={isButtonDisable} />
     </Box>

      )} */}
      <Avatar
        border="1px"
        size="xl"
        src={image || NoAvatar}
        loading="lazy"
        alt="Avatar"
        mb={4}
        pos="relative"
      />
      <Heading fontSize="2xl" fontFamily="body" color={txtColor} mb={3}>
        {name}
      </Heading>
      <Flex direction="row" justify="center">
        {[...new Array(5)].map((star, index) => {
          return index < rating ?? 0 ? (
            <FaStar color="yellow" fontSize="1.3rem" />
          ) : (
            <FaStar color="white" fontSize="1.3rem" />
          );
        })}
      </Flex>

      <Text fontWeight={600} color="gray.500" noOfLines={1}>
        <AtSignIcon mr={2} color="teal.400" />
        {email}
      </Text>
      <Text fontWeight={600} color="gray.500" mb={4}>
        <Icon as={FaMapMarkerAlt} mr={2} color="teal.400" />
        {`${ubication.country}, ${ubication.location}` || "Sin ubicacion"}
      </Text>
      <Box
        align="center"
        justify="center"
        direction="column"
        wrap="wrap"
        mt={6}
        minH="50px"
      >
        {professions ? (
          professions.map(({ ocupations }) => {
            return ocupations ? (
              ocupations.map(({ id, name }) => {
                return <Tag key={id} textTag={name} />;
              })
            ) : (
              <Tag textTag="Sin definir" />
            );
          })
        ) : (
          <Tag textTag="Sin definir" />
        )}
      </Box>

      <Stack mt={8} direction="row" spacing={4} align="center" justify="center">
        {session.status === false ? (
          <Link to="/userLogin">
            {" "}
            <Button
              flex={1}
              fontSize="sm"
              rounded="lg"
              _hover={{ bg: "gray.300" }}
            >
              Inicia sesion
            </Button>
          </Link>
        ) : (
          <Link to={`/detail/${id}`}>
            <Button
              flex={1}
              fontSize="sm"
              rounded="lg"
              _hover={{ bg: "gray.300" }}
            >
              Ver detalles
            </Button>
          </Link>
        )}
      </Stack>
    </Box>
  );
}
