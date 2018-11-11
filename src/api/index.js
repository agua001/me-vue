import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

// 4.1 定义一个方法，实现登录验证
export const postLogin = obj => {
  return axios.post('/login', obj)
    .then(res => res.data)
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 将token给到一个前后台约定好的key中，作为请求发送
  // 先从本地取token的值，判断到底有没有token值，如果有就往headers里面塞token，如果没有就直接return
  let mytoken = localStorage.getItem('mytoken') || ''
  if (mytoken) {
    // 存在token就将token塞进请求头的某个字段中，这个字段名不能随便取，它是一个前后端约定好的字段名
    config.headers['Authorization'] = mytoken
  }
  // 请求对象必须要return回去
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 用户数据列表接口
// 用户数据列表  可以这样写哦 简写
// getUserList = obj  标题=值
export const getUserList = obj => axios.get('/users', { params: obj }).then(res => res.data)

// 添加用户
export const addUser = obj => axios.post('/users', obj).then(res => res.data)

// 删除用户
export const delUser = id => axios.delete(`/users/${id}`).then(res => res.data)

// 编辑用户
export const editUser = obj => axios.put(`/users/${obj.id}`, {email: obj.email, mobile: obj.mobile}).then(res => res.data)

// 切换用户状态
export const changeState = (id, state) => axios.put(`/users/${id}/state/${state}`).then(res => res.data)
