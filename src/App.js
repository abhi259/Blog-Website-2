import Home from "./Pages/Home"
import Login from "./Pages/Login"
import { BrowserRouter as Router } from "react-router-dom"
import { useState, useEffect } from "react"
import { signOut } from "firebase/auth"
import { auth, provider } from "./firebase-config"

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

  useEffect(() => {
    provider.setCustomParameters({
      prompt: "select_account",
    })
  }, [])

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
    })
  }
  return (
    <div className="bg-gradient-to-b from-[#191C23] via-[#373C41] to-[#191C23]  flex flex-col min-h-screen text-white">
      <Router>
        <div>
          <nav className="flex gap-10 text-xl py-5 justify-end mr-20">
            {/* <Link to="/">Home</Link> */}

            {!isAuth ? (
              <Login setIsAuth={setIsAuth} />
            ) : (
              <button onClick={signUserOut}>Log Out</button>
            )}
          </nav>
          <div className="flex justify-center items-center font-extrabold text-2xl py-4 gap-2">
            <img src="Reactjs.svg" alt="react" className="h-12 w-12" />
            <p>+</p>
            <img src="Tailwind.svg" alt="tailwind" className="h-12 w-12" />
            <p>+</p>

            <img
              src="Firebase_Logo_Logomark.svg"
              alt="firebase"
              className="h-12 w-12"
            />
          </div>
        </div>
        <Home isAuth={isAuth} setIsAuth={setIsAuth} />
      </Router>
    </div>
  )
}

export default App
