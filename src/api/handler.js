const ClientError = require('../exception/ClientError');
const NotFoundError = require('../exception/NotFoundError');
class OpenMusicHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
        this.postMusicHandler = this.postMusicHandler.bind(this);
        this.getMusicHandler = this.getMusicHandler.bind(this);
        this.getDetailMusic = this.getDetailMusic.bind(this);
        this.editMusicHandler = this.editMusicHandler.bind(this)
        this.deleteMusicHandler = this.deleteMusicHandler.bind(this)
    }
    async postMusicHandler(request, h) {
        try {
            this._validator.validateOpenMusicPayload(request.payload);
            const { title, year, performer, genre, duration } = request.payload;
            const musicId = await this._service.addMusics({ title, year, performer, genre, duration });
            const response = h.response({
                status: 'success',
                message: 'Music Berhasil di tambahkan',
                data: {
                    musicId
                }
            }).code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message
                })
                response.code(400);
                return response
            }
            const response = h.response({
                status: 'error',
                message: 'maaf terjadi kesalahan pada server kami'
            }).code(500);
            console.error(error);
            return response
        }


    }
    async getMusicHandler() {
        const music = await this._service.getAllMusic();
        return {
            status: 'success',
            data: {
                songs: music.map(result => ({
                    id: result.id,
                    title: result.title,
                    performer: result.performer
                }))
            }
        }
    }
    async getDetailMusic(request, h) {
        try {
            const { id } = request.params;
            const music = await this._service.detailMusic(id);
            const response = h.response({
                status: 'success',
                data: {
                    songs: music
                }
            }).code(200);
            return response
        } catch (err) {
            if (err instanceof NotFoundError) {
                const response = h.response({
                    status: 'fail',
                    message: err.message
                }).code(404)
                return response
            }
            const response = h.response({
                status: 'error',
                message: 'maaf terjadi keasalahan pada server kami'
            }).code(500);
            return response;
        }
    }
    async editMusicHandler(request, h) {
        try {
            const { title, year, performer, genre, duration } = request.payload;
            const { id } = request.params;
            await this._service.editMusic(id, { title, year, performer, genre, duration });
            const response = h.response({
                status: 'success',
                message: 'Music berhasil di perbarui'
            }).code(200);
            return response
        } catch (err) {
            if (err instanceof NotFoundError) {
                const response = h.response({
                    status: 'fail',
                    message: err.message
                }).code(404)
                return response
            }
            const response = h.response({
                status: 'error',
                message: 'maaf terjadi keasalahan pada server kami'
            }).code(500);
            return response;
        }
    }
    async deleteMusicHandler(request, h) {
        try {
            const { id } = request.params;
            await this._service.deleteMusic(id);
            const resposne = h.response({
                status: 'success',
                message: 'music berhasil di hapus',
            }).code(200);
            return resposne
        } catch (err) {
            if (err instanceof NotFoundError) {
                const response = h.response({
                    status: 'fail',
                    message: err.message,
                });
                response.code(404);
                return response;
            }
            const response = h.response({
                status: 'error',
                message: 'maaf terjadi keasalahan pada server kami'
            }).code(500);
            console.log(err)
            return response;
        }
    }
}


module.exports = OpenMusicHandler;