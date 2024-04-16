/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { blogSuccess } from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useEffect } from "react";
import BlogCard from "../components/BlogCard";
const Home = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blog);
  // console.log("blogs :>> ", blogs);

  const URL = import.meta.env.VITE_BASE_URL;

  const getBlogs = async () => {
    try {
      const data = await axios.get(`${URL}/blog/posts`);
      dispatch(blogSuccess(data.data.data));
      toastSuccessNotify("Blogs fetched succesfully");
    } catch (error) {
      toastErrorNotify("Blogs fetched failed");
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="px-10 text-justify bg-pink-100 h-full pb-5  ">
      <h1 className="font-bold text-2xl lg:text-4xl py-3">Blogs</h1>
      <div className="flex flex-wrap gap-3 justify-center mt-3">
        {blogs?.map((blog) => {
          return <BlogCard key={blog._id} blog={blog} />;
        })}
      </div>
    </div>
  );
};

export default Home;
