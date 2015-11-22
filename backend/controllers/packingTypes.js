
var PackingType = require('../models/packingTypes');

exports.getAllPackingTypes = function(req, res) {
    PackingType.find().then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.createPackingType = function(req, res) {
    if (req.body === undefined || req.body.packingType === undefined || !req.body.packingType) {
        res.status(400).send({ message: "PackingType name can not be empty!" });
        return;
    }

    var packingType = new PackingType({
        packingType: req.body.packingType,
        remark: req.body.remark
    });
    
    packingType.save().then(data => {
      PackingType.find().then(data => {
        res.send(data);
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.updatePackingType = function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
      res.status(400).send({ message: "PackingType id can not be empty!" });
      return;
    }

    var id = req.body.id;

    PackingType.findByIdAndUpdate(id, {
      packingType: req.body.packingType,
      remark: req.body.remark},
      { useFindAndModify: false }).then(data => {
        if (!data)
          res.status(404).send({ message: `Cannot update object with id = ${id}. Maybe object was not found!` });
        else {
          PackingType.find().then(data => {
            res.send(data);
          })
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Could not update object with id = " + id });
      });
}

exports.deletePackingType = function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
        res.status(400).send({ message: "PackingType id can not be empty!" });
        return;
    }

    var id = req.body.id;

    PackingType.findByIdAndRemove(id, { useFindAndModify: false }).then(data => {
      if (!data)
        res.status(404).send({ message: `Cannot delete object with id = ${id}. Maybe object was not found!` });
      else {
        PackingType.find().then(data => {
          res.send(data);
        })
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete object with id = " + id });
    });
}