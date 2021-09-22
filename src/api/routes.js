const routes = (handler) => [
    {
        method: 'POST',
        path: '/songs',
        handler: handler.postMusicHandler
    },
    {
        method: 'GET',
        path: '/songs',
        handler: handler.getMusicHandler
    },
    {
        method: 'GET',
        path: '/songs/{id}',
        handler: handler.getDetailMusic
    },
    {
        method: 'PUT',
        path: '/songs/{id}',
        handler: handler.editMusicHandler
    },
    {
        method: 'DELETE',
        path: '/songs/{id}',
        handler: handler.deleteMusicHandler
    }
]
module.exports = routes