import { createContext } from 'react'

export default createContext({
	initialised: false,
	initializedItem: undefined,
	handleSaveBoard: () => {},
	handleUpdateBoard: () => {},
	handleRemoveBoard: () => {}
})