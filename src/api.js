import http from './reject'

export default {

  // workingList(params){
  //   return http.get('ticket/get_ticket_list',params)
  // },

  // login(params) {
  //   return http.post('agent/agent_login', params)
  // },

  login_show(params){
    return http.post('agent/agent_login', params)
  },

  //登录获取图片(no)
  loginImg() {
    return http.get('common/get_captcha')
  },
  //图片验证(no)
  loginImgVerify(params) {
    return http.post('common/check_captcha', params)
  },

  //退出
  logout() {
    return http.get('agent/agent_login_out')
  },

  //忘记密码验证账号是否存在
  validateEmail(params){
    return http.post('agent/validate_agent',params)
  },
  //忘记密码发送邮箱验证码
  forgetEmailVerify(params){
    return http.get('agent/agent/send_email/id/'+params.id)
  },
  // 忘记密码验证邮箱验证码（no）
  // validateEmail(params){
  //   return http.post('authorize/account_security/validate_email',params)
  // },
  // forgetValidateEmail(params){
  //   return http.post('agent/check_email_code',params)
  // },
  forgetValidateEmail(params){
    return http.post('agent/validate_email_code',params)
  },
  //忘记密码发送手机验证
  forgetPhoneVerify(params){
    return http.get('agent/agent/send_sms/id/'+params.id)
  },
  //忘记密码验证手机验证码
  forgetValidatePhone(params){
    return http.post('agent/validate_phone_code',params)
  },
  //忘记密码验证谷歌
  forgetValidateGoogle(params){
    return http.get('agent/agent/check_google/id/'+params.id, params.data)
  },




  //2次邮箱验证码
  emailCode(params) {
    return http.post('agent/agent/send_email', params)
  },
  //2次邮箱验证
  emailCodeVerify(params) {
    return http.post('agent/agent/validate_email', params)
  },
  //2次验证手机号验证码
  phoneCode(params) {
    return http.post('agent/agent/send_sms', params)
  },
  //2次验证手机
  phoneCodeVerify(params) {
    return http.post('agent/agent/validate_phone', params)
  },
  //2次验证谷歌
  googleCodeVerify(params) {
    return http.post('agent/agent/check_google', params)
  },


  //账号管理-基本信息-账号安全
  getAgentInfo() {
    return http.get('agent/get_agent_status')
  },
  //账号管理-基本信息-账号安全-二次验证手机验证
  secondverifyphonesms() {
    return http.post('agent/sms')
  },
  //账号管理-基本信息-账号安全-二次验证
  checksecVerify(){
    return http.post('agent/check_two_status/status/status')
  },
  secondVerify(params) {
    return http.patch('agent/patch_status', params)
  },
  //账号管理-基本信息-账号安全-二次验证-操作验证
  oprationemailverify(params){
    return http.post('agent/check_email_code', params)
  },
  oprationphoneverify(params){
    return http.post('agent/check_phone_code', params)
  },
  oprationgoogleverify(params){
    return http.post('agent/check_google_code', params)
  },
  //账号管理-基本信息-账号安全-二次验证邮箱
  emailsecVerifychange(params){
    return http.post('agent/check_email_code/type/'+ params.status, params)
  },
  //账号管理-基本信息-账号安全-二次验证手机
  phonesecVerifychange(params){
    return http.post('agent/check_phone_code/type/'+ params.status, params)
  },
  //账号管理-基本信息-账号安全-二次验证谷歌
  googlesecVerifychange(params){
    return http.post('agent/check_google_code/type/'+ params.status, params)
  },
  //账号管理-账号安全-绑定手机-验证-获取旧手机号
  phoneInfo() {
    return http.get('agent/phone_info')
  },
  //账号管理-账号安全-绑定手机-验证-验证旧手机号
  verifyphone(params) {
    return http.post('agent/get_phone_umber', params)
  },
  //账号管理-账号安全-绑定手机-修改绑定-获取手机验证码
  sendsms(params) {
    return http.post('common/send_sms', params)
  },
  //账号管理-账号安全-绑定手机-修改绑定-重新绑定手机
  resetbind(params) {
    return http.patch('agent/edit_phone', params)
  },
  //账号管理-账号安全-谷歌渲染
  googleInfo(){
    return http.post('agent/get_google_code')
  },
  //账号管理-账号安全-谷歌绑定
  bindGoogle(params) {
    return http.post('agent/check_google_code', params)
  },
  //账号管理-账号安全-登录密码修改
  loginpassword(params) {
    return http.patch('agent/update_password', params)
  },
  //账号管理-账号安全-资金密码-获取邮箱
  emailInfo() {
    return http.get('agent/email_info')
  },
  //账号管理-账号安全-资金密码-获取验证码(无需邮箱发送验证）
  sendemailsms() {
    return http.post('agent/send_email')
  },
  //账号管理-账号安全-资金密码-验证验证码
  verifyemailsms(params) {
    return http.post('agent/check_email_code', params)
  },
  //账号管理-账号安全-资金密码-修改资金密码
  moneypawchange(params) {
    return http.patch('agent/update_pin', params)
  },
  //账号管理-绑定账号列表
  getBindList(params) {
    return http.get('agent/get_user_access_list', params)
  },
  //账号管理-绑定账号列表-新增
  getiddlist(){
    return http.get('common/get_country')
  },
  newBind(params) {
    return http.post('agent/create_agent_contacts', params)
  },
  //账号管理-绑定账号列表-删除
  deletebind(params) {
    return http.del('agent/delete_agent_contacts', params)
  },


  //代理返点率信息
  sureBtn(params) {
    return http.post('agent/update_agent_rebate', params)
  },

  //获取代理返点率信息
  getreat() {
    return http.get('agent/get_agent_rebate')
  },

  //新增要请链接
  sureBtn_add(){
    return http.get('agent/create_promo')
  },
  //邀请链接列表
  tabDataList(params){
    return http.get('agent/promo_list',params)
  },
// //  新闻
//   getNewsList(params){
//     return http.get('article/get_news_list',params)
//   },
//   //新闻文章详情
//   getNewsDetail(params){
//     return http.get('article/gegetNewsListt_details',params)
//
//   },



  // 重置密码
  forgetResetPassword(params){
    return http.patch('agent/reset_agent_pass',params)
  },
  getNewsList(params){
    return http.get('article/get_news_list',params)
  },
  getNewsDetail(params){
    return http.get('article/get_details',params)
  },
  //邀请记录-渲染
  invitedlist(params){
    return http.get('agent/get_user_list',params)
  }

}

