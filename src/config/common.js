
import {
    axiosPost
} from '../http/index'
import md5 from 'js-md5'
let Base64 = require('js-base64').Base64

let baseUrl = "/api";
// if (location.hostname.indexOf('localhost') !== -1) { // 方便本地调试
//     baseUrl = ""
// }

/**进行验签，若验签正确则返回true，否则返回false
 * data:加密数据
 * encode:待验证的密钥
 */
const dataEncode = function (data, encode) {
    const key = 'ectrip2020';
    if (encode === md5(key + data).toUpperCase()) {
        return true
    } else {
        return false
    }
}

/**通过post请求获取数据
 * goodsData:传入的数据
 * bodyType:body实体
 * url:接口地址
 * callback:回调函数
 */
const post = function (goodsData, bodyType, url, callback) {
    let obj

    //判断传来的数据是否为空
    if (JSON.stringify(goodsData) === "{}") {
        obj = {
            data: "",
            signed: md5("ectrip2020").toUpperCase(),
            securityType: "MD5",
            version: "v1.0",
            saasCode: "saasCode",
            body: null,
        };
    } else {
        let data = Base64.encode(JSON.stringify(goodsData));
        obj = {
            data: data,
            signed: md5("ectrip2020" + data).toUpperCase(),
            securityType: "MD5",
            version: "v1.0",
            bodyType: bodyType,
            saasCode: "saasCode",
            body: null,
        };
    }

    // axiosPost(url, obj)
    axiosPost(baseUrl + url, obj)
        .then((res) => {
            if (res.responseData.code === 200) {
                //进行验签
                if (dataEncode(res.responseData.data, res.signed)) {
                    let returnData = Base64.decode(res.responseData.data);

                    //判断拿到的数据是否为null，防止懒加载重复调用接口
                    if (JSON.parse(returnData) === null) {
                        // store.commit('saveReturnFalse', false)
                        // Notify({
                        //   type: "primary",
                        //   message: "暂无信息"
                        // });
                    } else {
                        // store.commit('saveReturnFalse', true)
                    }
                    window.console.log(JSON.parse(returnData))
                    callback(JSON.parse(returnData),true)
                } else {
                    //验签失败，做点什么
                    window.console.log("验签失败！");
                }
            } else {
                callback(res,false)
                // Notify({
                //   type: "danger",
                //   message: res.responseData.message
                // });
                // Toast(res.responseData.message)
            }
        })
        .catch((err) => {
            window.console.log(err);
        });
}

//判断手机号码是否正确
const isPoneAvailable = (value) => {
    let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(value)) {
        return true;
    } else {
        return false;
    }
}

//判断身份证号码是否正确
const isIdentityAvailable = (value) => {
    let myreg = /^[0-9]{17}[0-9Xx]$/;
    if (!myreg.test(value)) {
        return true;
    } else {
        return false;
    }
}
//eslint-disable-next-line
export default {
    dataEncode,
    post,
    isPoneAvailable,
    isIdentityAvailable
}