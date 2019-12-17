module.exports = {
	get: {
		'/state': req => ({
			data: {
				access: {
					1: 'all'
				}
			},
			REST: {
				dashboard: '/dashboard',
				theme: '/theme'
			},
			theme: 'main'
		}),
		'/theme/:name': req => ({
			name: 'main',
			theme: 'main'
		}),
		'/user': req => ({
			name: 'User name',
			access: 1
		}),
		'/dashboard/:id': req => ({
			entity_id: req.body.id,
			name: 'test dashboard name',
		})
	}
}