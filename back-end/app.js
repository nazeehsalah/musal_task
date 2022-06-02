/* import Area */
const express = require("express");
const cors = require("cors");
const GatewayRoutes = require("./routes/gateways.routes")
const DevicesRoutes = require("./routes/devices.routes")
const db = require("./models/index")
const dotenv = require('dotenv')
const httpError = require("http-errors")

/* setup app  */
var app = express();
app.use(express.json())
app.use(cors());
dotenv.config();

/* routing area */
app.get("/", (req, res) => {
  res.status(200).send("server running")
})
app.use("/api/gateways", GatewayRoutes)
app.use("/api/devices", DevicesRoutes);
app.use((req, res, next) => {
  next(httpError(404));
});
/* database connection */
db.dbHelper.connectToDb(process.env.MONGO_URL)
  .then(res => {
    console.log("connected")
  })

/* server listener */
app.listen(process.env.PORT || 4000, () => {
  console.log("Server running on port " + process.env.PORT || 4000);
});
