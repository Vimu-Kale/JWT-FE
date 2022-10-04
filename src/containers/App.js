import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import Login from "../components/Login/Login";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Posts from "../components/Posts/Posts";
const App = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
        />
      </Box>
    </>
  );
};

export default App;
