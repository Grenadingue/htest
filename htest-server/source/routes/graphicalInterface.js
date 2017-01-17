const path = require('path');
const ejs = require('../libraries/ejs');

const routes = {
  dashboard: '/index',
  testTreesLibrary: '/test-trees-library',
  testProceduresLibrary: '/test-procedures-library',
  machinesTests: '/machines-tests',
};

function declarePage(app, httpPath, serverPath, title) {
  app.get(httpPath, (req, res) => {
    const parameters = {
      pageTitle: title,
      windowTitle: 'htest - ' + title ,
      pagePath: httpPath,
    };
    ejs.renderFile(path.resolve(__dirname, serverPath), parameters, (err, html) => {
      if (err) {
        res.send(err);
      } else {
        res.send(html);
      }
    });
  });
}

module.exports.initHttpRoutes = function (express, app) {
  app.use(express.static(path.resolve(__dirname, '../views/static')));
  app.get('/', (req, res) => {
    res.redirect(routes.dashboard);
  });

  declarePage(app, routes.dashboard, '../views/ejs/dashboard.ejs', 'Dashboard');
  declarePage(app, routes.testTreesLibrary, '../views/ejs/test-trees-library.ejs', 'Test trees library');
  declarePage(app, routes.testProceduresLibrary, '../views/ejs/test-procedures-library.ejs', 'Test procedures library');
  declarePage(app, routes.machinesTests, '../views/ejs/machines-tests.ejs', 'Machines tests');
};

module.exports.initSocketIoEvents = function (socket) {
  socket.on(routes.dashboard, (data) => {
    console.log(`Socket.io event received from '${routes.dashboard}' web page`);
  });

  socket.on(routes.testTreesLibrary, (data) => {
    console.log(`Socket.io event received from '${routes.testTreesLibrary}' web page`);
  });

  socket.on(routes.testProceduresLibrary, (data) => {
    console.log(`Socket.io event received from '${routes.testProceduresLibrary}' web page`);
  });

  socket.on(routes.machinesTests, (data) => {
    console.log(`Socket.io event received from '${routes.machinesTests}' web page`);
  });

  socket.on('disconnect', (data) => {
    console.log('oh a socket.io client is disconnected');
  });
};
