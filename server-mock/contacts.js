const fs = require('fs').promises;
const path = require('path').promises;

module.exports.create = async function create(userId, recipientId, category) {
  const contact = {
    id: new Date().getTime().toString(),
    category,
    connectionDate: null,
    createdAt: new Date(),
    recipient: recipientId,
    status: 'open',
    userId
  };

  fs.writeFile(
    `./server-mock/mockData/contacts/${contact.id}`,
    JSON.stringify(contact, undefined, 2),
    'utf8'
  );

  return contact;
};

module.exports.get = async function get(id) {
  return JSON.parse(await fs.readFile(`./server-mock/mockData/contacts/${id}`, 'utf8'));
};
