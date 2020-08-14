import axios from 'axios';
import store from '@/store';
import JSONbig from 'json-bigint';

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn',
    transformResponse: [(data) => {
        try {
            return JSONbig.parse(data);
        } catch {
            return JSON.parse(data);
        }
    }],
});

const requestRefresh = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn',
    transformResponse: [(data) => {
        try {
            return JSONbig.parse(data);
        } catch {
            return JSON.parse(data);
        }
    }],
});

request.interceptors.request.use((config: any) => {
    const token = store.state.user.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error: any) => {
    return Promise.reject(error);
});

request.interceptors.response.use((response: any) => {
    return response;
}, async (error: any) => {
    if (error.response.status === 401) {
        const res = await requestRefresh({
            url: '/app/v1_0/authorizations',
            method: 'put',
            headers: {
                Authorization: `Bearer ${store.state.user.refresh_token}`,
            },
        });
        const newObj = {
            token: res.data.data.token,
            refresh_token: store.state.user.refresh_token,
        };
        store.commit('setUser', newObj);
        return request(error.config);
    }
    return Promise.reject(error);
});

export default request;
