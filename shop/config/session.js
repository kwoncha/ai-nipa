const expressSession = require('express-session');
const mongoDbstore = require('connect-mongodb-session');

function createSessionStore() {
  const MongoDbStore = mongoDbstore(expressSession);

  const store = new MongoDbStore({
    uri: 'mongodb://127.0.0.1:27017',
    databaseName: 'online-shop',
    collection: 'sessions'
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: 'super-secret',
    resave: false,
    saveUninitialized: false, //세션 데이터가 실제 변경, 일부 값이 설정된 경우 저장
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000
    }
  };
}

module.exports = createSessionConfig;