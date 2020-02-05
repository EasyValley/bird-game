function load(sources, callback) {
  let len = sources.length
  let count = 0
  let imageMap = {}

  for (let i = 0; i < len; i += 1) {
    let img = new Image() // 创建图像标签
    img.src = require('../imgs/' + sources[i] + '.png')
    imageMap[sources[i]] = img
    img.addEventListener('load', () => {
      count += 1
      if (count >= len) {
        if (callback) {
          callback(imageMap)
          let dom = document.getElementById('begin')
          dom.style.display = 'inline-block'
        }
      }
    })
  }
}

export default { load }
