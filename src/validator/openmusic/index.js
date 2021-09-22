const { OpenMusicSchema } = require('./schema');
const InvariantError = require('../../exception/InvariantError');

const OpenMusicValidate = {
    validateOpenMusicPayload: (payload) => {
        const validationResult = OpenMusicSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message)
        }
    }
}

module.exports = OpenMusicValidate