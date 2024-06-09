import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);

  //loged in or not
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    //not login
    console.log("this is send my main ", authentication);
    console.log("this is send my redux ", authStatus);
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setloading(false);
  }, [authStatus, navigate, authentication]);

  return loading ? <h1>Loading...</h1> : <>{children} </>;
}

export default AuthLayout;
