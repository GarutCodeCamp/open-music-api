const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exception/InvariantError');
const NotFoundError = require('../../exception/NotFoundError');
const { mapDbtoModel } = require('../../utils');
class MusicService {
    constructor() {
        this._pool = new Pool();
    }
    async addMusics({ title, year, performer, genre, duration }) {
        const id = nanoid(16);
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;
        const query = {
            text: 'INSERT INTO openmusic VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
            values: [id, title, year, performer, genre, duration, insertedAt, updatedAt]
        }
        const result = await this._pool.query(query);
        if (!result.rows[0].id) {
            throw new InvariantError('Music Gagal di tambahkan');
        }
        return result.rows[0].id
    }
    async getAllMusic() {
        const result = await this._pool.query('SELECT * FROM openmusic');
        return result.rows.map(mapDbtoModel)
    }
    async detailMusic(id) {
        const query = {
            text: 'SELECT * FROM openmusic WHERE id = $1',
            values: [id]
        }
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('music tidak di temukan');
        }
        return result.rows.map(mapDbtoModel)[0];
    }
    async editMusic(id, { title, year, performer, genre, duration }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE openmusic SET title=$1,year=$2, performer=$3, genre=$4, duration=$5, updated_at=$6 WHERE id=$7 RETURNING id',
            values: [title, year, performer, genre, duration, updatedAt, id]
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui music, Id tidak di temukan')
        }
    }
    async deleteMusic(id) {
        const query = {
            text: 'DELETE FROM openmusic WHERE id = $1 RETURNING id',
            values: [id]
        }
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('gagal di hapus id tidak di temukan')
        }
    }
}

module.exports = MusicService