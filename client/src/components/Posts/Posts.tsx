import React from "react";
import { Grid, CircularProgress } from "@mui/material";

import PostItem from "./Post/PostItem";
import useStyles from "./styles";
import { useAppSelector } from "../../hooks";
import STATUS from "../../constants/status";

const Posts = (): JSX.Element => {
  const { status, posts } = useAppSelector((state) => state.posts);
  const classes = useStyles();

  return (
    <React.Fragment>
      {status === STATUS.SUCCESS ? (
        <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
          {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={6}>
              <PostItem {...post} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </React.Fragment>
  );
};

export default Posts;
