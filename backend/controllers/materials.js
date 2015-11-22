
var Material = require('../models/materials');
var Objective = require('../models/objectives');
var Unit = require('../models/units');
var Client = require('../models/clients');

exports.getAllMaterials = async function(req, res) {
  try {
    const materials = await Material.find();
    const objectives = await Objective.find();
    const units = await Unit.find();
    const clients = await Client.find().select("_id, name");

    res.send({materials, objectives, units, clients});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.createMaterial = async function(req, res) {
    if (req.body === undefined || req.body.material === undefined || !req.body.material) {
        res.status(400).send({ message: "Material name can not be empty!" });
        return;
    }

    var material = new Material({
        material: req.body.material,
        objectiveValues: req.body.objectiveValues,
        clients: req.body.clients,
        remark: req.body.remark
    });

    try {
      await material.save();
      const materials = await Material.find();
      const objectives = await Objective.find();
      const units = await Unit.find();
      const clients = await Client.find().select("_id, name");
  
      res.send({materials, objectives, units, clients});
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
}

exports.updateMaterial = async function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
      res.status(400).send({ message: "Material id can not be empty!" });
      return;
    }

    var id = req.body.id;
    
    try {
      const data = await Material.findByIdAndUpdate(id, {
        material: req.body.material,
        objectiveValues: req.body.objectiveValues,
        clients: req.body.clients,
        remark: req.body.remark},
        { useFindAndModify: false }); 
      if (!data)
        res.status(404).send({ message: `Cannot update object with id = ${id}. Maybe object was not found!` });
      else {
        const materials = await Material.find();
        const objectives = await Objective.find();
        const units = await Unit.find();
        const clients = await Client.find().select("_id, name");
    
        res.send({materials, objectives, units, clients});
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
}

exports.deleteMaterial = async function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
        res.status(400).send({ message: "Material id can not be empty!" });
        return;
    }

    var id = req.body.id;

    try {
      const data = await Material.findByIdAndRemove(id, { useFindAndModify: false })
      if (!data)
        res.status(404).send({ message: `Cannot update object with id = ${id}. Maybe object was not found!` });
      else {
        const materials = await Material.find();
        const objectives = await Objective.find();
        const units = await Unit.find();
        const clients = await Client.find().select("_id, name");
    
        res.send({materials, objectives, units, clients});
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
}