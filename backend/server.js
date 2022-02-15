const express = require("express");
const cors = require("cors");

const socket = require("socket.io");
require("dotenv").config();
const app = express();

require("./database/db");

const { productRouter } = require("./routes/productRouter");
const { userRouter } = require("./routes/userRouter");
const { roleRouter } = require("./routes/roleRouter");
const { commentRouter } = require("./routes/commentRouter");
const { wishlistRouter } = require("./routes/wishlistRouter");
const { likeRouter } = require("./routes/likeRouter");
app.use(cors());

app.use(express.json());

const PORT = 5000;

//create product route with path of "/product"

app.use("/product", productRouter);

//create user route with path of "/user"

app.use("/user", userRouter);

//create comment route with path of "/comment"

app.use("/comment", commentRouter);

//create role route with path of "/role"

app.use("/role", roleRouter);

//create wishlist route with path of "/wishlist"
app.use("/wishlist", wishlistRouter);

//create like route with path of "/like"
app.use("/like", likeRouter);

const server = app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});
// create event listener on connection
io.on("connection", (socket) => {
  console.log("new user join");
  // console.log(socket.conn.id);
  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });
  socket.on("disconnect", () => {
    console.log("\nuser left ...");
  });
});
