function getSongList() {
    return [
        {
            id: 1,
            name: 'marcelinho',
            youtubeLink: 'https://www.youtube.com/watch?v=0e3GPea1Tyg&t=79&ab_channel=MrBeast',
            score: 1,
        },

        {
            id: 2,
            name: 'video super clickbait',
            youtubeLink: 'https://www.youtube.com/watch?v=KPSUKdDUDRA&ab_channel=DashCamOwnersAustralia',
            score: 5,
        },
    ];
}

function getSong(score) {
    if (score === 'highscore') {
        return {
            id: 1,
            name: 'marcelinho',
            youtubeLink: 'https://www.youtube.com/watch?v=0e3GPea1Tyg&t=79&ab_channel=MrBeast',
            score: 18,
        };
    }

    if (score === 'lowscore') {
        return {
            id: 1,
            name: 'marcelinho',
            youtubeLink: 'https://www.youtube.com/watch?v=0e3GPea1Tyg&t=79&ab_channel=MrBeast',
            score: 2,
        };
    }

    return null;
}

export {
    getSongList,
    getSong,
};
