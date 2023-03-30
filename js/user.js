// 用户登录和注册验证的表单项
class FieldValidator {
  constructor(txtId, validatorFunc) {
    this.input = $('#' + txtId);
    this.p = this.input.nextElementSibling;
    this.validatorFunc = validatorFunc
    this.input.onblur = () => {
      this.validate()
    }

  }

  async validate() {
    const err = await this.validatorFunc(this.input.value)
    if (err) {
      this.p.innerText = err
      return false
    } else {
      this.p.innerText = ''
      return true
    }
  }

  static async validate(...validators) {
    const proms = validators.map(item => item.validate())
    const results = await Promise.all(proms);
    console.log(results)
    return results.every(r => r)
  }
}