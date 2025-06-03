const express = require("express");
const cors = require("cors");
const { LoginRoute } = require("./routes/login.route");
const { SignupRoute } = require("./routes/singup.route");
const { ProductRoute } = require("./routes/product.route");
const { dbconnection } = require("./config/db");
const { GridDataRoute } = require("./routes/gridData");

const app = express();
const port = process.env.PORT || 8080; // ✅ Fix for Render

app.use(
  cors({
    origin: ["https://medicurefrontend.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());
app.use(express.json());

app.use("/login", LoginRoute);
app.use("/signup", SignupRoute);
app.use("/products", ProductRoute);
app.use("/crypto", GridDataRoute);

app.get("/", (req, res) => res.send("Home Route"));

app.listen(port, async () => {
  try {
    await dbconnection;
    console.log({ msg: "connected to database" });
  } catch (err) {
    console.log(err);
  }
  console.log(`app listening on port ${port}`);
});
