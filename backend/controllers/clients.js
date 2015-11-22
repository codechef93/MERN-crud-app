
var Client = require('../models/clients');
var CSV = require('csv-string');

exports.getAllClients = function(req, res) {
    Client.find().then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.createClient = function(req, res) {
    if (req.body === undefined || req.body.clientId === undefined || !req.body.clientId) {
        res.status(400).send({ message: "Client name can not be empty!" });
        return;
    }

    var client = new Client({
        name: req.body.name,
        clientId: req.body.clientId,
        other: req.body.other,
        countryL: req.body.countryL,
        zipCodeL: req.body.zipCodeL,
        cityL: req.body.cityL,
        addressL: req.body.addressL,
        address2L: req.body.address2L,
        countryB: req.body.countryB,
        zipCodeB: req.body.zipCodeB,
        cityB: req.body.cityB,
        addressB: req.body.addressB,
        address2B: req.body.address2B,
        email: req.body.email,
        email2: req.body.email2,
        email3: req.body.email3,
        remark1: req.body.remark1,
        remark2: req.body.remark2
    });
    
    client.save().then(data => {
      Client.find().then(data => {
        res.send(data);
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.updateClient = function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
      res.status(400).send({ message: "Client id can not be empty!" });
      return;
    }

    var id = req.body.id;

    Client.findByIdAndUpdate(id, {
      name: req.body.name,
      clientId: req.body.clientId,
      other: req.body.other,
      countryL: req.body.countryL,
      zipCodeL: req.body.zipCodeL,
      cityL: req.body.cityL,
      addressL: req.body.addressL,
      address2L: req.body.address2L,
      countryB: req.body.countryB,
      zipCodeB: req.body.zipCodeB,
      cityB: req.body.cityB,
      addressB: req.body.addressB,
      address2B: req.body.address2B,
      email: req.body.email,
      email2: req.body.email2,
      email3: req.body.email3,
      remark1: req.body.remark1,
      remark2: req.body.remark2},
      { useFindAndModify: false }).then(data => {
        if (!data)
          res.status(404).send({ message: `Cannot update object with id = ${id}. Maybe object was not found!` });
        else {
          Client.find().then(data => {
            res.send(data);
          })
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Could not update object with id = " + id });
      });
}

exports.deleteClient = function(req, res) {
    if (req.body === undefined || req.body.id === undefined || !req.body.id) {
        res.status(400).send({ message: "Client id can not be empty!" });
        return;
    }

    var id = req.body.id;

    Client.findByIdAndRemove(id, { useFindAndModify: false }).then(data => {
      if (!data)
        res.status(404).send({ message: `Cannot delete object with id = ${id}. Maybe object was not found!` });
      else {
        Client.find().then(data => {
          res.send(data);
        })
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete object with id = " + id });
    });
}

exports.uploadClientCSV = async function(req, res) {
  const parsedCSV = CSV.parse(req.body.data);
  
  try {
    for (var i = 1; i < parsedCSV.length; i ++) {
      var aCSV = parsedCSV[i];
      let query = { clientId: aCSV[1] };
      let update = {
        name: aCSV[0],
        other: aCSV[2],
        countryL: aCSV[3],
        zipCodeL: aCSV[4],
        cityL: aCSV[5],
        addressL: aCSV[6],
        address2L: aCSV[7],
        countryB: aCSV[8],
        zipCodeB: aCSV[9],
        cityB: aCSV[10],
        addressB: aCSV[11],
        address2B: aCSV[12],
        email: aCSV[13],
        email2: aCSV[14],
        email3: aCSV[15],
        remark1: aCSV[16],
        remark2: aCSV[17]
      };
      let options = {upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false};

      await Client.findOneAndUpdate(query, update, options)
    }

    const clients = await Client.find();
    res.send({clients});
  }
  catch (err) {
    res.status(500).send({ message: err.message });
  }
}