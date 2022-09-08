import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../commons/";

async function Login() {
  const [username, setUsername] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [message, setMessage] = useState<string | undefined>();
  const navigate = useNavigate();

  async function onSubmitLogin(e: any) {
    e.preventDefault();

    try {
      const { data } = await axios.post(API_ENDPOINT.UPLOAD_POST, {
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

  await verifyLogin();
  const isLoggedIn = localStorage.getItem("sessionId");
  if (isLoggedIn) {
    return (
      <p className="red">You are already logged in!</p>
    )
  }

  return (
    <form onSubmit={onSubmitLogin} className=" text-black min-h-2/3 flex flex-col gap-5">
      {message ? (
        <p className="blue">{message}</p>
      ) : ""}
      <input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
        placeholder="Title..."
        className=" rounded text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 "
      />

      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="block p-2.5 w-full text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Your message..."
      ></input>
      <button
        type="submit"
        className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
      >
        Submit
      </button>
    </form>
  );
}

export async function verifyLogin() {
  const sessionId = localStorage.getItem("sessionId");

  try {
    let { data } = await axios.post(API_ENDPOINT.SESSION_POST, {
      sessionId: sessionId
    })

    if (!data.hasValidSession) {
      localStorage.removeItem("sessionId")    
    }
  } catch (err: any) {
    console.error("ERROR:", err);
  }
}

export { Login }