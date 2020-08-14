import homeResquest from '@/utils/http';

function getChannels() {
    return homeResquest({
        url: '/app/v1_0/user/channels',
        method: 'get',
    });
}

function getArtical(params: any) {
    return homeResquest({
        url: '/app/v1_1/articles',
        method: 'get',
        params,
    });
}

function getAllChannels() {
    return homeResquest({
        url: '/app/v1_0/channels',
        method: 'get',
    });
}

function editChannels(data: any) {
    return homeResquest({
        url: '/app/v1_0/user/channels',
        method: 'put',
        data,
    });
}

function dislikeArtical(artId: number) {
    return homeResquest({
        url: '/app/v1_0/article/dislikes',
        method: 'post',
        data: {
            target: artId,
        },
    });
}

function sendReport(artId: number, type: number) {
    return homeResquest({
        url: '/app/v1_0/article/reports',
        method: 'post',
        data: {
            target: artId,
            type,
        },
    });
}

function addBlacklists(userId: number) {
    window.console.log(userId);
    return homeResquest({
        url: '/app/v1_0/user/blacklists',
        method: 'post',
        data: {
            target: userId,
        },
    });
}

export {
    getChannels,
    getArtical,
    getAllChannels,
    editChannels,
    dislikeArtical,
    sendReport,
    addBlacklists,
};
