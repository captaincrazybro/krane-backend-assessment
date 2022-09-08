import { API_ENDPOINT } from '../commons';
import axios from 'axios';
import { useState } from 'react';
import FunctionLink from './FunctionLink';
import { unstable_HistoryRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./styles.css";

export default function LoginStatus() {
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean | undefined>(localStorage.getItem("sessionId") != null);
    const [username, setUsername] = useState<string | undefined>("");
    const location = useLocation();

    function onLogoutClick(e: any) {
      e.preventDefault();
      localStorage.removeItem("sessionId");
      window.location.reload();
    }

    verifyLogin().then(username => {
      setUsername(username);
      setIsLoggedIn(localStorage.getItem("sessionId") != null);
    });

    useEffect(() => {
      setIsLoggedIn(localStorage.getItem("sessionId") != null);
    }, [location]) 

    return (
      <div>
        {isLoggedIn ? (
          <p className="ml-5">Welcome {username}! <FunctionLink onClick={onLogoutClick} className="Link ml-5 mr-2">Logout</FunctionLink></p>
        ) : (
          <a className="Link ml-2" href="/login">Login</a>
        )}
      </div> 
    )
}

export async function verifyLogin() {
  const sessionId = localStorage.getItem("sessionId");

  if (sessionId != null) {
    try {
      let { data } = await axios.post(API_ENDPOINT.GET_CURRENT_USER, {
        sessionId: sessionId
      })

      if (!data.sessionIsValid) {
        localStorage.removeItem("sessionId")    
        return null;
      } else {
        return data.username;
      }
    } catch (err: any) {
      console.error("ERROR:", err);
    }
  }
}
  