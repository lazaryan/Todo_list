const Column = require('../../models/column')
const Task = require('../../models/task')
const uuid = require('uuid')

module.exports.getColumns = ({ req, res }) => {
    const isAuthenticated = req.isAuthenticated()

    if (!isAuthenticated) {
        res.send([])
    } else {
        console.log(req.params)
        return res.send([])
        /*Dashboard.find({ user_id: req.user.entity_id }, (err, dashboards) => {
            if (err) {
                return res.send([])
            } else {
                return res.send(dashboards.map(item => {
                    name: item.name || 'без названия'
                }))
            }
        })*/
    }
}
