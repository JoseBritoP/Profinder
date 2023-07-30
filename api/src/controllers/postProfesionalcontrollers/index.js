const createPostProfesional = require("./01 - createPostProfesional");
const {getAllPostsByProfesionals,getAllPostsByProfesionalsApi, } = require("./02 - getPostsProfesionals");
const updatePostProfesional = require('./03 - putPostsProfesionals')
const getPostProfesionalById = require('./04- getPostsProfesionalsById')
const {logicDeletePostProfesional }= require('./05 - logicDeletePostProfesional')
const { getActivePosts,getDeletedPosts,getAllPostsBySoftDelete } = require('./06 - postBaneados');

module.exports = {
     logicDeletePostProfesional,
     createPostProfesional, 
     getAllPostsByProfesionals,
     getAllPostsByProfesionalsApi,
     updatePostProfesional,
     getPostProfesionalById,
     getActivePosts,
     getDeletedPosts,
     getAllPostsBySoftDelete }