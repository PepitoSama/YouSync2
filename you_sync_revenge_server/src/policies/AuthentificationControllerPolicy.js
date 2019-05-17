const Joi = require('joi')

/*
|===============================================================================
| Policie : AuthentificationControllerPolicy
| This controller define all function used for string checking like password, email ...etc
|===============================================================================
*/

module.exports = {
  register (req, res, next) {
    const schema = Joi.object().keys({
      username: Joi.string().required().regex(
        new RegExp('^([a-zA-Z0-9-_]{2,32})$')
      ),
      // Only accept email format defined by joi
      email: Joi.string().email().required(),
      password: Joi.string().required().regex(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&]).{8,32}$')
      )
    })

    Joi.validate(req.body, schema, (error, value) => {
      if (error) {
        console.log('\n', error.details[0].context.key)
        switch (error.details[0].context.key) {
          case 'username':
            if (typeof req.body.username === 'undefined') {
              res.status(400).send({
                error: 'Enter a username'
              })
            } else if (req.body.username.length > 32) {
              res.status(400).send({
                error: 'Username must be less than 32 characters'
              })
            } else {
              res.status(400).send({
                error: 'Username must not contain special character'
              })
            }
            break
          case 'email':
            res.status(400).send({
              error: 'Provide a valid email address'
            })
            break
          case 'password':
            res.status(400).send({
              error: 'Password must contain 1 lower case, 1 Upper case, 1 number and 1 special character. 8 char min, 32 max'
            })
            break
          default:
            res.status(400).send({
              error: 'Unknown validation error'
            })
        }
      } else {
        next()
      }
    })
  }
}
