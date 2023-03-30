(async function() {
  const resp = await API.profile()
  const user = resp.data
  if (!user) {
    location.href = './login.html'
    return
  }
  // 登录状态
  const doms = {
    aside: {
      nickname: $('#nickname'),
      loginId: $('#loginId')
    },
    close: $('.close'),
    chartContainer: $('.chat-container'),
    txtMsg: $('#txtMsg'),
    msgContainer: $('.msg-container')
  }

  doms.close.onclick = function() {
    API.loginOut()
    location.reload()
  }

  // 记载历史记录
  const history = await API.getHistory()
  for(const item of history.data) {
    addChat(item)
  }

  scrollToBottom()

  function scrollToBottom() {
    doms.chartContainer.scrollTop = doms.chartContainer.scrollHeight
  }

  function setUserInfo() {
    doms.aside.nickname.innerText = user.nickname;
    doms.aside.loginId.innerText = user.loginId
  }

  setUserInfo()

  function addChat(chatInfo) {
    const html = `<div class="chat-item ${chatInfo.from ? 'me' : ''}">
    <img class="chat-avatar" src="${chatInfo.from ? './asset/avatar.png' : './asset/robot-avatar.jpg'}">
    <div class="chat-content">${chatInfo.content}</div>
    <div class="chat-date">${formatData(chatInfo.createdAt)}</div>
    </div>`
    doms.chartContainer.innerHTML += html
  }

  function formatData(timestamp) {
    const date = new Date(timestamp)
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const second = date.getSeconds().toString().padStart(2, '0')

    return `${year}-${month}-${day}-${hour}-${second}`
  }

  async function sendChat() {
    const content = doms.txtMsg.value.trim()
    if (!content) {
      return
    }
    addChat({
      from: user.loginId,
      to:null,
      createdAt: Date.now(),
      content
    })
    doms.txtMsg.value = ''
    scrollToBottom()
    const result = await API.sendChat(content)
    console.log(result)
    addChat({
      from: null,
      to: user.loginId,
      ...result.data
    })
    scrollToBottom()
  }

  doms.msgContainer.onsubmit = function(e) {
    e.preventDefault()
    sendChat()
  }
  
})()