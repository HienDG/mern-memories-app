import { useCallback, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import clsx from "clsx";

import { TextField, Paper, Typography, Button } from "@mui/material";
import useStyles from "./styles";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { uploadNewPost, updatePost } from "../../store/postSlice";

export interface Inputs {
  [key: string]: string;
}

const nameStr: string[] = ["creator", "title", "message", "tags", "selectedFile"];

const Form = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { post } = useAppSelector((state) => state.posts);
  const { register, handleSubmit, resetField, setValue } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => changePostData(data);

  useEffect(() => {
    if (post._id) {
      nameStr.forEach((name) => {
        setValue(name, `${post[name]}`);
      });
    }
  }, [post]);

  const changePostData = useCallback(
    (data: Inputs) => {
      console.log(data.selectedFile);
      const tags = data.tags.split(",");
      const newPost = {
        title: data.title,
        message: data.message,
        tags,
        creator: data.creator,
        selectedFile: data.selectedFile,
      };

      if (!post._id) return dispatch(uploadNewPost(newPost));
      else if (post._id) return dispatch(updatePost({ id: post._id, newPost }));
    },
    [post, dispatch]
  );

  const classes = useStyles();
  const formStyles = clsx(classes.form, classes.root);

  const reset = useCallback(() => {
    nameStr.forEach((element) => {
      resetField(element);
    });
  }, []);

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={formStyles} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6">
          {post._id ? `Editing "${post.title}"` : "Creating a Memory"}
        </Typography>
        <TextField variant="outlined" placeholder="Creator" {...register("creator")} />
        <TextField variant="outlined" placeholder="Title" {...register("title")} />
        <TextField variant="outlined" placeholder="Message" {...register("message")} />
        <TextField variant="outlined" placeholder="Tag (coma separated)" {...register("tags")} />
        <TextField variant="outlined" placeholder="Image (url)" {...register("selectedFile")} />
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="small"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" fullWidth onClick={reset}>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
