//DATA ACCESS LAYER
import * as axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '5e64670f-459a-40a0-b0a5-6e26e9d31f33'/*'cf0861ef-7da3-46a5-90d8-007728cd46d6'*/
    }
})

export const userAPI = {
    getUsers(page, count) {
        return instance.get(`users?page=${page}&count=${count}`).then((response) => {
            return response.data
        })
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`).then((response) => {
            return response.data
        })
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`).then((response) => {
            return response.data
        })
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, {status}).then((response) => {
            return response.data
        })
    },
    updateProfile(contacts) {
        return instance.put(`profile/`, contacts).then((response) => {
            return response.data
        })
    },
    updatePhoto(file) {
        const formData = new FormData()
        formData.append("image", file)
        return instance.put(`profile/photo`, formData, {
            headers:
                {'Content-Type': 'multipart/form-data'}
        }).then((response) => {
            return response.data
        })
    }
}

export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`).then((response) => {
            return response.data
        })
    },
    loginAuth(email, password, rememberMe, captcha) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha}).then((response) => {
            return response.data
        })
    },
    logoutAuth() {
        return instance.delete(`auth/login`).then((response) => {
            return response.data
        })
    },
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`).then((response) => {
            return response.data
        })
    }
}

export const followAPI = {
    postFollow(id) {
        return instance.post(`follow/${id}`).then((response) => {
            return response.data
        })
    },
    deleteFollow(id) {
        return instance.delete(`follow/${id}`).then((response) => {
            return response.data
        })
    }
}
