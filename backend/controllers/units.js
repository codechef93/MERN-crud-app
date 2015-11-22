
var Unit = require('../models/units');

exports.getAllUnits = function(req, res) {
    Unit.find().then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.createUnit = function(req, res) {
    if (req.body === undefined || req.body.unit === undefined || !req.body.unit) {
        res.status(400).send({ message: "Unit name can not be empty!" });
        return;
    }

    var unit = new Unit({
        unit: req.body.unit,
        remark: req.body.remark
    });
    
    unit.save().then(data => {
      Unit.find().then(data => {
        res.send(data);
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.updateUnit = function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
      res.status(400).send({ message: "Unit id can not be empty!" });
      return;
    }

    var id = req.body.id;

    Unit.findByIdAndUpdate(id, {
      unit: req.body.unit,
      remark: req.body.remark},
      { useFindAndModify: false }).then(data => {
        if (!data)
          res.status(404).send({ message: `Cannot update object with id = ${id}. Maybe object was not found!` });
        else {
          Unit.find().then(data => {
            res.send(data);
          })
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Could not update object with id = " + id });
      });
}

exports.deleteUnit = function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
        res.status(400).send({ message: "Unit id can not be empty!" });
        return;
    }

    var id = req.body.id;

    Unit.findByIdAndRemove(id, { useFindAndModify: false }).then(data => {
      if (!data)
        res.status(404).send({ message: `Cannot delete object with id = ${id}. Maybe object was not found!` });
      else {
        Unit.find().then(data => {
          res.send(data);
        })
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete object with id = " + id });
    });
}