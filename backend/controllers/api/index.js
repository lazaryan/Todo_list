const login = require('./login')
const logout = require('./logout')
const register = require('./register')
const user = require('./user')
const dashboard = require('./dashboard')
const column = require('./column')

;[login, logout, register, user].forEach(fn =>
    module.exports[fn.name] = fn    
)

module.exports = [
    {
        path: '/api/user/login',
        method: 'post',
        action: login
    },
    {
        path: '/api/user/logout',
        method: 'get',
        action: logout
    },
    {
        path: '/api/user/register',
        method: 'post',
        action: register
    },
    {
        path: '/api/user',
        method: 'get',
        action: user
    },
    {
        path: '/api/dashboard',
        method: 'get',
        action: dashboard.getDashboards
    },
    {
        path: '/api/dashboard/:id',
        method: 'get',
        action: dashboard.getDashboard
    },
    {
        path: '/api/dashboard/:id',
        method: 'delete',
        action: dashboard.deleteDashboard
    },
    {
        path: '/api/dashboard',
        method: 'post',
        action: dashboard.createDashboard
    },
    {
        path: '/api/dashboard/:id/update/name',
        method: 'put',
        action: dashboard.updateDashboardName
    },
    {
        path: '/api/dashboard/:id/columns',
        method: 'get',
        action: column.getColumns
    },
]
