const { Router } = require("express");

const {
  createBlog,
  readAllBlogs,
  readBlog,
  updateBlog,
  patchBlog,
  deleteBlog,
} = require("../handlers/blog");

const blogRouter = Router();

blogRouter.post("/", createBlog);

// read all blogs
blogRouter.get("/", readAllBlogs);

// read all blogs
blogRouter.get("/:blogId", readBlog);

blogRouter.put("/:blogId", updateBlog);

blogRouter.patch("/:blogId", patchBlog);

blogRouter.delete("/:blogId", deleteBlog);

module.exports = {
  blogRouter,
};
