import "./App.css";
import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/login/Login";
import Signup from "./components/auth/signup/Signup";
import Home from "./components/pages/home/Home";
import Error from "./components/Error/Error";
import { Logincontext } from "./context/Context";
import NewRecord from "./components/pages/new record/NewRecord";
import Editdata from "./components/pages/editdata/Editdata";

function App() {
  const { account, setAccount } = useContext<any>(Logincontext);

  const isAuthenticated = () => {
    const auth = localStorage.getItem("auth");

    auth ? setAccount(true) : setAccount(false);
  };

  useEffect(() => {
    isAuthenticated();
  }, [account]);

  return (
    <div className="App">
      <Routes>
        {account && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/addRecord" element={<NewRecord />} />
            <Route path="/editdata/:id" element={<Editdata />} />
            
          </>
        )}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
