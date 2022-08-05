import { useState } from "react";

const useInput = (validarValor) => {
  const [valorIngresado, setValorIngresado] = useState("");
  const [esTocado, setEsTocado] = useState(false);

  const valorEsValido = validarValor(valorIngresado);
  const tieneError = !valorEsValido && esTocado;

  const valorChangeHandler = (event) => {
    setValorIngresado(event.target.value);
  };

  const inputBlurHandler = () => {
    setEsTocado(true);
  };

  const reset = () => {
    setValorIngresado("");
    setEsTocado(false);
  };

  return {
    valor: valorIngresado,
    esValido: valorEsValido,
    tieneError,
    valorChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
