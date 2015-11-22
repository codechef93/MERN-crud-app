
var AnalysisType = require('../models/analysisTypes');
var Objective = require('../models/objectives');
var Unit = require('../models/units');

exports.getAllAnalysisTypes = async function(req, res) {
  try {
    const analysisTypes = await AnalysisType.find();
    const objectives = await Objective.find();
    const units = await Unit.find();

    res.send({analysisTypes, objectives, units});
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

exports.createAnalysisType = async function(req, res) {
    if (req.body === undefined || req.body.analysisType === undefined || !req.body.analysisType) {
        res.status(400).send({ message: "AnalysisType name can not be empty!" });
        return;
    }

    var analysisType = new AnalysisType({
        analysisType: req.body.analysisType,
        labType: req.body.labType,
        objectives: req.body.objectives,
        remark: req.body.remark
    });

    try {
      await analysisType.save();
      const analysisTypes = await AnalysisType.find();
      const objectives = await Objective.find();
      const units = await Unit.find();
  
      res.send({analysisTypes, objectives, units});
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
}

exports.updateAnalysisType = async function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
      res.status(400).send({ message: "AnalysisType id can not be empty!" });
      return;
    }

    var id = req.body.id;
    
    try {
      const data = await AnalysisType.findByIdAndUpdate(id, {
        analysisType: req.body.analysisType,
        labType: req.body.labType,
        objectives: req.body.objectives,
        remark: req.body.remark},
        { useFindAndModify: false }); 
      if (!data)
        res.status(404).send({ message: `Cannot update object with id = ${id}. Maybe object was not found!` });
      else {
        const analysisTypes = await AnalysisType.find();
        const objectives = await Objective.find();
        const units = await Unit.find();
    
        res.send({analysisTypes, objectives, units});
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
}

exports.deleteAnalysisType = async function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
        res.status(400).send({ message: "AnalysisType id can not be empty!" });
        return;
    }

    var id = req.body.id;

    try {
      const data = await AnalysisType.findByIdAndRemove(id, { useFindAndModify: false })
      if (!data)
        res.status(404).send({ message: `Cannot update object with id = ${id}. Maybe object was not found!` });
      else {
        const analysisTypes = await AnalysisType.find();
        const objectives = await Objective.find();
        const units = await Unit.find();
    
        res.send({analysisTypes, objectives, units});
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
}