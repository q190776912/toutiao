import loginResquest from '@/utils/http';

export function login(data: any) {
    return loginResquest({
        url: '/app/v1_0/authorizations',
        method: 'post',
        data,
    });
}
