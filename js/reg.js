const loginIdValidator = new FieldValidator('txtLoginId', async function(value) {
  if(!value) {
    return '请输入账号'
  }
  const resp = await API.exists(value);
  if (resp.data) {
    return '该账号已存在，请重新选择一个账号'
  }
})

const nicknameValidator = new FieldValidator('txtNickname', async function(value) {
  if(!value) {
    return '请输入昵称'
  }
})

const loginPwdValidator = new FieldValidator('txtLoginPwd', async function(value) {
  if(!value) {
    return '请输入密码'
  }
})

const loginPwdConfirm = new FieldValidator('txtLoginPwdConfirm', async function(value) {
  if(!value) {
    return '请填写确认密码密码'
  }
  if(value !== loginPwdValidator.input.value) {
    return '两次密码不一致'
  }
})


const form = $('.user-form');

form.onsubmit = async function(e) {
  e.preventDefault()
  
  const result = await FieldValidator.validate(loginIdValidator, nicknameValidator, loginPwdValidator, loginPwdConfirm)
   if(!result) {
    return
   }
  //  老办法，直接搞这个
  //  const resp = await API.reg({
  //   loginId: loginIdValidator.input.value,
  //   loginPwd: loginPwdValidator.input.value,
  //   nickname: nicknameValidator.input.value,
  //  })

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries())
  console.log(data)
  const resp = await API.reg(data)
  if (resp.code === 0) {
    alert('注册成功， 点击确定，跳转到登陆页')
    location.href = './login.html'
  }
   
}