const path = require('path');

const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session');
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandler = require('./middlewares/error-handler');
const checkAuthStatusMiddleWare = require('./middlewares/check-auth');
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleWare);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use('/admin', adminRoutes); // '/admin'으로 시작하는 경로만 사용가능

app.use(errorHandler);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  }).catch(function (error) {
    console.log('db연결에 실패');
    console.log(error);
  });
