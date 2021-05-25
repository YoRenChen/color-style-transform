
const cssType = 'less'
const createTheme = (theme) => {
  console.log('%c正在编译主题！', 'color: blue')
  const curTheme = theme || window.localStorage.getItem('curTheme') || 'default'
  updateTheme(curTheme)
}

/**
 * 创建less link
 * @param {String} theme 主题
 */
function createLink(theme = 'default') {
  const lessStyleNode = document.createElement('link')

  lessStyleNode.setAttribute('id', `less:color`)
  lessStyleNode.setAttribute('rel', 'stylesheet/less')
  lessStyleNode.setAttribute('href', `./${theme || 'default'}-color.${cssType}`)
  document.body.appendChild(lessStyleNode)
  window.localStorage.setItem('curTheme', theme)
}

function updateLink(theme, options) {
  const curTheme = window.localStorage.getItem('curTheme')
  const lessElement = document.getElementById('less:color')
  const cssElement = document.getElementById(`less:${curTheme || 'default'}-color`)

  if (cssElement) cssElement.parentNode.removeChild(cssElement)
  if (curTheme !== theme) lessElement.setAttribute('href', `./${theme || 'default'}-color.${cssType}`)
  modifyVars(theme, options)
  console.log('%c主题创建成功!', 'color: green')
  window.localStorage.setItem('curTheme', theme)
}

function modifyVars(theme, params = {}) {
  if (!window.less || !window.less.modifyVars) return
  window.less.modifyVars(params)
    .catch(() => {
      console.log('%c主题创建失败!', 'color: red')
    })
}

function updateTheme(e) {
  const curTheme = window.localStorage.getItem('curTheme') || 'default'
  const theme = e || curTheme
  const themeColor = window.localStorage.getItem('themeColor') || '#066CF3'

  console.log(e)

  const option = {
    '@primary-color': themeColor,
    '@theme': theme
  }

  if ('less' in window) {
    updateLink(theme, option)
  } else {
    // hideMessage()
    createLink(theme)
    createScript()
    setTimeout(() => updateLink(theme, option), 1000)
  }
}

/**
 * 加载less option和less.js
 */
function createScript() {
  const lessConfigNode = document.createElement('script')
  const lessScriptNode = document.createElement('script')

  lessConfigNode.innerHTML = `
  window.less = {
    async: true,
    env: 'production',
    javascriptEnabled: true
  };
`
  lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js'
  lessScriptNode.async = true

  lessScriptNode.onload = () => {
    lessScriptNode.onload = null
  }
  document.body.appendChild(lessConfigNode)
  document.body.appendChild(lessScriptNode)
}

export { createTheme, updateTheme }
