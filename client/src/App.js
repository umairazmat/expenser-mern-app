import AppBar from './components/AppBar';
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/auth.js";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";


function App() {

  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true);

  async function fetchUser() {
    setIsLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const user = await res.json();
      console.log(user);
      dispatch(getUser(user));
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  // console.log(auth);
  if(!isLoading) {
    <p>Loading ....</p>
  }

  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default App;
