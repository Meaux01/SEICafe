const User = require(`../../models/user`)
const bcrypt = require('bcrypt');
const jwt = require(`jsonwebtoken`)


  async function create(req, res) {
    console.log(req.body)
    // Baby step...
    try{
      // Add the user to the database
      const user = await User.create(req.body)
      // Create JWT token
      const token = createJWT(user)
      // send token to client
      res.json(token)
    } catch (err){
      res.status(400).json(`Bad Credentials`)
    }
  }
  async function login(req, res) {
    console.log(req.body)
    // Baby step...
    try{
      // Find the user in the database
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw new Error();
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) throw new Error();
      res.json( createJWT(user) );
      // send token to client
      // res.json(token)

    } catch (err){
      res.status(400).json(`Bad Credentials`)
    }
  }

  function checkToken(req, res) {
    // req.user will always be there for you when a token is sent
    console.log('req.user', req.user);
    res.json(req.exp);
  }

  function createJWT(user){
    return jwt.sign(
      {user},
      process.env.SECRET,
      {expiresIn: `24h`}
    )
    
  }

  module.exports = {
    create,
    createJWT,
    login,
    checkToken
  };