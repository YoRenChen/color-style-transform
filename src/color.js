// 把某个目录下的less打包到public上
const fs = require('fs')
const path = require('path')
const less = require('less')
const LessPluginNpmImport = require('less-plugin-npm-import')
const getPathInfo = p => path.parse(p)
const defaultTheme = 'default'

async function generateTheme({ themePath, outputFilePath, themeType }) {
  let lessCodes = ''
  if (typeof themePath === 'object') {
    lessCodes = themePath.map(el => extractCss(el))
  } else if (typeof themePath === 'string' && themePath) {
    lessCodes = extractCss(themePath)
  }

  // 生成合并的less
  const componentLess = componentStyle('./styles/component', true, ['.less'])
  lessCodes = lessCodes + '\n' + componentLess
  if (outputFilePath) {
    // 生成less版本的和css版本的
    const lessPath = path.join(__dirname, `${outputFilePath}.less`)
    fs.writeFileSync(lessPath, lessCodes)

    if (defaultTheme === themeType) {
      loader(lessCodes).then(e => {
        const cssPath = path.join(__dirname, `${outputFilePath}.css`)
        fs.writeFileSync(cssPath, e.css)
      }).catch(() => {
        console.log('%c主题创建失败', 'color: red; font-size: 24px')
      })
    }
  } else {
    console.log('%c主题创建成功', 'color: green; font-size: 24px')
  }
}
/**
 * 导出less文件内容
 * @param {*} url
 */
function extractCss(url) {
  try {
    const filePath = path.join(__dirname, url)
    let css = ''
    css = combineLess(filePath)
    css = minifyCss(css)
    return css
  } catch (error) {
    console.log('error', error)
  }
}
/**
 * 整理Less内容
 * @param {*} css
 */
function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
    .replace(/^\s*$(?:\r\n?|\n)/gm, '')
    .replace(/\{(\r\n?|\n)\s+/g, '{')
    .replace(/;(\r\n?|\n)\}/g, ';}')
    .replace(/;(\r\n?|\n)\s+/g, ';')
    .replace(/,(\r\n?|\n)[.]/g, ', .')
}

/**
 * 合并less里的引用
 * @param {*} filePath 文件地址
 * @param {*} fileType 文件类型
 */
function combineLess(filePath, fileType = '.less') {
  const fileContent = fs.readFileSync(filePath).toString()
  const directory = path.dirname(filePath)
  return fileContent
    .split('\n')
    .map((line) => {
      if (line.startsWith('@import')) {
        let importPath = line.match(/@import\ ["'](.*)["'];/)[1]
        if (!importPath.endsWith(fileType)) {
          importPath += fileType
        }
        const newPath = path.join(directory, importPath)
        return combineLess(newPath)
      }
      return line
    })
    .join('\n')
}
/**
 * 导出组件less内容并压缩，使用fs替代webpack的require.context
 * @param {*} url 目录地址
 * @param {*} useSubdirectories 是否索引子目录
 * @param {*} extList 文件类型
 */
function componentStyle(url, useSubdirectories = false, extList = ['.js']) {
  const filesList = []
  const directory = path.join(__dirname, url)
  // 递归读取文件
  function readFileList(directory, useSubdirectories, extList) {
    const files = fs.readdirSync(directory)
    files.forEach(item => {
      const fullPath = path.join(directory, item)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory() && useSubdirectories) {
        readFileList(path.join(directory, item), useSubdirectories, extList)
      } else {
        const info = getPathInfo(fullPath)
        extList.includes(info.ext) && filesList.push(url + '/' + item)
      }
    })
  }
  readFileList(directory, useSubdirectories, extList)
  return filesList.map((el) => {
    try {
      const filePath = path.join(__dirname, el)
      const fileContent = fs.readFileSync(filePath).toString()
        .split('\n')
        .filter((line) => !line.startsWith('@import') && line)
      return fileContent
    } catch (error) {
      return ''
    }
  }).reduce((res, el) => res.concat(el)).join('')
}

/**
 * less render 把less转css
 * @param {*} css css内容
 */
function loader(css) {
  // 调用render将less转为css
  const data = css.replace(/^\uFEFF/, '')
  const lessOpts = {
    filename: `${+new Date()}`,
    plugins: [new LessPluginNpmImport({ prefix: '~' })],
    javascriptEnabled: true
  }

  return less.render(data, lessOpts).then((output) => {
    // 生成到outputPath
    return output
  }).catch(e => {
    console.log('catch', e)
  })
}

['dark', 'default'].forEach(el => generateTheme({
  themePath: `./styles/${el}.less`,
  outputFilePath: `../public/${el}-color`,
  themeType: el
}))
