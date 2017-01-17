const socketIo = require('socket.io');

module.exports = function initSocketIo(server) {
  const io = socketIo(server);
  return io;
};
