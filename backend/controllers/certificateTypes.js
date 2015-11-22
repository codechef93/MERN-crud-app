
var CertificateType = require('../models/certificateTypes');
var AnalysisType = require('../models/analysisTypes');
var Objective = require('../models/objectives');
var Material = require('../models/materials');
var Client = require('../models/clients');
var Unit = require('../models/units');

exports.getAllCertificateTypes = async function(req, res) {
  try {
    const certificateTypes = await CertificateType.find();
    const objectives = await Objective.find();
    const analysises = await AnalysisType.find();
    const materials = await Material.find();
    const clients = await Client.find().select("_id, name");
    const units = await Unit.find().select("_id, unit");

    res.send({certificateTypes, objectives, analysises, materials, clients, units});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.createCertificateType = async function(req, res) {
    if (req.body === undefined || req.body.certificateType === undefined || !req.body.certificateType) {
        res.status(400).send({ message: "CertificateType name can not be empty!" });
        return;
    }

    var certificateType = new CertificateType({
        material: req.body.material,
        client: req.body.client,
        certificateType: req.body.certificateType,
        analysises: req.body.analysises,
        remark: req.body.remark
    });

    try {
      await certificateType.save();
      const certificateTypes = await CertificateType.find();
      const objectives = await Objective.find();
      const analysises = await AnalysisType.find();
      const materials = await Material.find();
      const clients = await Client.find().select("_id, name");
      const units = await Unit.find().select("_id, unit");
  
      res.send({certificateTypes, objectives, analysises, materials, clients, units});
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
}

exports.updateCertificateType = async function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
      res.status(400).send({ message: "CertificateType id can not be empty!" });
      return;
    }

    var id = req.body.id;
    
    try {
      const data = await CertificateType.findByIdAndUpdate(id, {
        material: req.body.material,
        client: req.body.client,
        certificateType: req.body.certificateType,
        analysises: req.body.analysises,
        remark: req.body.remark},
        { useFindAndModify: false }); 
      if (!data)
        res.status(404).send({ message: `Cannot update object with id = ${id}. Maybe object was not found!` });
      else {
        const certificateTypes = await CertificateType.find();
        const objectives = await Objective.find();
        const analysises = await AnalysisType.find();
        const materials = await Material.find();
        const clients = await Client.find().select("_id, name");
        const units = await Unit.find().select("_id, unit");
    
        res.send({certificateTypes, objectives, analysises, materials, clients, units});
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
}

exports.deleteCertificateType = async function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
        res.status(400).send({ message: "CertificateType id can not be empty!" });
        return;
    }

    var id = req.body.id;

    try {
      const data = await CertificateType.findByIdAndRemove(id, { useFindAndModify: false })
      if (!data)
        res.status(404).send({ message: `Cannot update object with id = ${id}. Maybe object was not found!` });
      else {
        const certificateTypes = await CertificateType.find();
        const objectives = await Objective.find();
        const analysises = await AnalysisType.find();
        const materials = await Material.find();
        const clients = await Client.find().select("_id, name");
        const units = await Unit.find().select("_id, unit");
    
        res.send({certificateTypes, objectives, analysises, materials, clients, units});
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
}