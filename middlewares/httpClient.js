const axios = require('axios')
const AppError = require('../errors/AppError');

module.exports = class httpClient{
	constructor(){
		this.client = axios.create();
		this.client.headers = { 'Content-Type': 'application/json' };
		this.baseUrl = '';
		this.recurso = '';
		this.body = {};
		this.query = {};
	}

	validateUrl(){
		if (this.baseUrl.length <= 0) {
			throw AppError('It is necessary to enter a url for the request to be executed.')
		}
	}

	setBaseUrl(value){
		this.baseUrl = value
	}

	setRecurso(value){
		this.recurso = value
	}

	setToken(value){
		this.client.defaults.headers.common = {'Authorization': value}
	}

	setbody(value){
		this.body = value
	}

	setQuery(value){
		this.query = value
	}

	async get(){
		this.validateUrl();
		let detalhe = {};
		await this.client.get(`${ this.baseUrl }${ this.recurso }`, {
			params:this.query,
		})
		.then(resp =>  detalhe = resp.data)
		.catch(err => {throw new AppError(err.response.data.message, err.response.status)})
		return detalhe;
	}

	async post(){
		let result = {}
		this.validateUrl();
		await this.client.post(
			`${ this.baseUrl }${ this.recurso }`,
			this.body, 
			{
				params:this.query,
			}
		)
		.then(resp =>  result = resp.data)
		.catch(err => {throw new AppError(err.response.data.message, err.response.status)})
		return result;
	}

	async patch(){
		let result = {}
		this.validateUrl();
		await this.client.patch(
			`${ this.baseUrl }${ this.recurso }`,
				this.body, 
				{
					params:this.query,
				}
		)
		.then(resp =>  result = resp.data)
		.catch(err => {throw new AppError(err.response.data.message, err.response.status)})
		return result;
	}

	async put(){
		let result = {}
		this.validateUrl();
		await this.client.put(
			`${ this.baseUrl }${ this.recurso }`,
			this.body,
			{
				params:this.query,
			}
		)
		.then(resp =>  result = resp.data)
		.catch(err => {throw new AppError(err.response.data.message, err.response.status)})
		return result;
	}

	async delete(){
		let result = {}
		this.validateUrl();
		await this.client.delete(
			`${ this.baseUrl }${ this.recurso }`,
			this.body, 
			{
				params:this.query,
			}
		)
		.then(resp => result = resp.data)
		.catch(err => {throw new AppError(err.response.data.message, err.response.status)})
		return result;
	}
}