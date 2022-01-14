const path = require('path')
const isLoggedIn = require('./middlewares/isLoggedIn')

const handleReact = ({ res }) => {
    res.sendFile(path.resolve(`../build/main/index.html`))
}

module.exports.handleReact = handleReact

module.exports = [
    {
        path: '/',
        method: 'get',
        middleware: isLoggedIn,
        action: handleReact
    },
    {
        path: '/dashboard/:id',
        method: 'get',
        middleware: isLoggedIn,
        action: handleReact
    }
]