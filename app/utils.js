import axios from 'axios'

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