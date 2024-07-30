const express = require("express");

const { blogRouter } = require("./routes/blog");
const { healthRouter } = require("./routes/health");

const PORT = 8080;
const app = express();
app.use(express.json());

app.use("/health", healthRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`);
});
