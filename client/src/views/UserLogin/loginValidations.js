export const emailRules = {
  required: 'El correo es requerido',
  pattern: {
    value: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
    message: 'Ingresa un correo valido'
  }
}

export const passwordRules = {
  required: 'La contraseña es requerida',
  minLength: {
    value: 8,
    message: 'La contrseña debe tener minimo 8 caracteres'
  }
}

export const passwordBackRules = {
  required: 'El campo contraseña es requerido',
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    message: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número'
  }
}
