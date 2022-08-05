import { useState } from "react";
import Modal from "./components/Modal";
import "./index.css";

function App() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRep, setPasswordRep] = useState("");

  const showModal = () => {
    setEmail("");
    setPassword("");
    setPasswordRep("");
    setShow(true);
  };

  return (
    <div className="App">
      <div className="info">
        <h1>Datos</h1>
        {email && <span>correo: {email}</span>}
        {password && <span>contraseña: {password}</span>}
        {passwordRep && <span>contraseña a repetir: {passwordRep}</span>}
        <button onClick={showModal}>ingresar</button>
      </div>
      <Modal
        show={show}
        setShow={setShow}
        setEmail={setEmail}
        setPassword={setPassword}
        setPasswordRep={setPasswordRep}
      />
    </div>
  );
}

export default App;
