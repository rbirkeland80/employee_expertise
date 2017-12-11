const routes = require('express').Router();
const Employee = require('./model.js');
const BaseCrud = require(__dirname + '/../common/index.js');

const EmployeeCrud = new BaseCrud(Employee);

function getEntryByIdWithReferences (req, res) {
    return Employee.findOne().where('_id').equals(req.params.id)
        .populate('carrierAdviser', 'userName name location phone')
        .populate('competenceManager', 'userName name location phone')
        .populate('profile', 'name employeePositionName')
        .select('-password -__v')
        .then(data => {
            if (!data || data.length === 0) {
                return res.status(204).send(data);
            }

            res.json(data);
        })
        .catch(error => {
            handleErrorResponse(error, res);
        });
};

routes.route('/')
    .get((req, res) => EmployeeCrud.getAllEntries(req, res))
    .post((req, res) => EmployeeCrud.saveNewEntry(req, res));

routes.param('id', (req, res, next, id) => EmployeeCrud.checkIdParam(req, res, next, id));

routes.route('/:id')
    .get((req, res) => getEntryByIdWithReferences(req, res))
    .put((req, res) => EmployeeCrud.updateEntryById(req, res))
    .delete((req, res) => EmployeeCrud.deleteEntryById(req, res));

module.exports = routes;