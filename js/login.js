const loginIdValidator = new FieldValidator('txtLoginId', async function(value) {
  if(!value) {
    return '请输入账号'
  }
})


const loginPwdValidator = new FieldValidator('txtLoginPwd', async function(value) {
  if(!value) {
    return '请输入密码'
  }
})


const form = $('.user-form');

form.onsubmit = async function(e) {
  e.preventDefault()
  
  const result = await FieldValidator.validate(loginIdValidator, loginPwdValidator)
  console.log(result)
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
  const resp = await API.login(data)
  if (resp.code === 0) {
    location.href = './index.html'
  } else {
    alert('请检查账号和密码')
  }
   
}