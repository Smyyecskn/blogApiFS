import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../features/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const URL = import.meta.env.VITE_BASE_URL;

  const handleLogout = async () => {
    try {
      await axios.get(`${URL}/user/logout`);
      dispatch(logoutSuccess());

      navigate("/login");
      toastSuccessNotify("Logout Successfully");
    } catch (error) {
      toastErrorNotify("Something went wrong");
    }
  };

  return (
    <div className="bg-pink-400 p-3  md:py-5 md:px-10 flex justify-between font-bold ">
      <p
        className="cursor-pointer text-[#7fff00] animate-pulse"
        onClick={() => navigate("/")}
      >
        Blog Site
      </p>

      <div className="flex gap-5">
        <NavLink
          to="/myblogs"
          style={({ isActive }) => {
            return {
              color: isActive ? "chartreuse" : "black",
            };
          }}
        >
          MyBlogs
        </NavLink>
        <NavLink
          to="/about"
          style={({ isActive }) => {
            return {
              color: isActive ? "chartreuse" : "black",
            };
          }}
        >
          About
        </NavLink>
        {!user?.email && (
          <>
            <NavLink
              to="/login"
              style={({ isActive }) => {
                return {
                  color: isActive ? "chartreuse" : "black",
                };
              }}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              style={({ isActive }) => {
                return {
                  color: isActive ? "chartreuse" : "black",
                };
              }}
            >
              Register
            </NavLink>{" "}
          </>
        )}
        {user?.email && (
          <span onClick={handleLogout} className="cursor-pointer">
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
