import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//login logout service
import authService from "../../appwrite/auth";

//reducer function
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHanndeler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };
  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHanndeler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
