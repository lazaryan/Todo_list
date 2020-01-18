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
				sections: '/dashboard/sections',
				tasks: '/dashboard/tasks'
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
		}),
		'/dashboard/tasks/:id': req => ({
			tasks: [
				{
					entity_id: 1,
					section_id: 1,
					name: 'first task'
				},
				{
					entity_id: 2,
					section_id: 1,
					name: 'second task'
				}
			]
		})
	},
	post: {
		'/dashboard/sections': req => req.body.section,
		'/dashboard/tasks': req => ({
			entity_id: uuid(),
			...req.body.task
		})
	},
	put: {
		'/dashboard/:id': req => req.body.dashboard,
		'/dashboard/sections/:id': req => req.body.section
	},
	delete: {
		'/dashboard/sections/:id': req => ({ entity_id: req.params.id })
	}
}