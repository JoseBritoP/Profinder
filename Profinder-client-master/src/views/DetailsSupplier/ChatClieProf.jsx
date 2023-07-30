import ChatBot from "react-simple-chatbot";
import { ThemeProvider, css } from "styled-components";
import React from "react";
import styled from "styled-components";


const theme = {
  background: "#F2F2F2",
  fontFamily: "Arial, sans-serif",
  headerBgColor: "#255959",
  headerFontColor: "#ffffff",
  botBubbleColor: "#37A69B",
  botFontColor: "#000000",
  userBubbleColor: "#506266",
  userFontColor: "#000000",

  chatBotContainerStyles: `
    position: fixed;
    bottom: 20px; /* Adjust the distance from the bottom as needed */
    right: 20px; /* Adjust the distance from the right as needed */
    z-index: 9999; /* Set a high z-index to make sure it overlays other content */
  `,
};

const ChatBotContainer = styled.div`
  ${(props) => props.styles}
`;

const ClieProfChatBot = ({ profesionalId }) => {
  const steps = [
    {
      id: "1",
      message: ` ¡Hola!  ¿Cómo te llamas?`,
      trigger: "2",
    },
    {
      id: "2",
      user: true,
      trigger: "3",
    },
    {
      id: "3",
      message: "Hola {previousValue}! ¿Que horario deseas que pase?",
      trigger: "4",
    },
    {
      id: "4",
      options: [
        { value: "opcion1", label: "Por la mañana ?", trigger: "5" }, // Si el usuario elige esta opción, el siguiente paso será el paso con id "5"
        { value: "opcion2", label: "Al mediodia? ", trigger: "6" }, // Si el usuario elige esta opción, el siguiente paso será el paso con id "6"
        { value: "opcion3", label: "O a la tarde?", trigger: "7" }, // Si el usuario elige esta opción, el siguiente paso será el paso con id "7"
      ],
    },
    {
      id: "5",
      message: "Te visitare entre el horario de 9 a 12 ",
      trigger: "8",
    },
    {
      id: "6",
      message: "Te visitare entre el horario de 12 a 14 ",
      trigger: "8",
    },
    {
      id: "7",
      message: "Te visitare entre el horario de 14 a 18 ",
      trigger: "8",
    },
    {
      id: "8",
      message: "¿Necesitas cambiar el horario?",
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
      message: `Gracias`,
      trigger: "restartChatbot",
    },
    {
      id: "restartChatbot",
      message: "¿Te gustaría volver a contactarte?",
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
  const chatbotHeaderTitle = "Profinder";

  return (
    <ThemeProvider theme={theme}>
      <ChatBotContainer styles={css(theme.chatBotContainerStyles)}>
        <ChatBot steps={steps} headerTitle={chatbotHeaderTitle} />
      </ChatBotContainer>
    </ThemeProvider>
  );
};

export default ClieProfChatBot;
