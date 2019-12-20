const uuid = require('uuid')

module.exports = {
	get: {
		'/state': req => ({
			data: {
				access: {
					1: 'all',
					2: 'update tasks',
					3: 'update board',
					4: 'read all',
					5: 'read tasks'
				}
			},
			REST: {
				dashboard: '/dashboard',
				theme: '/theme',
				user: '/user',
				sections: '/dashboard/sections'
			},
			theme: 'main'
		}),
		'/theme': req => ({
			name: req.query.theme,
			theme: req.query.theme,
		}),
		'/user': req => ({
			name: 'User name',
			access: 'all'
		}),
		'/dashboard/:id': req => ({
			entity_id: 1,
			name: '',
			style: 'default'
		}),
		'/dashboard/sections/:id': req => ({
			sections: [
				{
					entity_id: 1,
					name: 'test board'
				}
			]
		})
	},
	post: {
		'/dashboard/sections': req => ({
			entity_id: uuid(),
			name: 'test board new'
		})
	},
	put: {
		'/dashboard/:id': req => req.body.dashboard
	}
}