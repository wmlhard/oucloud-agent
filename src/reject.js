import axios from 'axios'
import qs from 'qs'
import {Message} from "iview"
import res from '../static/config'
import resOnline from '../static/configOnline'

// import store from './store/store.js'
import store from './store/store'
import router from './router/index'


const tempEngine = (function () {
  var pattern = /\:(\w*[:]*[=]*\w+)(?!})/g;
  return function (template, json) {
    return template.replace(pattern, function (match, key, value) {
      return typeof json[key] == 'undefined' ? ':' + key : json[key];
    });
  }
})();

// axios初始化配置
axios.defaults.timeout = 10000;
const domain = window.location.origin;
if (domain.indexOf('bitboole') > -1) {
  axios.defaults.baseURL = resOnline.url;
} else {
  axios.defaults.baseURL = res.url;
}

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
// axios.defaults.withCredentials = true;
// axios.defaults.headers['Authorization'] = 'Bearer' + store.state.token || '';
// console.log(axios.defaults);
// console.log(store);
axios.defaults.headers['Authorization'] = 'Bearer' + localStorage.getItem('token');




// 请求状态拦截
axios.interceptors.request.use(
  (request) => {
    if (request.method === 'get') {
      request.data = request.data
    } else if (request.method === 'post' && request.headers.hasOwnProperty('Content-Type')) {
      request.data = qs.stringify(request.data)
    } else {
      request.data = qs.stringify(request.data)
    }
    return request
  }, (error) => {
    return Promise.reject(error)
  });

