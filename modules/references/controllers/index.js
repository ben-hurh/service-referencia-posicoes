const ReferencesModel = require('../../../shared/models/references');
const PositionsReferencesService = require('../../../shared/services/positionsReferences');

class Controller{
    constructor(){
        this.referencesModel = new ReferencesModel();
    }

    async all(req){
        const positionsReferencesService = new PositionsReferencesService();
        return await positionsReferencesService.all();
    }

    async show(req){
        this.referencesModel.id = req.params.id;
        this.referencesModel.active = true;
        const positionsReferencesService = new PositionsReferencesService();
        return await positionsReferencesService.show(this.referencesModel);
    }

    async insert(req){
        const positionsReferencesService = new PositionsReferencesService();
        return await positionsReferencesService.insert(this.referencesModel);
    }

    async update(req){
        const positionsReferencesService = new PositionsReferencesService();
        return await positionsReferencesService.update(this.referencesModel);
    }

    async delete(req){
        const positionsReferencesService = new PositionsReferencesService();
        return await positionsReferencesService.delete(this.referencesModel);
    }
}

module.exports = Controller