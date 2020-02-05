import loader from './loader'
import config from './config'
import Bird from './bird'
import Land from './land'
import Score from './score'
import Sky from './sky'
import Pipe from './pipe'

let sources = ['birds', 'land', 'pipe1', 'pipe2', 'sky']
let resetDom = document.getElementById('begin')
loader.load(sources, imageMap => {
  firstFrame(imageMap)
  resetDom.addEventListener('click', () => {
    resetDom.style.display = 'none'
    main(imageMap)
  })
})

function firstFrame(imageMap) {
  let cvs = document.getElementById('cvs')
  let ctx = cvs.getContext('2d')
  ctx.font = '30px Verdana'
  ctx.drawImage(imageMap.sky, 0, 0)
  ctx.strokeText('flappy bird', 300, 300)
}

function main(imageMap) {
  let cvs = document.getElementById('cvs')
  let gameOver = false
  let startTime = Date.now()

  let ctx = cvs.getContext('2d')
  ctx.font = '30px Verdana'
  ctx.strokeStyle = '#0000ff'

  /**
   * 鸟
   */
  let bird = new Bird(ctx, imageMap.birds)
  cvs.addEventListener('click', birdFly)

  /**
   * 大地
   */
  let lands = []
  for (let i = 0; i < 4; i += 1) {
    let land = new Land(ctx, imageMap.land, 336 * i)
    lands.push(land)
  }
  /**
   * 分数
   */

  let score = new Score(ctx)

  /**
   * 天空
   */
  let skys = []
  for (let i = 0; i < 2; i += 1) {
    let sky = new Sky(ctx, imageMap.sky, i * 800)
    skys.push(sky)
  }

  /**
   * 管道
   */
  let pipes = []
  for (let i = 0; i < 4; i += 1) {
    let pipe = new Pipe(
      ctx,
      config.pipe.spaceX * (i + 2),
      imageMap.pipe2,
      imageMap.pipe1
    )
    pipes.push(pipe)
  }

  /**
   * 主循环
   */

  loop(Date.now())

  function loop(lastTime) {
    let now = Date.now()
    let dt = now - lastTime
    ctx.clearRect(0, 0, 800, 600)
    skys.forEach(sky => {
      sky.draw(dt)
    })

    pipes.forEach(pipe => {
      pipe.draw(dt)
    })
    lands.forEach(land => {
      land.draw(dt)
    })

    let second = (now - startTime) / 1000
    score.draw(second.toFixed(1))
    bird.draw(dt)

    if (bird.y > 500 || bird.y < bird.h / 2) {
      gameOver = true
    }
    if (ctx.isPointInPath(bird.x, bird.y)) {
      gameOver = true
    }
    ctx.beginPath()
    let loopWithTime = loop.bind(this, now)
    if (!gameOver) {
      requestAnimationFrame(loopWithTime)
    } else {
      cvs.removeEventListener('click', birdFly)
      ctx.strokeText('游戏结束', 300, 300)
      resetDom.style.display = 'inline-block'
      resetDom.innerHTML = '从新开始'
    }
  }
  function birdFly() {
    bird.speed = -config.bird.speed
  }
}
