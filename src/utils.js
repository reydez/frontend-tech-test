export const validateEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  } else {
    return false;
  }
};

export const validatePassword = (password) => {
  if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
    return true;
  } else {
    return false;
  }
};

export const validarCorreo = (correo) =>
  correo.trim() !== "" && validateEmail(correo);

export const validarContra = (contra) =>
  contra.trim() !== "" && validatePassword(contra);
