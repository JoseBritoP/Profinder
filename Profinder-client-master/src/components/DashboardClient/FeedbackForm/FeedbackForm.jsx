import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Box,
  Center,
  Select,
  Textarea,
  Alert,
  AlertIcon,
  CloseButton,
  Heading,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { updateFeedback } from '../../../services/redux/actions/actions';
import SupplierSelect from './SupplierSelect'; // Importa el componente SupplierSelect desde su ubicación

function FeedbackForm() {
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [rating, setRating] = useState('');
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // Obtener el ID del cliente de la sesión actual desde el almacenamiento local
  const userSession = JSON.parse(localStorage.getItem('userSession'));
  const clientId = userSession && userSession.id ? userSession.id : null;

  const handleRatingChange = (e) => {
    setRating(e.target.value);
    // Limpia el mensaje de error cuando se selecciona una valoración
    setErrorMessage('');
    setShowErrorAlert(false);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    // Realiza la validación en tiempo real del contenido del comentario
    if (e.target.value.trim().split(' ').length <= 3) {
      setErrorMessage('El comentario debe tener más de tres palabras.');
      setShowErrorAlert(true);
    } else {
      setErrorMessage('');
      setShowErrorAlert(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSupplierId) {
      setErrorMessage('Debes seleccionar un proveedor.');
      setShowErrorAlert(true);
      return;
    }

    if (!rating) {
      setErrorMessage('Debes seleccionar una valoración.');
      setShowErrorAlert(true);
      return;
    }

    if (content.trim().split(' ').length <= 3) {
      setErrorMessage('El comentario debe tener más de tres palabras.');
      setShowErrorAlert(true);
      return;
    }

    const newData = {
      content: content,
      rating: Number(rating),
      profesionalId: selectedSupplierId, // Usamos el ID del proveedor seleccionado
      clientId: clientId,
    };
    console.log("Data being sent:", newData);
    dispatch(updateFeedback(newData))
      .then(() => {
        setSuccessMessage('Comentario enviado exitosamente.');
        setShowSuccessAlert(true);
        // Limpia el formulario
        setContent('');
        setRating('');
        setSelectedSupplierId(null); // Limpiamos el ID del proveedor seleccionado
      })
      .catch(() => {
        setErrorMessage('Ha ocurrido un error. Inténtalo nuevamente.');
        setShowErrorAlert(true);
      });
  };

  const textColor = useColorModeValue('black', 'white');
  const bgColor = useColorModeValue('gray.100', 'gray.800'); // Fondo: gay.500 en light y gray.900 en dark
  const textColor2 = useColorModeValue('blue.900', 'blue.400');
  return (
    <Center p={4} color={textColor} h="100%" w="100%" bg={bgColor}>
      <Box mx="auto" maxW="5xl" w="100%">
        <Center>
          <VStack as="form" alignItems="center" textAlign="center" onSubmit={handleSubmit} bg={bgColor} color={textColor}>
            <Heading as="h1" size="2xl" mb={4} color={useColorModeValue('gray.900','gray.100')}>
              ¡Valora tu experiencia con los servicios contratados en el sitio!
            </Heading>
            <Text mb={4} color={textColor2}>
              En esta sección deberás seleccionar al profesional que prestó los servicios y valorar tu experiencia con ellos.
              Haremos un breve recorrido por el formulario:
            </Text>
            <VStack alignItems="flex-start" spacing={4}>
              <Flex alignItems="center">
                <CheckIcon color="green.500" mr={2} />
                <Text>Primero selecciona al profesional que deseas valorar.</Text>
              </Flex>
              <Flex alignItems="center">
                <CheckIcon color="green.500" mr={2} />
                <Text>Luego, escoge la calificación de Malo a Excelente.</Text>
              </Flex>
              <Flex alignItems="center">
                <CheckIcon color="green.500" mr={2} />
                <Text>Finalmente, agrega un comentario sobre tu experiencia con el servicio prestado.</Text>
              </Flex>
              <Flex alignItems="center">
                <CheckIcon color="green.500" mr={2} />
                <Text>Dale a enviar feedback!</Text>
              </Flex>
            </VStack>
            {showSuccessAlert && (
              <Alert status="success" mb={4} rounded="md">
                <AlertIcon />
                {successMessage}
                <CloseButton ml={2} onClick={() => setShowSuccessAlert(false)} />
              </Alert>
            )}
            {showErrorAlert && (
              <Alert status="error" mb={4} rounded="md">
                <AlertIcon />
                {errorMessage}
                <CloseButton ml={2} onClick={() => setShowErrorAlert(false)} />
              </Alert>
            )}
            <SupplierSelect onSupplierSelect={setSelectedSupplierId} />

            <FormControl>
              <Box>
                <FormLabel>Valoración</FormLabel>
                <Select
                  value={rating}
                  onChange={handleRatingChange}
                  placeholder="Selecciona una valoración"
                >
                  <option value="1">Malo</option>
                  <option value="2">Regular</option>
                  <option value="3">Bueno</option>
                  <option value="4">Muy bueno</option>
                  <option value="5">Excelente</option>
                </Select>
              </Box>
            </FormControl>
            <FormControl>
              <Box>
                <FormLabel>Comentario</FormLabel>
                <Textarea
                  variant="filled"
                  placeholder="Escribe tu comentario"
                  value={content}
                  onChange={handleContentChange}
                  size="lg"
                  rows={6}
                  resize="none"
                />
              </Box>
            </FormControl>
            <Button type="submit">Enviar Feedback</Button>
          </VStack>
        </Center>
      </Box>
    </Center>
  );
}

export default FeedbackForm;