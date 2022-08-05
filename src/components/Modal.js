import React, { useState } from "react";
import { createPortal } from "react-dom";
import useInput from "../hooks/use-input";
import { validarContra, validarCorreo } from "../utils";
import "./Modal.css";

const Modal = ({ show, setShow, setEmail, setPassword, setPasswordRep }) => {
  const [mostrarContra, setMostrarContra] = useState(false);
  const [mostrarCreaCuenta, setMostrarCreaCuenta] = useState(false);

  const {
    valor: valorCorreo,
    esValido: correoEsValido,
    tieneError: correoTieneError,
    valorChangeHandler: correoChangeHandler,
    inputBlurHandler: correoBlurHandler,
    reset: resetCorreo,
  } = useInput(validarCorreo);

  const {
    valor: valorContrasena,
    esValido: contrasenaEsValido,
    tieneError: contrasenaTieneError,
    valorChangeHandler: contrasenaChangeHandler,
    inputBlurHandler: contrasenaBlurHandler,
    reset: resetContrasena,
  } = useInput(validarContra);

  const {
    valor: valorContrasenaRep,
    esValido: contrasenaRepEsValido,
    tieneError: contrasenaRepTieneError,
    valorChangeHandler: contrasenaRepChangeHandler,
    inputBlurHandler: contrasenaRepBlurHandler,
    reset: resetContrasenaRep,
  } = useInput(validarContra);

  if (!show) return null;

  let formEsValidoSingIn = false;
  let formEsValidoCrea = false;

  if (correoEsValido && contrasenaEsValido) {
    formEsValidoSingIn = true;
  }

  if (correoEsValido && contrasenaEsValido && contrasenaRepEsValido) {
    formEsValidoCrea = true;
  }

  const handleMostrarContra = () => {
    setMostrarContra((prevVal) => !prevVal);
  };

  const handleCreaNueva = () => {
    resetCorreo();
    resetContrasena();
    resetContrasenaRep();
    setMostrarCreaCuenta((prevVal) => !prevVal);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    return mostrarCreaCuenta ? handleCreaCuenta() : handleIniciarSesion();
  };

  const handleIniciarSesion = () => {
    if (!formEsValidoSingIn) {
      alert("Se tienen que llenar los campos correctamente");
      return;
    }
    setEmail(valorCorreo);
    setPassword(valorContrasena);
    resetCorreo();
    resetContrasena();
    setShow(false);
  };

  const handleCreaCuenta = () => {
    if (!formEsValidoCrea) {
      alert("Se tienen que llenar los campos correctamente");
      return;
    }

    if (valorContrasena !== valorContrasenaRep) {
      alert("Tienen que ser iguales las contraseñas");
      return;
    }

    setEmail(valorCorreo);
    setPassword(valorContrasena);
    setPasswordRep(valorContrasenaRep);
    resetCorreo();
    resetContrasena();
    resetContrasenaRep();
    setShow(false);
    setMostrarCreaCuenta(false);
  };

  return createPortal(
    <>
      <div className="overlay" onClick={() => setShow(false)}></div>
      <div className="modal">
        <div className="close-button" onClick={() => setShow(false)}>
          &times;
        </div>
        <h1 className="title">
          {mostrarCreaCuenta ? "Crea una cuenta" : "Iniciar sesion"}
        </h1>
        <div className="modal-content">
          <form onSubmit={handleOnSubmit}>
            <div className="input-control">
              <input
                className={correoTieneError ? "error" : ""}
                type="text"
                placeholder="Tu correo electrónico"
                value={valorCorreo}
                onChange={correoChangeHandler}
                onBlur={correoBlurHandler}
              />
            </div>
            <div className="input-control">
              <input
                className={contrasenaTieneError ? "error" : ""}
                type={mostrarContra ? "text" : "password"}
                placeholder="Tu contraseña"
                value={valorContrasena}
                onChange={contrasenaChangeHandler}
                onBlur={contrasenaBlurHandler}
              />
              <span className="btn-mostar" onClick={handleMostrarContra}>
                {mostrarContra ? "Ocultar" : "Mostrar"}
              </span>
            </div>
            {mostrarCreaCuenta && (
              <div className="input-control">
                <input
                  className={contrasenaRepTieneError ? "error" : ""}
                  type={mostrarContra ? "text" : "password"}
                  placeholder="Repite tu contraseña"
                  value={valorContrasenaRep}
                  onChange={contrasenaRepChangeHandler}
                  onBlur={contrasenaRepBlurHandler}
                />
              </div>
            )}

            <button>{mostrarCreaCuenta ? "Crea una cuenta" : "Entrar"}</button>
            <div className="olvidaste-contra">
              {mostrarCreaCuenta ? (
                <p>
                  Al crear una cuenta, estoy de acuerdo con las{" "}
                  <span style={{ color: "#18b9b4" }}>Condiciones de uso</span> y
                  la{" "}
                  <span style={{ color: "#18b9b4" }}>
                    Política de privacidad.
                  </span>
                </p>
              ) : (
                <a href="#">¿Olvidaste tu contraseña?</a>
              )}
            </div>
          </form>
        </div>
        <div className="footer">
          {mostrarCreaCuenta ? (
            <span>
              ¿Ya tienes cuenta?{" "}
              <a href="#" onClick={handleCreaNueva}>
                Inicia sesión
              </a>
            </span>
          ) : (
            <span>
              ¿No tienes cuenta?{" "}
              <a href="#" onClick={handleCreaNueva}>
                Crea una nueva
              </a>
            </span>
          )}
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
