import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const BlogCard = ({ blog }) => {
  //   console.log("blog :>> ", blog);

  const navigate = useNavigate();
  return (
    <div className="bg-blue-200 p-5 w-[90%] md:w-[30%] rounded-xl">
      <div className="flex justify-between font-bold">
        <span>{blog?.title}</span>
        <span>{blog?.blogCategoryId.name}</span>
      </div>
      <img
        className="rounded-xl h-40 w-full object-cover"
        src="https://source.unsplash.com/random"
        alt=""
      />
      <p className="line-clamp-5">{blog?.content}</p>
      <button
        // onClick={() => navigate(`/singleblog/${blog?._id}`, { state: blog })}
        onClick={() => navigate(`/singleblog/${blog?._id}`)}
        className="bg-green-500 text-white p-2 mt-3 hover:bg-green-600 rounded-lg"
      >
        Read More
      </button>
    </div>
  );
};

export default BlogCard;
