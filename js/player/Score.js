/*
 * @Description: 计分器
 * @Author: ma.cq
 * @Date: 2019-01-28 10:50:16
 * @LastEditors: ma.cq
 * @LastEditTime: 2019-01-30 16:50:09
 */
import { DataStore } from '../base/DataStore'

export class Score {
  constructor () {
    this.ctx = DataStore.getInstance().ctx
    this.scoreNumber = 0
    // canvas刷新块，会导致多次加分，所以加一个是否能加分开关
    this.canAdd = true
  }

  draw () {
    this.ctx.font = '25px Arial'
    this.ctx.fillStyle = '#acf'
    this.ctx.fillText(this.scoreNumber, DataStore.getInstance().canvas.width / 2, DataStore.getInstance().canvas.height / 18, 1000)
  }
}