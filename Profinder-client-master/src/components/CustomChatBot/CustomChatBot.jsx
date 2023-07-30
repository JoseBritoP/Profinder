import ChatBot from "react-simple-chatbot";
import  { ThemeProvider } from "styled-components";

const theme = {
  background: "#CFDDFF", // este es el fondo del chat
  fontFamily: "Arial, sans-serif", // Fuente de los textos
  headerBgColor: "#34B7F1", //este es el bg del encabezado
  headerFontColor: "#ffffff", // este es el color del texto del encabezado
  botBubbleColor: "#9bd8ff", // Color de fondo de los mensajes del bot
  botFontColor: "#000000", // Color del texto de los mensajes del bot
  userBubbleColor: "#075E54", // Color de fondo de los mensajes del usuario
  userFontColor: "#b3ffb3", // Color del texto de los mensajes del usuario
};

const CustomChatBot = () => {
  // Definimos los pasos del chatbot
  const steps = [
    {
      id: "1",
      message: "¡Hola! ¿Cómo te llamas?",
      trigger: "2",
    },
    {
      id: "2",
      user: true,
      trigger: "3",
    },
    {
      id: "3",
      message: "Hola {previousValue}! ¿En qué puedo ayudarte?",
      trigger: "4",
    },
    {
      id: "4",
      options: [
        { value: "opcion1", label: "Eres Profesional ?", trigger: "5" },
        { value: "opcion2", label: "Buscas un Profesional ? ", trigger: "6" },
        { value: "opcion3", label: "Plan Premiun", trigger: "7" },
        // {
        //   value: "opcion4",
        //   label: "Ver Profesionales",
        //   trigger: () => (
        //     <Link to="/aboutus">Ver Profesionales</Link>
        //   ),
        // },
      ],
    },
    {
      id: "5",
      message:
        "En PROFINDER relacionamos a profesionales capacitados con clientes que necesitan un servicio, ",
      trigger: "8",
    },
    {
      id: "6",
      message:
        "En PROFINDER  encontraras miles de profesionales dispuestos a brindarte el mejor servicio, solo necesitas registrarte y buscar el profesional que deseas, filtra por profesion, genero, ubicacion...etc",
      trigger: "8",
    },
    {
      id: "7",
      message:
        "Si eres un profesional en PROFINDER podrás adquirir un plan premiun, el cual te dará mejor exposición y diferentes beneficios, te invitamos a obtener tu plan premiun",
      trigger: "8",
    },
    {
      id: "8",
      message: "¿Necesitas algo más?",
      trigger: "moreOptions",
    },
    {
      id: "moreOptions",
      options: [
        { value: "opcion1", label: "Sí", trigger: "4" },
        { value: "opcion2", label: "No", trigger: "byee" },
      ],
    },
    {
      id: "byee",
      message: "Adios!",
      trigger: "restartChatbot",
    },
    {
      id: "restartChatbot",
      message: "¿Te gustaría reiniciar la conversación?",
      trigger: "restartOptions",
    },
    {
      id: "restartOptions",
      options: [
        { value: "yes", label: "Sí", trigger: "1" },
        { value: "no", label: "No", end: true },
      ],
    },
  ];
  const chatbotHeaderTitle = "Asistente de PROFINDER";

  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} headerTitle={chatbotHeaderTitle} />
    </ThemeProvider>
  );
};

export default CustomChatBot;
