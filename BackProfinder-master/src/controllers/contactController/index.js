const createContact = require('./01 - createContact');
const getAllContacts = require('./02 - getAllContacts');
const getContactById = require('./03 - getContactById');
const updateContact = require('./04 - updateContact');

module.exports = {
  createContact, updateContact, getContactById, getAllContacts,
}