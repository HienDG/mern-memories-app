import { useState, useCallback } from "react";
import moment from "moment";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";
import { Delete, MoreHoriz, ThumbUpAlt } from "@mui/icons-material";

import { TPosts, updateLikeCount, deletePost } from "../../../api";
import { save, updateLike, deletePostFromPosts } from "../../../store/postSlice";
import useStyles from "./styles";
import { useAppDispatch } from "./../../../hooks";

const placeholder = import.meta.env.VITE_IMG_PLACEHOLDER;

const PostItem: React.FC<TPosts> = ({
  _id,
  title,
  message,
  selectedFile,
  creator,
  created_at,
  tags,
  likeCount,
}) => {
  const dispatch = useAppDispatch();
  const [like, setLike] = useState<number>(likeCount);
  const classes = useStyles();

  const increment = useCallback(async () => {
    setLike((prev) => prev + 1);
    dispatch(updateLike({ id: _id, like }));

    try {
      await updateLikeCount({ id: _id, like: like });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, like]);

  const deleteP = useCallback(async () => {
    dispatch(deletePostFromPosts(_id));

    await deletePost(_id);
  }, [dispatch]);

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={selectedFile ?? placeholder} title="test" />
      <div className={classes.overlay}>
        <Typography variant="h6">{creator}</Typography>
        <Typography variant="body2">{moment(created_at).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: "white" }} size="small" onClick={() => dispatch(save(_id))}>
          <MoreHoriz fontSize="medium" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="gray" component="h2">
          {tags.map((t) => `#${t} `)}
        </Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">
        {title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="gray" component="p">
          {message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={increment}>
          <ThumbUpAlt fontSize="small" /> Like {like}
        </Button>
        <Button size="small" color="primary" onClick={deleteP}>
          <Delete fontSize="small" />
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostItem;
