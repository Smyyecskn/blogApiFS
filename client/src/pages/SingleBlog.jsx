/* eslint-disable react-hooks/exhaustive-deps */
// import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useDispatch, useSelector } from "react-redux";
import { blogOneSuccess } from "../features/blogSlice";
import { useEffect } from "react";

const SingleBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog } = useSelector((state) => state.blog);
  // console.log("blog :>> ", blog);
  // console.log("id :>> ", id);
  // const { state: blog } = useLocation();
  // console.log("blog :>> ", blog);
  const URL = import.meta.env.VITE_BASE_URL;

  const getBlog = async (id) => {
    try {
      const data = await axios.get(`${URL}/blog/posts/${id}`);
      // console.log("data :>> ", data);
      dispatch(blogOneSuccess(data.data.data));
      toastSuccessNotify("Blog fetched successfully");
    } catch (error) {
      toastErrorNotify("Blog fetched failed");
    }
  };

  useEffect(() => {
    getBlog(id);
  }, []);

  return (
    <div className="bg-blue-200 p-5 w-[90%] mx-auto mt-5  rounded-xl">
      <div className="flex justify-between font-bold">
        <span>{blog?.title}</span>
        <span>{blog?.blogCategoryId?.name}</span>
      </div>
      <img
        className="rounded-xl block h-[20rem] mx-auto w-full  object-cover  "
        src="https://source.unsplash.com/random"
        alt=""
      />
      <p className="pt-5 text-justify indent-10">{blog?.content}</p>
      <button
        onClick={() => navigate(-1)}
        className="bg-red-500 text-white p-2 mt-3 hover:bg-red-600 rounded-lg"
      >
        Go Back
      </button>
    </div>
  );
};

export default SingleBlog;