// 返回状态拦截
axios.interceptors.response.use(
  response => {
    if (response.data.status_code === 200) {
      // Message.success('成功！');
    } else if (response.data.status_code === 4001) {
      Message.error('attribute 必须接受。！');
    } else if (response.data.status_code === 4002) {
      Message.error('attribute 不是一个有效的网址。！');
    } else if (response.data.status_code === 4003) {
      Message.error('attribute 必须要晚于 :date！');
    } else if (response.data.status_code === 4004) {
      Message.error('attribute 必须要等于 :date 或更晚！');
    } else if (response.data.status_code === 4005) {
      Message.error('attribute 只能由字母组成！');
    } else if (response.data.status_code === 4006) {
      Message.error('attribute 只能由字母、数字和斜杠组成！');
    } else if (response.data.status_code === 4007) {
      Message.error('attribute 只能由字母和数字组成！');
    } else if (response.data.status_code === 4008) {
      Message.error('attribute 必须是一个数组！');
    } else if (response.data.status_code === 4009) {
      Message.error('attribute 必须要早于 :date');
    } else if (response.data.status_code === 4010) {
      Message.error('attribute 必须要等于 :date 或更早!');
    } else if (response.data.status_code === 4011) {
      Message.error('ttribute 必须介于 :min - :max 之间!');
    } else if (response.data.status_code === 4012) {
      Message.error('attribute 必须介于 :min - :max kb 之间!');
    } else if (response.data.status_code === 4013) {
      Message.error('attribute 必须介于 :min - :max 个字符之间!');
    } else if (response.data.status_code === 4014) {
      Message.error('attribute 必须只有 :min - :max 个单元!');
    } else if (response.data.status_code === 4015) {
      Message.error('attribute 必须为布尔值!');
    } else if (response.data.status_code === 4016) {
      Message.error('attribute 两次输入不一致!');
    } else if (response.data.status_code === 4017) {
      Message.error('attribute 不是一个有效的日期!');
    } else if (response.data.status_code === 4018) {
      Message.error('attribute 的格式必须为 :format!');
    } else if (response.data.status_code === 4019) {
      Message.error('attribute 和 :other 必须不同!');
    } else if (response.data.status_code === 4020) {
      Message.error('attribute 必须是 :digits 位的数字!');
    } else if (response.data.status_code === 4021) {
      Message.error('attribute 必须是介于 :min 和 :max 位的数字!');
    } else if (response.data.status_code === 4022) {
      Message.error('attribute 图片尺寸不正确!');
    } else if (response.data.status_code === 4023) {
      Message.error('attribute 已经存在!');
    } else if (response.data.status_code === 4024) {
      Message.error('attribute 不是一个合法的邮箱!');
    } else if (response.data.status_code === 4025) {
      Message.error('attribute 不存在!');
    } else if (response.data.status_code === 4026) {
      Message.error('attribute 必须是文件!');
    } else if (response.data.status_code === 4027) {
      Message.error('attribute 不能为空!');
    } else if (response.data.status_code === 4028) {
      Message.error('attribute 必须是图片!');
    } else if (response.data.status_code === 4029) {
      Message.error('已选的属性 :attribute 非法!');
    } else if (response.data.status_code === 4030) {
      Message.error('attribute 没有在 :other 中!');
    } else if (response.data.status_code === 4031) {
      Message.error('attribute 必须是整数!');
    } else if (response.data.status_code === 4032) {
      Message.error('attribute 必须是有效的 IP 地址!');
    } else if (response.data.status_code === 4033) {
      Message.error('attribute 必须是有效的 IPv4 地址!');
    } else if (response.data.status_code === 4034) {
      Message.error('attribute 必须是有效的 IPv6 地址!');
    } else if (response.data.status_code === 4035) {
      Message.error('attribute 必须是正确的 JSON 格式!');
    } else if (response.data.status_code === 4036) {
      Message.error('attribute 不能大于 :max!');
    } else if (response.data.status_code === 4037) {
      Message.error('attribute 不能大于 :max kb!');
    } else if (response.data.status_code === 4038) {
      Message.error('attribute 不能大于 :max 个字符!');
    } else if (response.data.status_code === 4039) {
      Message.error('attribute 最多只有 :max 个单元!');
    } else if (response.data.status_code === 4040) {
      Message.error('attribute 必须是一个 :values 类型的文件!');
    } else if (response.data.status_code === 4041) {
      Message.error('attribute 必须是一个 :values 类型的文件!');
    } else if (response.data.status_code === 4042) {
      Message.error('attribute 必须大于等于 :min!');
    } else if (response.data.status_code === 4043) {
      Message.error('attribute 大小不能小于 :min kb!');
    } else if (response.data.status_code === 4044) {
      Message.error('attribute 至少为 :min 个字符!');
    } else if (response.data.status_code === 4045) {
      Message.error('attribute 至少有 :min 个单元!');
    } else if (response.data.status_code === 4046) {
      Message.error('已选的属性 :attribute 非法!');
    } else if (response.data.status_code === 4047) {
      Message.error('attribute 必须是一个数字!');
    } else if (response.data.status_code === 4048) {
      Message.error('attribute 必须存在!');
    } else if (response.data.status_code === 4049) {
      Message.error('attribute 格式不正确!');
    } else if (response.data.status_code === 4050) {
      Message.error('attribute 不能为空!');
    } else if (response.data.status_code === 4051) {
      Message.error('当 :other 为 :value 时 :attribute 不能为空!');
    } else if (response.data.status_code === 4052) {
      Message.error('当 :other 不为 :value 时 :attribute 不能为空!');
    } else if (response.data.status_code === 4053) {
      Message.error('当 :values 存在时 :attribute 不能为空!');
    } else if (response.data.status_code === 4054) {
      Message.error('当 :values 存在时 :attribute 不能为空!');
    } else if (response.data.status_code === 4055) {
      Message.error('当 :values 不存在时 :attribute 不能为空!');
    } else if (response.data.status_code === 4056) {
      Message.error('当 :values 都不存在时 :attribute 不能为空!');
    } else if (response.data.status_code === 4057) {
      Message.error('attribute 和 :other 必须相同!');
    } else if (response.data.status_code === 4058) {
      Message.error('attribute 大小必须为 :size!');
    } else if (response.data.status_code === 4059) {
      Message.error('attribute 大小必须为 :size kb!');
    } else if (response.data.status_code === 4060) {
      Message.error('attribute 必须是 :size 个字符!');
    } else if (response.data.status_code === 4061) {
      Message.error('attribute 必须为 :size 个单元!');
    } else if (response.data.status_code === 4062) {
      Message.error('attribute 必须是一个字符串!');
    } else if (response.data.status_code === 4063) {
      Message.error('attribute 必须是一个合法的时区值!');
    } else if (response.data.status_code === 4064) {
      Message.error('attribute 已经存在!');
    } else if (response.data.status_code === 4065) {
      Message.error('attribute 上传失败!');
    } else if (response.data.status_code === 4066) {
      Message.error('attribute: 格式无效!');
    } else if (response.data.status_code === 4067) {
      Message.error('请填写正确的身份证号!');
    } else if (response.data.status_code === 5000) {
      Message.error('用户已存在!');
    } else if (response.data.status_code === 5001) {
      Message.error('邮箱已注册!');
    } else if (response.data.status_code === 5002) {
      Message.error('创建失败!');
    } else if (response.data.status_code === 5003) {
      Message.error('验证码错误');
    } else if (response.data.status_code === 5004) {
      Message.error('获取用户失败，或者用户不存在!');
    } else if (response.data.status_code === 5005) {
      Message.error('密码错误！');
    } else if (response.data.status_code === 5006) {
      Message.error('操作过于频繁请稍后!');
    } else if (response.data.status_code === 5007) {
      Message.error('发送失败,请重试!');
    } else if (response.data.status_code === 5008) {
      Message.error('修改失败,请重试!');
    } else if (response.data.status_code === 5009) {
      Message.error('获取信息失败!');
    } else if (response.data.status_code === 5010) {
      let params = {
        isLogin: false
      };
      store.commit('LOGOUT', params);
      router.replace({
        path: '/login'
      });
      Message.error('登录失效,请重新登录!');
    } else if (response.data.status_code === 5011) {
      Message.error('授权失败!');
    } else if (response.data.status_code === 5012) {
      Message.error('登录失败!');
    } else if (response.data.status_code === 5013) {
      Message.error('可注册,创建数量已达上限!');
    } else if (response.data.status_code === 5014) {
      Message.error('删除失败!');
    } else if (response.data.status_code === 5015) {
      Message.error('已认证!');
    } else if (response.data.status_code === 5016) {
      Message.error('获取pin失败!');
    } else if (response.data.status_code === 5017) {
      Message.error('pin错误!');
    } else if (response.data.status_code === 5018) {
      Message.error('获取文件失败!');
    } else if (response.data.status_code === 5020) {
      Message.error('无效推广码!');
    } else if (response.data.status_code === 5021) {
      Message.error('尚未绑定!');
    } else if (response.data.status_code === 5022) {
      Message.error('不可为空!');
    } else if (response.data.status_code === 5023) {
      Message.error('已绑定!');
    } else if (response.data.status_code === 5024) {
      Message.error('手机验证失败!');
    } else if (response.data.status_code === 5025) {
      Message.error('注册窗口已关闭!');
    } else if (response.data.status_code === 5026) {
      Message.error('google绑定失败!');
    } else if (response.data.status_code === 5027) {
      Message.error('获取验证码失败!');
    } else if (response.data.status_code === 5028) {
      Message.error('非法注册!');
    } else if (response.data.status_code === 5029) {
      Message.error('请填写新手机号码!');
    } else if (response.data.status_code === 5030) {
      Message.error('账号不存在!');
    }else if (response.data.status_code === 5031) {
      Message.error('支付账号或二维码已存在!');
    }  else if (response.data.status_code === 5032) {
      Message.error('身份证号已存在!');
    } else if (response.data.status_code === 6001) {
      // Message.error('需要进行二次验证!');
    } else if (response.data.status_code === 6002) {
      Message.error('文章分类不存在!');
    } else if (response.data.status_code === 6003) {
      Message.error('参数错误!');
    } else if (response.data.status_code === 6004) {
      Message.error('工单不存在!');
    } else if (response.data.status_code === 6005) {
      Message.error('支付方式不存在!');
    } else if (response.data.status_code === 6006) {
      Message.error('未绑定手机号!');
    } else if (response.data.status_code === 6007) {
      Message.error('未进行实名认证!');
    } else if (response.data.status_code === 6008) {
      Message.error('实名认证未通过!');
    } else if (response.data.status_code === 6009) {
      Message.error('邮箱或手机号不能为空!');
    } else if (response.data.status_code === 6010) {
      Message.error('验证码失效!');
    } else if (response.data.status_code === 6011) {
      Message.error('该手机号已注册!');
    } else if (response.data.status_code === 6012) {
      Message.error('请输入邮箱!');
    } else if (response.data.status_code === 6013) {
      Message.error('区号不能为空!');
    } else if (response.data.status_code === 6014) {
      Message.error('请填写手机号!');
    } else if (response.data.status_code === 6015) {
      Message.error('用户名已存在!');
    }else if (response.data.status_code === 6016) {
      Message.error('请发送短信验证码!');
    }else if (response.data.status_code === 6017) {
      Message.error('请发送邮箱验证码!');
    }else if (response.data.status_code === 6018) {
      Message.error('请验证手机验证码!');
    }else if (response.data.status_code === 6019) {
      Message.error('网络异常!');
    }else if (response.data.status_code === 6020) {
      Message.error('用户昵称错误!');
    }else if (response.data.status_code === 6021) {
      Message.error('请先进行安全验证!');
    }
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 500:{
          if (typeof(error.response.data.status_code) == 'object')
          {
            var res = error.response.data.status_code;
            for (let key in res)
            {
              // console.log(localStorage.getItem('lang'));
              // 存在message
              if (typeof(validation[key]) != 'undefined')
              {
                var data;
                var message;
                var template = validation[key];
                for (let name in res[key])
                {
                  data = JSON.parse(res[key][name]);
                  data['attribute'] = typeof(validindex[name]) != 'undefined' ? validindex[name] : '';
                }
                message = tempEngine(template, data);
                Message.error(message);
                return false;
              }
            }
          }
        }
          // console.log('error')
      }
    }
    return Promise.reject(error)
  }
);

// post请求
const post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
};

// get请求
const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {params})
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
};

// patch请求
const patch = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.patch(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
};


// delete请求
const del = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.delete(url, {params})
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
};

export default {
  get,
  post,
  del,
  patch
}
