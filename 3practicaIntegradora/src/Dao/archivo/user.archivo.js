const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '../../data', 'users.json');

function getAll() {
  try {
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${FILE_PATH}: `, error);
    return [];
  }
}

function getById(id) {
  const users = getAll();
  return users.find((user) => user.id === id);
}

function save(user) {
  const users = getAll();
  const newUser = { ...user, id: Date.now().toString() };
  users.push(newUser);
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2), 'utf-8');
    return newUser;
  } catch (error) {
    console.error(`Error writing file ${FILE_PATH}: `, error);
    return null;
  }
}

function update(id, user) {
  const users = getAll();
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex < 0) {
    return null;
  }
  const updatedUser = { ...users[userIndex], ...user, id };
  users[userIndex] = updatedUser;
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2), 'utf-8');
    return updatedUser;
  } catch (error) {
    console.error(`Error writing file ${FILE_PATH}: `, error);
    return null;
  }
}

function remove(id) {
  const users = getAll();
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex < 0) {
    return false;
  }
  users.splice(userIndex, 1);
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing file ${FILE_PATH}: `, error);
    return false;
  }
}

module.exports = {
  getAll,
  getById,
  save,
  update,
  remove,
};
