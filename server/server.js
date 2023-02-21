import mongoose from "mongoose";

import app from "./app.js";

const PORT = process.env.PORT ?? 3000;
const DB = process.env.DB.replace("<PASSWORD>", process.env.DB_PASSWORD);

console.clear();

mongoose.set("strictQuery", true);

mongoose
  .connect(DB)
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`))
  )
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
