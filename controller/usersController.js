let User = require("../models/users");
let jwt = require("jsonwebtoken");
module.exports.SignUp = async (req, res) => {
  const { name, email, password, gender , Active} = req.body;


  try {
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(300).end();
    } else {
      await User.create({
        name,
        email,
        password,
        gender,
        IsActive : Active
      });
      return res.status(200).send("user created");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

module.exports.SignIN = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });

    if (user) {
      if (password == user.password) {
        let token = jwt.sign({ user }, "sanjay", { expiresIn: "1h" });
        return res.status(200).json({ token, user });
      } else {
        return res.status(401).json({ user: null, token: null });
      }
    } else {
      return res.status(501).json({ user: null, token: null });
    }
  } catch (err) {
    return res.status(500).json({ user: null, token: null });
  }
};

module.exports.AllUsers = async (req,res) => {
  try{

    let user = await User.find({});

    return res.status(200).send(user);
    
  }catch(err){
    console.log(err);
    return res.status(500).end();
  }
}

module.exports.DeleteUser = async (req,res) => {
  try{
    let id = req.params.id;
    await User.findByIdAndDelete(id);
    return res.status(200).send("User deleted");
  }catch(err){
    console.log(err);
    return res.status(500).end();
  }
}

module.exports.Edit = async (req,res) => {
   try{
 
     const {name,desc} = req.body;
     console.log(name,desc);
    let user = await User.findById(req.params.id);

    user.name = name;
    user.description = desc;


    user.save();
  
    return res.status(200).send("updated successfully");
    
   }catch(err){
       console.log(err);
       return res.status(500).end();
   }
}


module.exports.FetchUser = async (req,res) => {
  try{
  let id = req.params.id;

  let user = await User.findById(id);
  if (user){
    return res.status(200).send(user);

  }else{
    return res.status(400).end();
  }
 
  }catch(err){
     console.log(err);
     return res.status(500).end();
  }
}