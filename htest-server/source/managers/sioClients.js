const clients = {};

module.exports.register = (socket) => {
  clients[socket.id] = socket;
  return socket.id;
};

module.exports.unregister = (id) => {
  clients[id] = undefined;
};

module.exports.get = (id) => clients[id];
