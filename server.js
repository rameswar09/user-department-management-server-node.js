require("dotenv").config();
const express = require("express");
const http = require("http");
const userRouter = require("./router/user");
const departmentRouter = require("./router/department");
const fromRequestRouter = require("./router/form.request");
const commonRouters = require("./router/common");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const swagger = require('./common_services/swagger')
require("./db/mongoose");
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

var cors = require("cors");
const app = express();
const port = process.env.PORT;
swagger(app)

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const server = http.createServer(app);
const io = socketio(server);

// let count =0
// io.on('connect', (socket) => {
//   socket.emit("firstTime",count)
//   console.log("heloo ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
//   socket.on('homePageRender',()=>{
//     console.log("heloo =========================================================")
//     count++
//     io.emit('firstTime',count)
//   })
//   socket.on('makeItZero',()=>{
//     count=0
//     io.emit('firstTime',count)
//   })
// });


app.get("/books", (req, res) => {
  res.send("This application is hosted on AWS !!")
});

app.use("/user", userRouter);
app.use("/dept", departmentRouter);
app.use("/form_req", fromRequestRouter);
app.use("/api", commonRouters);
server.listen(port, () => {
  console.log(`port started on ${port}!!`);
});
