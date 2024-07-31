const { MongoClient, ObjectId } = require("mongodb");
const { MONGO_URI } = require("../env");
const { BLOG_DB, BLOGS_COL } = require("../constants");

const createBlog = async (req, res) => {
  // console.log(req.body);
  const { body } = req;

  const { author, content } = body;
  if (!(author && content)) {
    return res.status(400).send();
  }

  const client = new MongoClient(MONGO_URI);

  try {
    const blogDb = client.db(BLOG_DB);
    const blogs = blogDb.collection(BLOGS_COL);

    const result = await blogs.insertOne({ author, content });
    console.log(
      `inserted ${{ author, content }} into blogs, with _id ${
        result.insertedId
      }`
    );

    res.status(201).json({ _id: result.insertedId }).send();
  } catch (err) {
    console.error(err);

    res.status(500).send();
  } finally {
    await client.close();
  }
};

const readAllBlogs = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    const blogDb = client.db(BLOG_DB);
    const blogs = blogDb.collection(BLOGS_COL);

    const cursor = blogs.find({});

    let docs = [];
    // cursor traversal

    for await (const doc of cursor) {
      docs.push(doc);
    }

    // same done manually
    while (await cursor.hasNext()) {
      docs.push(await cursor.next());
    }

    const result = await cursor.toArray();

    res.status(200).json(result).send();
  } catch (err) {
    console.error(err);

    res.status(500).send();
  } finally {
    await client.close();
  }
};

const readBlog = async (req, res) => {
  let { blogId } = req.params;
  console.log(blogId);

  const client = new MongoClient(MONGO_URI);

  try {
    blogId = new ObjectId(blogId);
    const blogDb = client.db(BLOG_DB);
    const blogs = blogDb.collection(BLOGS_COL);

    const result = await blogs.findOne({ _id: blogId });

    res.status(200).json(result).send();
  } catch (err) {
    console.error(err);

    res.status(500).send();
  } finally {
    await client.close();
  }
};

const updateBlog = async (req, res) => {
  const { author, content } = req.body;
  let { blogId } = req.params;

  if (!(author && content)) {
    return res.status(400).send();
  }

  const client = new MongoClient(MONGO_URI);

  try {
    blogId = new ObjectId(blogId);
    const blogDb = client.db(BLOG_DB);
    const blogs = blogDb.collection(BLOGS_COL);

    const result = await blogs.findOneAndUpdate(
      { _id: blogId },
      { $set: { author, content } },
      { returnDocument: "after" }
    );

    res.status(200).json(result).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  } finally {
    await client.close();
  }
};

const patchBlog = async (req, res) => {
  console.log(req.body);

  const { author, content } = req.body;
  let { blogId } = req.params;

  if (!(author || content)) {
    return res.status(400).send();
  }

  const updateDoc = {};
  if (author) updateDoc.author = author;
  if (content) updateDoc.content = content;

  const client = new MongoClient(MONGO_URI);

  try {
    blogId = new ObjectId(blogId);
    const blogDb = client.db(BLOG_DB);
    const blogs = blogDb.collection(BLOGS_COL);

    const result = await blogs.findOneAndUpdate(
      { _id: blogId },
      { $set: updateDoc },
      { returnDocument: "after" }
    );

    res.status(200).json(result).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  } finally {
    await client.close();
  }
};

const deleteBlog = async (req, res) => {
  let { blogId } = req.params;
  const client = new MongoClient(MONGO_URI);

  try {
    blogId = new ObjectId(blogId);
    const blogDb = client.db(BLOG_DB);
    const blogs = blogDb.collection(BLOGS_COL);

    const result = await blogs.findOneAndDelete({ _id: blogId });

    res.status(200).json(result).send();
  } catch (err) {
    console.error(err);

    res.status(500).send();
  } finally {
    await client.close();
  }
};

module.exports = {
  createBlog,
  readAllBlogs,
  readBlog,
  updateBlog,
  patchBlog,
  deleteBlog,
};
