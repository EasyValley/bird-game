class Score {
  constructor(ctx) {
    this.ctx = ctx
  }
  draw(score) {
    this.ctx.strokeText(score, 100, 30)
  }
}

export default Score
