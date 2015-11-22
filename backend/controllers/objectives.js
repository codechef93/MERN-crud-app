
var Objective = require('../models/objectives');
var Unit = require('../models/units');

exports.getAllObjectives = async function(req, res) {
  try {
    const objectives = await Objective.find();
    const units = await Unit.find();

    res.send({units, objectives});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.createObjective = async function(req, res) {
    if (req.body === undefined || req.body.objective === undefined || !req.body.objective) {
        res.status(400).send({ message: "Objective name can not be empty!" });
        return;
    }

    var objective = new Objective({
      objective: req.body.objective,
      units: req.body.units,
      remark: req.body.remark
    });

    try {
      const existing = await Objective.find({objective: req.body.objective});
      if (existing.length > 0) {
        res.send({ status: 0 });
      }
      else {
        await objective.save();
        const objectives = await Objective.find();
        const units = await Unit.find();
    
        res.send({units, objectives});
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
}

exports.updateObjective = async function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
      res.status(400).send({ message: "Objective id can not be empty!" });
      return;
    }

    var id = req.body.id;
    
    try {
      const existing = await Objective.find({objective: req.body.objective});
      if (existing.length > 0 && existing[0]._id != id) {
        res.send({ status: 0 });
      }
      else {
        const data = await Objective.findByIdAndUpdate(id, {
          objective: req.body.objective,
          units: req.body.units,
          remark: req.body.remark},
          { useFindAndModify: false }); 
        if (!data)
          res.status(404).send({ message: `Cannot update object with id = ${id}. Maybe object was not found!` });
        else {
          const objectives = await Objective.find();
          const units = await Unit.find();
      
          res.send({units, objectives});
        }
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
}

exports.deleteObjective = async function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
        res.status(400).send({ message: "Objective id can not be empty!" });
        return;
    }

    var id = req.body.id;

    try {
      const data = await Objective.findByIdAndRemove(id, { useFindAndModify: false })
      if (!data)
        res.status(404).send({ message: `Cannot update object with id = ${id}. Maybe object was not found!` });
      else {
        const objectives = await Objective.find();
        const units = await Unit.find();
    
        res.send({units, objectives});
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
}