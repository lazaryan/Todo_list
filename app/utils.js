import axios from 'axios'

export class API {
	constructor() {

	}

	read(url, searchCriteria, type, dispatch) {
		return this.handleResponse(axios.get(
			searchCriteria ? this.applySearchCriteria(url, searchCriteria) : url
		), type, dispatch)
	}

	update(url, payload, type, dispatch) {
		return this.handleResponse(axios.put(url, payload), type, dispatch)
	}

	create(url, payload, type, dispatch) {
		return this.handleResponse(axios.post(url, payload), type, dispatch)
	}

	handleResponse(request, type, dispatch) {
		return type && dispatch ?
			request
				.then(response => dispatch({type, payload: response.data}))
				.catch(console.error) :
			request
	}

	applySearchCriteria(url, searchCriteria) {
		return url.concat('?' +
			Object.entries(searchCriteria)
				.map(([criteria, value]) => `${criteria}=${value}&`))
	}
}