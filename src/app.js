import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../.env") });

import userRoutes from "./routes/user.routes.js";
import recordRoutes from "./routes/record.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

import { mockAuth } from "./middleware/auth.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(mockAuth);



app.use("/users", userRoutes);
app.use("/records", recordRoutes);
app.use("/dashboard", dashboardRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running ");
});