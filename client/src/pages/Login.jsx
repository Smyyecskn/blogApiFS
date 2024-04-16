import { useState } from "react";
import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../features/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const URL = import.meta.env.VITE_BASE_URL;

  const loginPost = async (formValues) => {
    try {
      const data = await axios.post(`${URL}/user/login`, formValues);
      toastSuccessNotify("User loginned Successfully");
      dispatch(loginSuccess(data.data.user));
      navigate(-1);
    } catch (error) {
      toastErrorNotify("Something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginPost(formValues);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mx-auto w-[60%] font-bold lg:w-[40%] mt-12 gap-2 p-6 bg-indigo-200 rounded-xl"
      >
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          value={formValues.email}
          className="rounded-md py-2 "
          type="text"
          placeholder=" Enter your email..."
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          value={formValues.password}
          type="password"
          className="rounded-md py-2 "
          placeholder=" Enter your password..."
          onChange={handleChange}
        />
        <button
          className="bg-fuchsia-500 py-2 rounded-md mt-2 text-white hover:bg-fuchsia-600"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
