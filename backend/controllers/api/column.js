const Column = require('../../models/column')
const uuid = require('uuid')
const _pick = require('lodash/pick')

const returnedFields = ['entity_id', 'dashboard_id', 'name', 'show']

module.exports.getColumns = ({ req, res }) => {
    const isAuthenticated = req.isAuthenticated()

    if (!isAuthenticated) {
        res.send([])
    } else {
        Column.find({ dashboard_id: req.params.id }, (err, columns) => {
            if (err) {
                return res.send([])
            } else {
                return res.send(columns.map(item => _pick(item, returnedFields)))
            }
        })
    }
}

module.exports.createColumn = ({ req, res }) => {
    const isAuthenticated = req.isAuthenticated()

    if (!isAuthenticated) {
        res.send('')
    } else {
        const column = new Column()

        column.entity_id = uuid.v4()
        column.dashboard_id = req.params.id
        column.name = req.body && req.body.name || ''
        column.show = true

        column.save(err => {
            if (err) {
                return res.send('')
            } else {
                return res.send(_pick(column, returnedFields))
            }
        })
    }
}

module.exports.updateColumnName = async ({ req, res }) => {
    const isAuthenticated = req.isAuthenticated()

    if (!isAuthenticated) {
        res.send([])
    } else {
        await Column.updateOne({ dashboard_id: req.params.id, entity_id: req.params.column }, { name: req.body.name || '' })

        res.send('Ok')
    }
}

module.exports.updateColumnShow = async ({ req, res }) => {
    const isAuthenticated = req.isAuthenticated()

    if (!isAuthenticated) {
        res.send([])
    } else {
        await Column.updateOne({ dashboard_id: req.params.id, entity_id: req.params.column }, { name: req.body.show || true })

        res.send('Ok')
    }
}

module.exports.deleteColumn = ({ req, res }) => {
    const isAuthenticated = req.isAuthenticated()

    if (!isAuthenticated) {
        res.send('')
    } else {
        Column.deleteOne({ dashboard_id: req.params.id, entity_id: req.params.column }, (err) => {
            if (err) {
                return res.send('')
            } else {
                return res.send(req.params.column)
            }
        })
    }
}
