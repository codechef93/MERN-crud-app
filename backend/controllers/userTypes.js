
var User = require('../models/users');
var UserType = require('../models/userTypes');

exports.getAllUserTypes = function(req, res) {
    UserType.find().then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.createUserType = function(req, res) {
    if (req.body === undefined || req.body.userType === undefined || !req.body.userType) {
        res.status(400).send({ message: "UserType name can not be empty!" });
        return;
    }

    var userType = new UserType({
        userType: req.body.userType,
        labInput: req.body.labInput,
        labAnalysis: req.body.labAnalysis,
        labAdmin: req.body.labAdmin,
        stockUser: req.body.stockUser,
        stockAdmin: req.body.stockAdmin,
        hsImport: req.body.hsImport,
        hsExport: req.body.hsExport,
        hsAdmin: req.body.hsAdmin,
        geologyImport: req.body.geologyImport,
        geologyExport: req.body.geologyExport,
        geologyAdmin: req.body.geologyAdmin,
        remark: req.body.remark
    });
    
    userType.save().then(data => {
      UserType.find().then(data => {
        res.send(data);
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.updateUserType = function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
      res.status(400).send({ message: "UserType id can not be empty!" });
      return;
    }

    var id = req.body.id;

    UserType.findByIdAndUpdate(id, {
      userType: req.body.userType,
      labInput: req.body.labInput,
      labAnalysis: req.body.labAnalysis,
      labAdmin: req.body.labAdmin,
      stockUser: req.body.stockUser,
      stockAdmin: req.body.stockAdmin,
      hsImport: req.body.hsImport,
      hsExport: req.body.hsExport,
      hsAdmin: req.body.hsAdmin,
      geologyImport: req.body.geologyImport,
      geologyExport: req.body.geologyExport,
      geologyAdmin: req.body.geologyAdmin,
      remark: req.body.remark},
      { useFindAndModify: false }).then(data => {
        if (!data)
          res.status(404).send({ message: `Cannot update object with id = ${id}. Maybe object was not found!` });
        else {
          UserType.find().then(data => {
            res.send(data);
          })
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Could not update object with id = " + id });
      });
}

exports.deleteUserType = async function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
        res.status(400).send({ message: "UserType id can not be empty!" });
        return;
    }
    var id = req.body.id;
    try {
      const data = await UserType.findByIdAndRemove(id, { useFindAndModify: false });
      if (!data)
        res.status(404).send({ message: `Cannot delete object with id = ${id}. Maybe object was not found!` });
      else {
        const users = await User.find({userType: id});
        for (var i = 0; i < users.length; i ++) {
          await User.findByIdAndRemove(users[i]._id, { useFindAndModify: false });
        }

        const data = await UserType.find();
        res.send(data);
      }
    } catch (err) {
      res.status(500).send({ message: "Could not delete object with id = " + id });
    }
}