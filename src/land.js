import config from './config'
class Land {
  constructor(ctx, img, x) {
    this.ctx = ctx
    this.img = img
    this.x = x
    this.speed = config.land.speed
  }
  update(dt) {
    this.x = this.x + this.speed * dt
    if (this.x < -336) {
      this.x = this.x + 336 * 4
    }
  }
  draw(dt) {
    this.update(dt)
    this.ctx.drawImage(this.img, this.x, 500)
  }
}

export default Land
