import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../commons/";
import LoginForm from "../../components/LoginForm";

function Login() {
  const [username, setUsername] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [message, setMessage] = useState<string | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean | undefined>(localStorage.getItem("sessionId") != null);
  const navigate = useNavigate();

  async function onSubmitLogin(e: any) {
    e.preventDefault();

    try {
      const { data } = await axios.post(API_ENDPOINT.LOGIN_POST, {
        username: username,
        password: password,
      });

      setMessage(data.message);
      if (data.sessionId !== undefined) {
        localStorage.setItem("sessionId", data.sessionId);

        navigate("/");
        setMessage(undefined);
      }
    } catch (err: any) {
      console.error("ERROR:", err);
    }
  }

  return (
    <div>
      { isLoggedIn ? (
        <p className="red">You are already logged in!</p>
      ) : (
        <LoginForm onSubmitLogin={onSubmitLogin} message={message} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
      )}
    </div>
  );
}

export { Login }