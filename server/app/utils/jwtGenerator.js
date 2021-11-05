//jwtGenerator
require('dotenv').config();
const jwt = require('jsonwebtoken');

function jwtGenerator(userId) {
  const token = jwt.sign({ userId }, process.env.jwtSecret, { expiresIn: '1h' });
  return token;
}

/*function jwtGenerator(user_id) {
    console.log(user_id);
    const payload = {
      user: user_id
    };

    jwt.sign(payload, process.env.jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) {
          console.log(err);
          return;
      }
      //console.log(token);
      return token;
      

  });

}*/

module.exports = jwtGenerator;