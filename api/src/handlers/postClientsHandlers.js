//Controllers
const { getAllPostsByClients, getAllPostsByClientsApi, createPost, getPostsClient } = require("../controllers/postsClientControllers/index")

//Handlers

const getAllPostsClientsHandler = async (req, res) => {
  try {
      const posts = await getPostsClient();
      return res.status(200).json(posts)
  } catch (error) {
      return res.status(204).json({ error: error.message });
  };
};


const createPostHandler = async (req, res) => {
  const { title, image, content, clientId } = req.body
  try {
      const post = await createPost(title, image, content, clientId)
      return res.status(201).json(post)
  } catch (error) {
      return res.status(400).json({ error: error.message })
  }
}

module.exports = {
    getAllPostsClientsHandler,
    createPostHandler
}