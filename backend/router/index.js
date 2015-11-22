
var usersController = require('../controllers/users.js');
var objectivesController = require('../controllers/objectives.js');
var packingTypesController = require('../controllers/packingTypes.js');
var certificateTypesController = require('../controllers/certificateTypes.js');
var analysisTypesController = require('../controllers/analysisTypes.js');
var sampleTypesController = require('../controllers/sampleTypes.js');
var userTypesController = require('../controllers/userTypes.js');
var materialsController = require('../controllers/materials.js');
var unitsController = require('../controllers/units.js');
var clientsController = require('../controllers/clients.js');

exports.init = function(app) {
    app.get('/get_all_users', usersController.getAllUsers);
    app.post('/create_user', usersController.createUser);
    app.post('/delete_user', usersController.deleteUser);
    app.post('/update_user', usersController.updateUser);

    app.get('/get_all_objectives', objectivesController.getAllObjectives);
    app.post('/create_objective', objectivesController.createObjective);
    app.post('/delete_objective', objectivesController.deleteObjective);
    app.post('/update_objective', objectivesController.updateObjective);

    app.get('/get_all_packingTypes', packingTypesController.getAllPackingTypes);
    app.post('/create_packingType', packingTypesController.createPackingType);
    app.post('/delete_packingType', packingTypesController.deletePackingType);
    app.post('/update_packingType', packingTypesController.updatePackingType);

    app.get('/get_all_certificateTypes', certificateTypesController.getAllCertificateTypes);
    app.post('/create_certificateType', certificateTypesController.createCertificateType);
    app.post('/delete_certificateType', certificateTypesController.deleteCertificateType);
    app.post('/update_certificateType', certificateTypesController.updateCertificateType);

    app.get('/get_all_analysisTypes', analysisTypesController.getAllAnalysisTypes);
    app.post('/create_analysisType', analysisTypesController.createAnalysisType);
    app.post('/delete_analysisType', analysisTypesController.deleteAnalysisType);
    app.post('/update_analysisType', analysisTypesController.updateAnalysisType);

    app.get('/get_all_sampleTypes', sampleTypesController.getAllSampleTypes);
    app.post('/create_sampleType', sampleTypesController.createSampleType);
    app.post('/delete_sampleType', sampleTypesController.deleteSampleType);
    app.post('/update_sampleType', sampleTypesController.updateSampleType);

    app.get('/get_all_userTypes', userTypesController.getAllUserTypes);
    app.post('/create_userType', userTypesController.createUserType);
    app.post('/delete_userType', userTypesController.deleteUserType);
    app.post('/update_userType', userTypesController.updateUserType);

    app.get('/get_all_materials', materialsController.getAllMaterials);
    app.post('/create_material', materialsController.createMaterial);
    app.post('/delete_material', materialsController.deleteMaterial);
    app.post('/update_material', materialsController.updateMaterial);

    app.get('/get_all_units', unitsController.getAllUnits);
    app.post('/create_unit', unitsController.createUnit);
    app.post('/delete_unit', unitsController.deleteUnit);
    app.post('/update_unit', unitsController.updateUnit);

    app.get('/get_all_clients', clientsController.getAllClients);
    app.post('/create_client', clientsController.createClient);
    app.post('/delete_client', clientsController.deleteClient);
    app.post('/update_client', clientsController.updateClient);
    app.post('/upload_client_csv', clientsController.uploadClientCSV);

    app.get('*', (req, res) => {
        res.status(404).send({ message: "Invalid URL" });
    });
}