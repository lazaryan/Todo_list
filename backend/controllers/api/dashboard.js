const Dashboard = require('../../models/dashboard')
const uuid = require('uuid')

module.exports.getDashboards = ({ req, res }) => {
    const isAuthenticated = req.isAuthenticated()

    if (!isAuthenticated) {
        res.send([])
    } else {
        Dashboard.find({ user_id: req.user.entity_id }, (err, dashboards) => {
            if (err) {
                return res.send([])
            } else {
                return res.send(dashboards.map(item => ({
                    name: item.name || '',
                    dashboard_id: item.entity_id
                })))
            }
        })
    }
}

module.exports.getDashboard = ({ req, res }) => {
    const isAuthenticated = req.isAuthenticated()

    if (!isAuthenticated) {
        res.send(undefined)
    } else {

        Dashboard.findOne({ user_id: req.user.entity_id, entity_id: req.params.id }, (err, dashboard) => {
            if (err) {
                return res.send(undefined)
            } else {
                return res.send({
                    dashboard_id: dashboard.entity_id,
                    name: dashboard.name
                })
            }
        })
    }
}

module.exports.createDashboard = ({ req, res }) => {
    const isAuthenticated = req.isAuthenticated()

    if (!isAuthenticated) {
        res.send('')
    } else {
        const dashboard = new Dashboard()
        dashboard.entity_id = uuid.v4()
        dashboard.user_id = req.user.entity_id
        dashboard.name = ''

        dashboard.save(err => {
            if (err) {
                return res.send('')
            } else {
                return res.send(dashboard.entity_id)
            }
        })
    }
}