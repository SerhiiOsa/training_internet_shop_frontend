import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userApi";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const data = await check();
        user.setUser(data);
        user.setIsAuth(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);
  
  if (loading) {
    return <Spinner animation="grow" />;
  }


  if(loading) {
    return <Spinner animation="grow" />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;
