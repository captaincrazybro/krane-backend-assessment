import { ReactNode, useState } from "react"
import { verifyLogin } from "../../components/LoginStatus";

function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean | undefined>(localStorage.getItem("sessionId") != null);
  const [user, setUser] = useState<any>();

  if (localStorage.getItem("sessionId") != null) {
    verifyLogin().then(data => {
      if (data.sessionIsValid) { 
        console.log("is null!")
        setUser(data);
      } else {
        setIsLoggedIn(false);
      }
    })
  } 

  return (
    <div>
      {isLoggedIn ? 
      user != undefined ? (
        <div className="p-5 bg-slate-100 text-left">
          <h1 className="py-3">Weclome {user.username}!</h1>
          <h1 className="py-3">About Me:</h1>
          <p>{user.aboutMe}</p>
        </div>
      ) : (
        <p>Your profile is loading...</p>
      ) : (
        <p>You are not logged in!</p>
      )}
    </div>
  )
}

function NotLoggedInText() {
  return (
    <p>You are not logged in!</p>
  )
}

const LOADING_PROFILE_TEXT = "Your profile is loading...";
const NOT_LOGGED_IN_TEXT = "You are not logged in!";

export { Profile }