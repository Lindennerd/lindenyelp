var jwt = require('jsonwebtoken');

class Authentication {
  constructor(config) {
    this.logger = config.log();
    this.secret = config.secret;
  }

  async login(user, password) {
    if (!user || !password) return;
    if (user === 'luiz' && password === '123') {
      //auth ok
      const id = 1; //esse id viria do banco de dados
      var token = jwt.sign({ id }, this.secret, {
        expiresIn: 300 // expires in 5min
      });
      return { auth: true, token: token };
    }

    return { auth: false, token: null };
  }
}

module.exports = Authentication;