const crypto = require('crypto');
module.exports = {
  up(db) {
    let salt = crypto.randomBytes(16).toString('hex');
    let hash = crypto.pbkdf2Sync('hcs2019', salt, 10000, 512, 'sha512').toString('hex');
    return db.collection('users').insertOne({ email: 'dsudenfield@gmail.com', password: hash, salt: salt });
  },
  down(db) {

  }
};