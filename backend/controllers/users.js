
var User = require('../models/users');
var UserType = require('../models/userTypes');

exports.getAllUsers = async function(req, res) {
  try {
    const users = await User.find();
    const userTypes = await UserType.find();

    res.send({users, userTypes});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.createUser = async function(req, res) {
    if (req.body === undefined || req.body.userName === undefined || !req.body.userName) {
        res.status(400).send({ message: "User name can not be empty!" });
        return;
    }

    var user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType,
        remark: req.body.remark
    });

    try {
      await user.save();
      const users = await User.find();
      const userTypes = await UserType.find();
  
      res.send({users, userTypes});
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
}

exports.updateUser = async function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
      res.status(400).send({ message: "User id can not be empty!" });
      return;
    }

    var id = req.body.id;
    
    try {
      const data = await User.findByIdAndUpdate(id, {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType,
        remark: req.body.remark},
        { useFindAndModify: false }); 
      if (!data)
        res.status(404).send({ message: `Cannot update object with id = ${id}. Maybe object was not found!` });
      else {
        const users = await User.find();
        const userTypes = await UserType.find();
    
        res.send({users, userTypes});
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
}

exports.deleteUser = async function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
        res.status(400).send({ message: "User id can not be empty!" });
        return;
    }

    var id = req.body.id;

    try {
      const data = await User.findByIdAndRemove(id, { useFindAndModify: false })
      if (!data)
        res.status(404).send({ message: `Cannot update object with id = ${id}. Maybe object was not found!` });
      else {
        const users = await User.find();
        const userTypes = await UserType.find();
    
        res.send({users, userTypes});
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
}