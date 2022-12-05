const knex = require('../../../database/knex');
const AppError = require('../../../errors/AppError');
const redis = require('../../../database/redis');
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
		const { id, id_local, name, latitude, longitude, uf, id_customer, active, city } = payload
		let result = {}
		await knex.table(this.TABLE_NAME)
			.insert({ id, id_local, name, latitude, longitude, uf, id_customer, active, city })
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
		const box = 'locais:' + id_customer;
		let cache = await redis.geosearch(
			box,
			'FROMLONLAT',
			longitude,
			latitude,
			'BYRADIUS',
			30,
			'km',
			'WITHDIST',
			'ASC',
			'COUNT',
			1,
		);
		if (cache.length === 0) {
			cache = await redis.geosearch(
				'locais_0',
				'FROMLONLAT',
				longitude,
				latitude,
				'BYRADIUS',
				30,
				'km',
				'WITHDIST',
				'ASC',
				'COUNT',
				1,
			);
		}
		let result = {}
		await knex.table(this.TABLE_NAME)
			.select([
				'name',
				'uf',
				'city',
			])
			.whereIn('id_customer', [id_customer || 0, 0])
			.where('id', cache[0][0])
			.limit(1)
			.then(resp => { result = resp })
			.catch(err => { throw new AppError(err) });
		result[0].calculo = parseFloat(cache[0][1]);

		return result;
	}
}

module.exports = PositionsReferencesService;
