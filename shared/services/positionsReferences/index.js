const knex = require('../../../database/knex');
const AppError = require('../../../errors/AppError');

class PositionsReferencesService {
	constructor() {
		this.TABLE_NAME = 'positions_references'
		this.return_fields = ['*']
	}

	setReturnFields(payload) {
		this.return_fields = payload
	}

	async all() {
		let result = {}
		await knex.table(this.TABLE_NAME)
			.where({ active: true })
			.select(this.return_fields)
			.then(resp => { result = resp })
			.catch(err => { throw new AppError(err) })
		return result;
	}

	async show(payload) {
		const { id, active } = payload;
		let result = {}
		await knex.table(this.TABLE_NAME)
			.where({
				id,
				active,
			})
			.first(this.return_fields)
			.then(resp => { result = resp })
			.catch(err => { throw new AppError(err) })
		return result;
	}

	async insert(payload) {
		const { id, id_local, name, latitude, longitude, uf, id_customer, active } = payload
		let result = {}
		await knex.table(this.TABLE_NAME)
			.insert({ id, id_local, name, latitude, longitude, uf, id_customer, active })
			.returning(this.return_fields)
			.then(resp => { result = resp[0] })
			.catch(err => { throw new AppError(err) })
		return result;
	}

	async update(payload) {
		let result = {}
		await knex.table(this.TABLE_NAME)
			.where({ id: payload.id })
			.update({
				...payload,
				updated_at: new Date()
			})
			.returning(this.return_fields)
			.then(resp => { result = resp })
			.catch(err => { throw new AppError(err) })
		return result;
	}

	async delete(payload) {
		const { id } = payload;
		let result = {}
		await knex.table(this.TABLE_NAME)
			.where({ id })
			.update(payload)
			.returning('id')
			.then(resp => { result = resp })
			.catch(err => { throw new AppError(err) })
		return result;
	}

	async find(payload) {
		const { latitude, longitude, id_customer } = payload;
		let result = {}
		await knex.table(this.TABLE_NAME)
			.select([
				'name',
				'uf',
				knex.raw(`(SQRT(((latitude - (${latitude})) * (latitude - (${latitude}))) + ((longitude - (${longitude}))* (longitude - (${longitude}))))*111) as calculo`)
			])
			.whereIn('id_customer', [id_customer || 0, 0])
			.orderBy('calculo')
			.limit(1)
			.then(resp => { result = resp })
			.catch(err => { throw new AppError(err) })
		return result;
	}
}

module.exports = PositionsReferencesService;
