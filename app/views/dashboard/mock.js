module.exports = {
	get: {
		'/state': req => ({
			data: {
				theme: 'main'
			},
			user: {
				name: 'User name',
				access: 1
			},
			REST: {
				dashboard: '/dashboard'
			}
		}),
		'/dashboard/:id': req => ({
			entity_id: req.body.id,
			name: 'test dashboard name',
		})
	}
}