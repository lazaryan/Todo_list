import axios from 'axios'

export const access = {
	1: 'all',
	2: 'update tasks',
	3: 'update board',
	4: 'read all',
	5: 'read tasks'
}

export class API {
	constructor() {

	}

	read(url, payload, type, dispatch) {
		return this.handleResponse(axios.get(url, payload), type, dispatch)
	}

	handleResponse(request, type, dispatch) {
		return type && dispatch ?
			request
				.then(response => dispatch({type, payload: response.data}))
				.catch(error => console.error(13, error)) :
			request
	}
}