const Task = require('../../models/task')
const uuid = require('uuid')
const _pick = require('lodash/pick')

const returnedFields = ['entity_id', 'dashboard_id', 'column_id', 'name', 'status']

module.exports.getTasks = ({ req, res }) => {
    const isAuthenticated = req.isAuthenticated()

    if (!isAuthenticated) {
        res.send([])
    } else {
        Task.find({ dashboard_id: req.params.id, column_id: req.params.column }, (err, tasks) => {
            if (err) {
                return res.send([])
            } else {
                return res.send(tasks.map(item => _pick(item, returnedFields)))
            }
        })
    }
}

module.exports.createTask = ({ req, res }) => {
    const isAuthenticated = req.isAuthenticated()

    if (!isAuthenticated) {
        res.send({})
    } else {
        const task = new Task()

        task.entity_id = uuid.v4()
        task.dashboard_id = req.params.id
        task.column_id = req.params.column
        task.name = req.body && req.body.name || ''
        task.status = false

        task.save(err => {
            if (err) {
                return res.send({})
            } else {
                return res.send(_pick(task, returnedFields))
            }
        })
    }
}
