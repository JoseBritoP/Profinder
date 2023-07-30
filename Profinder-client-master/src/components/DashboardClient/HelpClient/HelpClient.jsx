
import { Box, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, useColorMode, useColorModeValue } from '@chakra-ui/react';

const HelpClient = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'gray.100', dark: 'gray.800' };
  const titleColor = { light: 'gray.100', dark: 'gray.100' };
  const descriptionColor = { light: 'blue.900', dark: 'blue.400' };


  return (
    <Box width="100%" bg={bgColor[colorMode]} >
      <Text fontSize="3xl" fontWeight="bold" textAlign="center" color={useColorModeValue('gray.900','gray.100')}>
        Ayuda y Q & A
      </Text>
      <Text fontSize="md" textAlign="center" color={descriptionColor[colorMode]} my={4}>
        Bienvenidos a la sección ayuda y Q&A, aquí podrás despejar tus dudas más frecuentes.
      </Text>
      <Accordion allowMultiple maxH={{ base: "60vh", md: "80vh", lg: "none" }}>
        {/* Pregunta 1 */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              ¿Cómo me registro en el sitio?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Para registrarte en nuestro sitio, sigue estos pasos:
            <ol>
              <li>Dirígete a la página de registro haciendo clic en el botón "Registrarse".</li>
              <li>Rellena el formulario de registro con tu información personal.</li>
              <li>Confirma tu cuenta siguiendo el enlace enviado a tu correo electrónico.</li>
            </ol>
          </AccordionPanel>
        </AccordionItem>

        {/* Pregunta 2 */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              ¿Cómo puedo buscar profesionales?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Puedes encontrar profesionales de la siguiente manera:
            <ol>
              <li>Haz clic en la sección "Profesionales" en la barra de navegación.</li>
              <li>Utiliza los filtros de categorías, ocupaciones y ubicación para ajustar tus preferencias.</li>
              <li>Examina la lista de profesionales disponibles y haz clic en el perfil para obtener más detalles.</li>
              <li>Para contactar a un profesional específico, selecciona "Contactar" en su perfil y se abrirá un chat para discutir los detalles del servicio.</li>
            </ol>
          </AccordionPanel>
        </AccordionItem>

        {/* Pregunta 3 */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              ¿Cómo puedo editar mi perfil?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Puedes modificar la información de tu perfil de la siguiente manera:
            <ol>
              <li>Haz clic en tu avatar en la esquina superior derecha de la pantalla para acceder al panel de control.</li>
              <li>Selecciona "Editar Perfil" y podrás modificar tu imagen, nombre, apellido, teléfono, ubicación y agregar una breve descripción.</li>
            </ol>
          </AccordionPanel>
        </AccordionItem>

        {/* Pregunta 4 */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              ¿Qué es la sección de recomendados?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            La sección de recomendados muestra una lista de profesionales mejor puntuados por otros usuarios, basados en sus experiencias después de concretar servicios prestados por ellos. Puedes revisar los comentarios y calificaciones para tomar decisiones informadas sobre a quién contactar.
          </AccordionPanel>
        </AccordionItem>

        {/* Pregunta 5 */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              ¿Cómo puedo dar feedback sobre mi experiencia con un profesional?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Para proporcionar tu feedback sobre un profesional, sigue estos pasos:
            <ol>
              <li>Ve a tu panel de control haciendo clic en tu avatar en la esquina superior derecha.</li>
              <li>Selecciona "Formulario de Feedback" y busca al profesional por su nombre.</li>
              <li>Asigna un puntaje y escribe un comentario sobre tu experiencia.</li>
            </ol>
          </AccordionPanel>
        </AccordionItem>

        {/* Pregunta 6 */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              ¿Dónde puedo dar feedback sobre el sitio en general?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Puedes brindar feedback sobre el sitio en la sección de "Contacto" en la barra de navegación. Cuéntanos tus sugerencias, problemas o cualquier otra cosa que quieras compartir para mejorar nuestros servicios.
          </AccordionPanel>
        </AccordionItem>

        {/* Pregunta 7 */}
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              ¿Cómo activo/desactivo el modo nocturno?
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            Puedes cambiar entre el modo claro y el modo oscuro haciendo clic en el icono del sol/moon en la barra de navegación.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default HelpClient;