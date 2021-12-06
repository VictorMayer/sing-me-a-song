import joi from 'joi';

function specifyError(error) {
    switch (error) {
    case 'name':
        return 'Nome deve ser preenchido corretamente';
    case 'youtubeLink':
        return 'O link inserido deve ser um video do Youtube';
    default:
        return null;
    }
}

function validateSong(song) {
    const songSchema = joi.object({
        name: joi.string().required(),
        youtubeLink: joi.string().pattern(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/),
    });

    if (songSchema.validate(song).error) {
        return specifyError(songSchema.validate(song).error.details[0].context.key);
    }

    return false;
}

export default validateSong;
