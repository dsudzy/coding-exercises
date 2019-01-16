const crypto = require('crypto');
module.exports = {
  up(db) {
    let salt = crypto.randomBytes(16).toString('hex');
    let hash = crypto.pbkdf2Sync('hcs2019', salt, 10000, 512, 'sha512').toString('hex');
    return db.collection('users').insertOne(
        {
            username: 'humancare', 
            password: hash, 
            salt: salt,
            companyName: 'Human Care Systems',
            address: '84 State Street',
            suite: '720',
            city: 'Boston',
            state: 'MA',
            zip: '02109'
        }
    );
  },
  down(db) {
  }
};
