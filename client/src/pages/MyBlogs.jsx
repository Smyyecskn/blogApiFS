/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { categoriesSuccess } from "../features/blogSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useDispatch, useSelector } from "react-redux";

const MyBlogs = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
    blogCategoryId: "",
  });
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.blog);
  // console.log("categories :>> ", categories);
  const URL = import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const getBlogCategories = async () => {
    try {
      const { data } = await axios.get(`${URL}/blog/categories`);
      dispatch(categoriesSuccess(data.data));
    } catch (error) {
      toastErrorNotify("Something went wrong");
    }
  };

  const createBlog = async (data) => {
    console.log("data :>> ", data);
    try {
      await axios.post(`${URL}/blog/posts`, data);
      toastSuccessNotify("Blog created successfully");
    } catch (error) {
      toastErrorNotify("Something went wrong");
    }
  };

  useEffect(() => {
    getBlogCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formValues :>> ", formValues);
    createBlog(formValues);
    setFormValues({
      title: "",
      content: "",
      blogCategoryId: "",
    });
  };
  return (
    <div className="bg-pink-100 h-screen   md:h-[calc(100vh-64px)]">
      <h1 className="font-bold text-2xl lg:text-4xl text-pink-500 animate-bounce text-center pt-3">
        My Blogs
      </h1>

      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mx-auto w-[80%] font-bold lg:w-[40%] mt-8 gap-2 p-6 bg-indigo-200 rounded-xl"
        >
          <label htmlFor="blogCategoryId">Categories</label>
          <select
            onChange={handleChange}
            name="blogCategoryId"
            id="blogCategoryId"
            className="rounded-md py-2 px-2"
            value={formValues.blogCategoryId}
          >
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={formValues.title}
            className="rounded-md py-2 px-2 "
            type="text"
            placeholder=" Enter your title..."
            onChange={handleChange}
          />
          <label htmlFor="content">Content</label>
          <textarea
            rows="5"
            id="content"
            name="content"
            value={formValues.content}
            type="content"
            className="rounded-md py-2 px-2 "
            placeholder=" Enter your content..."
            onChange={handleChange}
          />

          <button
            className="bg-fuchsia-500 py-2 rounded-md mt-2 text-white hover:bg-fuchsia-600"
            type="submit"
          >
            Add BlogPost
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyBlogs;
