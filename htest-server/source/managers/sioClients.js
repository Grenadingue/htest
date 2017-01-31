const clients = {};
let clientId = 0;

module.exports.register = (socket) => {
  const id = clientId;

  clientId += 1;
  clients[id] = socket;
  return id;
};

module.exports.unregister = (id) => {
  clients[id] = undefined;
};

module.exports.get = (id) => clients[id];
