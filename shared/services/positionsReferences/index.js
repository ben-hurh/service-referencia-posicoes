const knex = require('../../../database/knex');
const AppError = require('../../../errors/AppError');

class PositionsReferencesService {
	constructor () {
		this.TABLE_NAME = 'positions_references'
		this.return_fields = ['*']
	}

	setReturnFields(payload){
		this.return_fields = payload
	}

	async all() {
		let result = {}
		await knex.table(this.TABLE_NAME)
			.where({active: true})
			.select(this.return_fields)
			.then(resp => { result = resp })
			.catch(err => {throw new AppError(err)})
		return result;
	}

	async show(payload){
		let result = {}
		await knex.table(this.TABLE_NAME)
			.where({
					active: true,
					id: payload.id,
			})
			.first(this.return_fields)
			.then(resp => { result = resp })
			.catch(err => {throw new AppError(err)})
		return result;
	}

	async insert(payload) {
		let result = {}
		await knex.table(this.TABLE_NAME)
			.insert({
				name: payload.name,
				active: payload.active
			})
			.returning(this.return_fields)
			.then(resp => { result = resp[0] })
			.catch(err => {throw new AppError(err)})
		return result;
	}
	
	async update(payload) {
		let result = {}
		await knex.table(this.TABLE_NAME)
			.where({id: payload.id})
			.update({
				...payload,
				updated_at: new Date()
			})
			.returning(this.return_fields)
			.then(resp => { result = resp })
			.catch(err => {throw new AppError(err)})
		return result;
	}

	async delete(payload) {
		let result = {}
		await knex.table(this.TABLE_NAME)
			.where({id: payload})
			.update({active: false})
			.returning('id')
			.then(resp => { result = resp })
			.catch(err => {throw new AppError(err)})
		return result;
	}
}

module.exports = PositionsReferencesService;