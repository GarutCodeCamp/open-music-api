const { server } = require('@hapi/hapi');
const musics = require('./api')
const MusicService = require('./services/Postfgress/OpenMusicService')
const OpenMusicValidate = require('./validator/openmusic')
require('dotenv').config();

const init = async () => {
    const musicService = new MusicService();
    const serve = server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });
    await serve.register({
        plugin: musics,
        options: {
            service: musicService,
            validator: OpenMusicValidate
        }
    })
    await serve.start();
    console.log(`Server berjalan pada ${serve.info.uri}`,);

}

init()