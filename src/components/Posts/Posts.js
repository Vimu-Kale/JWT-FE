import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserPosts } from "../../app/slices/userPostsSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts } = useSelector((state) => state.userPosts);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    dispatch(getUserPosts(axiosPrivate))
      .unwrap()
      .catch((e) => {
        console.log(e?.response?.data);
        navigate("/");
      });
  }, [dispatch, axiosPrivate, navigate]);

  return (
    <div style={{ marginTop: "6rem" }}>
      {!posts && <CircularProgress />}
      {posts &&
        posts.map((post, i) => (
          <Card
            key={i}
            elevation={24}
            sx={{
              p: "1rem",
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  textTransform: "capitalize",
                }}
              >
                {post.username}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  fontStyle: "italic",
                  fontSize: "1.5rem",
                  textTransform: "capitalize",
                }}
              >
                {post.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default Posts;
