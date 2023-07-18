import AppBar from './components/AppBar';
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/auth.js";

function App() {
  
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  console.log(auth);
  
  return (
    <>
     <AppBar/>
     <Outlet />
    </>
  );
}

export default App;
