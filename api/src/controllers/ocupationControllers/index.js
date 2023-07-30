const createOcupation = require('./03 - createOcupation');
const { getAllOcupations, getOcupationsByName,getAllOcupationApi,getAllOcupationsApi,getOcupationsBdd} = require('./01 - getOcupations');
const updateOcupation = require('./04 - putOcupation');
const getOcupationById = require('./02 - getOcupationById');
const {getAllProfesionals} = require ('./06 - getAllProfesionals')
const getMessage= require ('./07 - getMessage')
const getOcupationsByOcupation= require ('./05 - getOcupationsByOcupation')


module.exports = {
  getAllOcupations, getOcupationsByName,getAllOcupationApi,
  getOcupationById,
  createOcupation,
  updateOcupation,
  getAllProfesionals,
  getAllOcupationsApi,getOcupationsBdd,
  getMessage,
  getOcupationsByOcupation
};