import axios from 'axios'
import qs from 'qs'

/* 设置请求超时的时间 */
axios.default.timeout = 5000;

//设置请求头
// axios.defaults.headers.post['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InBhc3N3b3JkIjpudWxsLCJ1c2VybmFtZSI6ImxpIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6InVzZXIifV0sImFjY291bnROb25FeHBpcmVkIjp0cnVlLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOnRydWUsImVuYWJsZWQiOnRydWV9LCJpYXQiOjE2MDk4Mjc1NzMsImV4cCI6MTYwOTgyOTM3M30.G_uBk5K5TNQiuY5KxL6NCRaBIphpcLIi9G-opYhI9YA';

//携带cookie
axios.defaults.withCredentials = true;

const http = axios.create({
    baseURL: '',
    withCredentials: true, // 跨域类型时是否在请求中协带cookie
    paramsSerializer: function (params) {
        return qs.stringify(params, {
            arrayFormat: 'brackets'
        })
    }
})

http.interceptors.request.use(config => {

    //判断token是否带有内容，若有则在请求头添加Authorization
    let token = localStorage.getItem("token")
    if (token) {
        // window.console.log(token)
        config.headers.common['Authorization'] = "Bearer " + token
    }
    // 最后必须返回config
    return config
}, function (error) {
    router.push('/loginUser')
    return Promise.reject(error)
})

http.interceptors.response.use(config => {
    // 最后必须返回config
    return config
}, function (error) {
    // 对响应错误做点什么
    if (error.response) {
        switch (error.response.status) {
            /**对状态码进行判断
             * 若返回未登录，则记录当前页面路径，然后跳转到登录页
             */
            case 401:
                // Vue.nextTick(() => {
                //     router.push('/loginUser')
                // })
                return config
            case 500:
                if (error.response.data.code === 401) {
                    // Notify({
                    //   type: "danger",
                    //   message: error.response.data.message
                    // });
                }
                return config
            default:
                return config
        }
    }
    return Promise.reject(error)
})

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function axiosGet(url, params) {
    return new Promise((resolve, reject) => {
        http.get(url, {
            params: params
        }).then(res => {
            // if (res.data.code == 9990) {
            //   router.push('/loginUser')
            // }
            resolve(res.data);
        }).catch(err => {
            // if (res.data.code == 9990) {
            //   router.push('/loginUser')
            // }
            reject(err.data)
        })
    });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function axiosPost(url, params) {
    return new Promise((resolve, reject) => {
        http.post(url, params)
            .then(res => {
                // if (res.data.code == 9990) {
                //   router.push('/loginUser')
                // }
                resolve(res.data);
            })
            .catch(err => {
                // if (res.data.code == 9990) {
                //   router.push('/loginUser')
                // }
                reject(err.data)
            })
    });
}