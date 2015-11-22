
var SampleType = require('../models/sampleTypes');

exports.getAllSampleTypes = function(req, res) {
    SampleType.find().then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.createSampleType = function(req, res) {
    if (req.body === undefined || req.body.sampleType === undefined || !req.body.sampleType) {
        res.status(400).send({ message: "SampleType name can not be empty!" });
        return;
    }

    var sampleType = new SampleType({
        sampleType: req.body.sampleType,
        material: req.body.material,
        client: req.body.client,
        packingType: req.body.packingType,
        dueDate: req.body.dueDate,
        sampleDate: req.body.sampleDate,
        sendingDate: req.body.sendingDate,
        analysisType: req.body.analysisType,
        incomingProduct: req.body.incomingProduct,
        distributor: req.body.distributor,
        certificateType: req.body.certificateType,
        remark: req.body.remark
    });
    
    sampleType.save().then(data => {
      SampleType.find().then(data => {
        res.send(data);
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.updateSampleType = function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
      res.status(400).send({ message: "SampleType id can not be empty!" });
      return;
    }

    var id = req.body.id;

    SampleType.findByIdAndUpdate(id, {
      sampleType: req.body.sampleType,
      material: req.body.material,
      client: req.body.client,
      packingType: req.body.packingType,
      dueDate: req.body.dueDate,
      sampleDate: req.body.sampleDate,
      sendingDate: req.body.sendingDate,
      analysisType: req.body.analysisType,
      incomingProduct: req.body.incomingProduct,
      distributor: req.body.distributor,
      certificateType: req.body.certificateType,
      remark: req.body.remark},
      { useFindAndModify: false }).then(data => {
        if (!data)
          res.status(404).send({ message: `Cannot update object with id = ${id}. Maybe object was not found!` });
        else {
          SampleType.find().then(data => {
            res.send(data);
          })
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Could not update object with id = " + id });
      });
}

exports.deleteSampleType = function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
        res.status(400).send({ message: "SampleType id can not be empty!" });
        return;
    }

    var id = req.body.id;

    SampleType.findByIdAndRemove(id, { useFindAndModify: false }).then(data => {
      if (!data)
        res.status(404).send({ message: `Cannot delete object with id = ${id}. Maybe object was not found!` });
      else {
        SampleType.find().then(data => {
          res.send(data);
        })
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete object with id = " + id });
    });
}