import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/About";
import PrivateRouter from "./routes/PrivateRouter";
import MyBlogs from "./pages/MyBlogs";
import SingleBlog from "./pages/SingleBlog";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/myblogs" element={<PrivateRouter />}>
          <Route path="" element={<MyBlogs />} />
        </Route>
        <Route path="/singleblog/:id" element={<PrivateRouter />}>
          <Route path="" element={<SingleBlog />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
