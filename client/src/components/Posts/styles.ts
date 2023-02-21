import { makeStyles, createStyles, useTheme } from "@mui/styles";
import type { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainContainer: {
      display: "flex",
      alignItems: "center",
    },
    smMargin: {
      margin: theme.spacing(1),
    },
    actionDiv: {
      textAlign: "center",
    },
  })
);

export default useStyles;
