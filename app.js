const express = require("express");
const { default: mongoose } = require("mongoose");
const methodOverride = require("method-override");

const { blogRouter } = require("./routes/blog.route");
const { healthRouter } = require("./routes/health");
const { MONGO_URI } = require("./env");

const PORT = 8080;
const app = express();

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/health", healthRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`);
  mongoose.connect(MONGO_URI);
});
