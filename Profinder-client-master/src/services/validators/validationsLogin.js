
// export const validateName = (name) => {
//   if (!name) throw Error("El campo nombre es obligatorio");
//   if (typeof name !== "string") throw Error("El campo nombre debe ser un texto");

//   const nameValidated = /^[a-zA-ZñÑ\s]+$/.test(name.trim());
//   const firstNameLastName = name.split(" ");

//   if (name.trim() === "") throw Error("El nombre no puede estar vacío");
//   if (/\d/.test(name)) throw Error("El nombre no puede contener números");
//   if (!nameValidated) throw Error("El nombre no puede contener caracteres especiales o símbolos");
//   if (firstNameLastName.length < 2) throw Error("El nombre debe contener nombre y apellido");
// };

export const validateEmail = (email) => {
  if (!email) throw Error("El campo email es obligatorio");
  if (typeof email !== "string") throw Error("El campo email debe ser un texto");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
  const emailRegexEnd = /^[a-zA-ZñÑ\s]+$/;
  const emailEnd = email.split(".")[1];

  if (email.trim() === "") throw Error("El email no puede estar vacío");
  if (!emailRegex.test(email)) throw Error("El formato del email es incorrecto");
  if (!emailRegexEnd.test(emailEnd)) throw Error("El email no puede contener números o símbolos después del dominio");
};

// export const validateImage = (image) => {
//   if (!image) throw Error("El campo imagen es obligatorio");
//   if (typeof image !== "string") throw Error("El campo imagen debe ser un texto");

//   const imageRegexUrl = /^(http(s?):\/\/)?[^\s/$.?#].[^\s]*\.(?:jpg|jpeg|gif|png)$/i;

//   if (image.trim() === "") throw Error("La imagen no puede estar vacía");
//   if (!imageRegexUrl.test(image)) throw Error("La imagen debe ser una URL válida y tener un formato de imagen válido");
// };

// export const validateGenre = (genre) => {
//   if (!genre) throw Error("El campo género es obligatorio");
//   if (typeof genre !== "string") throw Error("El campo género debe ser un texto");

//   const genreValidated = /^[a-zA-ZñÑ\s]+$/.test(genre.trim());

//   if (genre.trim() === "") throw Error("El género no puede estar vacío");
//   if (!genreValidated) throw Error("El género no puede contener números o símbolos");
// };

// export const validateYearsExp = (yearsExp) => {
//   if (!yearsExp) throw Error("El campo años de experiencia es obligatorio");
//   if (typeof yearsExp !== "string") throw Error("El campo años de experiencia debe ser un texto");

//   if (yearsExp > 85) throw Error("No es probable que haya trabajado más de 85 años en un trabajo");
//   if (yearsExp.length > 2) throw Error("Los años de experiencia no pueden ser centenares");
// };


// export const validateCategories = (categories) => {
//   if (!categories) throw Error("El campo categorías es obligatorio");
//   if (!Array.isArray(categories)) throw Error("El campo categorías debe ser un array");

//   if (categories.length === 0) throw Error("El profesional debe tener al menos una categoría");
//   if (categories.length > 3) throw Error("El profesional no puede tener más de 3 categorías");
// };

// export const validateOcupations = (ocupations) => {
//   if (!ocupations) throw Error("El campo ocupaciones es obligatorio");
//   if (!Array.isArray(ocupations)) throw Error("El campo ocupaciones debe ser un array");

//   if (ocupations.length === 0) throw Error("El profesional debe tener al menos una ocupación");
//   if (ocupations.length > 5) throw Error("El profesional no puede tener más de 5 ocupaciones");
// };

// export const validatePhone = (phone) => {
//   if (!phone) throw Error("El campo teléfono es obligatorio");
//   if (typeof phone !== "string") throw Error("El campo teléfono debe ser un texto");

//   if (!/^\d+$/.test(phone)) throw Error("El campo teléfono solo puede contener números");
// };

// export const validateUbication = (ubication) => {
//   if (!ubication) throw Error("El campo ubicación es obligatorio");
//   if (typeof ubication !== "string") throw Error("El campo ubicación debe ser un texto");
// };
