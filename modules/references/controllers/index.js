const { v4: uuidv4 } = require('uuid');
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
		const { id_local, name, latitude, longitude, uf, id_customer } = req.body;
		this.referencesModel.id =	uuidv4()
		this.referencesModel.id_local = id_local;
		this.referencesModel.name = name;
		this.referencesModel.latitude = latitude;
		this.referencesModel.longitude = longitude;
		this.referencesModel.uf = uf;
		this.referencesModel.id_customer = id_customer;
		this.referencesModel.created_at = new Date();new Date();
		this.referencesModel.updated_at = new Date();
		this.referencesModel.active = true;
		const positionsReferencesService = new PositionsReferencesService();
		return await positionsReferencesService.insert(this.referencesModel);
	}

	async update(req){
		const { id, id_local, name, latitude, longitude, uf, id_customer } = req.body;
		req.params.id = id;
		const register = await this.show(req);
		this.referencesModel.id = id;
		this.referencesModel.id_local = id_local;
		this.referencesModel.name = name;
		this.referencesModel.latitude = latitude;
		this.referencesModel.longitude = longitude;
		this.referencesModel.uf = uf;
		this.referencesModel.id_customer = id_customer;
		this.referencesModel.created_at = register.created_at;
		this.referencesModel.updated_at = new Date();
		this.referencesModel.active = true;
		const positionsReferencesService = new PositionsReferencesService();
		return await positionsReferencesService.update(this.referencesModel);
	}

	async delete(req){
		const register = await this.show(req);
		const { id, id_local, name, latitude, longitude, uf, id_customer } = register;
		this.referencesModel.id = id;
		this.referencesModel.id_local = id_local;
		this.referencesModel.name = name;
		this.referencesModel.latitude = latitude;
		this.referencesModel.longitude = longitude;
		this.referencesModel.uf = uf;
		this.referencesModel.id_customer = id_customer;
		this.referencesModel.created_at = register.created_at;
		this.referencesModel.updated_at = new Date();
		this.referencesModel.active = false;
		const positionsReferencesService = new PositionsReferencesService();
		return await positionsReferencesService.delete(this.referencesModel);
	}

	async find(req){
		const { latitude, longitude, id_customer } = req.body
		this.referencesModel.latitude = latitude;
		this.referencesModel.longitude = longitude;
		this.referencesModel.id_customer = id_customer;
		const positionsReferencesService = new PositionsReferencesService();
		return await positionsReferencesService.find(this.referencesModel);
	}
}

module.exports = Controller