import { LoadingButton } from "@mui/lab";
import { Box, Card, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginUser } from "../../app/slices/userAuthSlice";

const Login = () => {
  const [username, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnLogin = async () => {
    setLoading(true);
    console.log(username);
    await dispatch(LoginUser(username))
      .unwrap()
      .then((resp) => {
        toast.success("Logged In Successfully!");
        navigate("/posts");
      })
      .catch((e) => {
        toast.error("Logged In Successfully!");
      });
    setLoading(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: "6rem" }}>
      <Card elevation={15} sx={{ padding: "2rem", borderRadius: "25px" }}>
        <Stack direction={"column"} spacing={2}>
          <TextField
            fullWidth
            variant="outlined"
            label="Username"
            placeholder="eg:vimu"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            InputLabelProps={{ sx: { fontFamily: "Poppins" } }}
            InputProps={{ sx: { fontFamily: "Poppins" } }}
            sx={{
              fontFamily: "Poppins",
            }}
          />
          <LoadingButton
            loading={loading}
            disabled={!username.length}
            variant="contained"
            sx={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: "larger",
              textTransform: "none",
            }}
            onClick={handleOnLogin}
          >
            Login
          </LoadingButton>
        </Stack>
      </Card>
    </Box>
  );
};

export default Login;
