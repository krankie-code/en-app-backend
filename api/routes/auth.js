const jwt = require("jsonwebtoken")
const User = require('../../models/user')
const bycript = require('bcrypt');
const {registerValidation, loginValidation} = require('../../helpers/validation') 

    module.exports = function(router){
      router.post('/register', async (req, res, next) =>{
        //validation
        const {error} = registerValidation(req.body);
        if(error)res.status(400).send(error.details[0].message);

        //is user already in the db
        const emailExists = await User.findOne({email: req.body.email})
        if(emailExists) return res.status(400).send('email already exists')

        //hash
        const salt = await bycript.genSalt(10);
        const hashPass = await bycript.hash(req.body.password, salt)

        const user = new User({
          first: req.body.first,
          last: req.body.last,
          email: req.body.email,
          password: hashPass,
          isActive: req.body.isActive,
          createdON: req.body.createdON
        })

        try {
          const savedUser = await user.save();
          res.send(savedUser)
          
        } catch (error) {
          res.status(400).send(error)
        }
      })
      router.post('/login', async (req, res, next) =>{
        //validation
        const {error} = loginValidation(req.body);
        if(error)res.status(400).send(error.details[0].message);

        //check if email exists
        const userExists = await User.findOne({email: req.body.email})
        if(!userExists) return res.status(400).send('email is not found')

        // Password is correct
        const validPass = await bycript.compare(req.body.password, userExists.password)
        if(!validPass) return res.status(400).send('incorrect password')
        
        res.send('works')
      })
}