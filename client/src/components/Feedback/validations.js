export const validateName = (value) => {
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      return "El nombre solo debe contener letras y espacios";
    }
    return "";
  };
  
  export const validateEmail = (value) => {
    if (!/\S+@\S+\.\S+/.test(value)) {
      return "El correo electrónico es inválido";
    }
    return "";
  };
  
  export const validateMessage = (value, offensiveWords) => {
    for (let word of offensiveWords) {
      if (value.toLowerCase().includes(word)) {
        return "El mensaje contiene palabras ofensivas";
      }
    }
    return "";
  };
  