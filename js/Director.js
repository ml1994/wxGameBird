/*
 * @Description: 导演类，控制游戏逻辑
 * @Author: ma.cq
 * @Date: 2019-01-28 10:54:17
 * @LastEditors: ma.cq
 * @LastEditTime: 2019-01-30 17:46:53
 */

import { Background } from './runtime/Background'
import { DataStore } from './base/DataStore'
import { UpPencil } from './runtime/UpPencil'
import { DownPencil } from './runtime/DownPencil'

export class Director {
  static getInstance () {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }

  constructor () {
    this.dataStore = DataStore.getInstance()
    this.moveSpeed = 2
  }

  createPencil () {
    const minTop = this.dataStore.canvas.height / 8
    const maxTop = this.dataStore.canvas.height / 2
    const top = minTop + Math.random() * (maxTop - minTop)
    this.dataStore.get('pencils').push(new UpPencil(top))
    this.dataStore.get('pencils').push(new DownPencil(top))
  }

  birdJump () {
    for (let i = 0; i <= 2; i++) {
      this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i]
    }
    this.dataStore.get('birds').time = 0
  }

  // 判断小鸟与铅笔撞击
  static isStrick (bird, pencil) {
    let s = false
    if (bird.top > pencil.bottom || bird.bottom < pencil.top || bird.right < pencil.left || bird.left > pencil.right) {
      s = true
    }
    return !s
  }

  // 判断小鸟碰壁
  check () {
    const birds = this.dataStore.get('birds')
    const land = this.dataStore.get('land')
    const pencils = this.dataStore.get('pencils')
    const score = this.dataStore.get('score')
    // 撞击地板了
    if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
      this.isGameOver = true
    }

    // 小鸟边框模型
    const birdBorder = {
      top: birds.y[0],
      bottom: birds.birdsY[0] + birds.birdsHeight[0],
      left: birds.birdsX[0],
      right: birds.birdsX[0] + birds.birdsWidth[0]
    }

    const length = pencils.length
    for (let i = 0; i < length; i++) {
      const pencil = pencils[i]
      const pencilBorder = {
        top: pencil.y,
        bottom: pencil.y + pencil.height,
        left: pencil.x,
        right: pencil.x + pencil.width
      }
      if (Director.isStrick(birdBorder, pencilBorder)) {
        this.isGameOver = true
      }
    }

    // 加分
    if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.canAdd) {
      score.canAdd = false
      score.scoreNumber++
      // 加分震动
      wx.vibrateShort()
    }
  }

  run () {
    // 判断游戏是否结束
    this.check()
    if (!this.isGameOver) {
      this.dataStore.get('background').draw()
      // 绘制铅笔
      const pencils = this.dataStore.get('pencils')
      if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
        pencils.shift()
        pencils.shift()
        // 铅笔回收时开启可加分开关
        this.dataStore.get('score').canAdd = true
      }
      if (pencils[0].x <= (this.dataStore.canvas.width - pencils[0].width) / 2 && pencils.length === 2) {
        this.createPencil()
      }
      this.dataStore.get('pencils').forEach(value => {
        value.draw()
      })

      this.dataStore.get('land').draw()
      this.dataStore.get('score').draw()
      this.dataStore.get('birds').draw()
      
      // 循环渲染，动起来
      const timer = requestAnimationFrame(() => {this.run()})
      this.dataStore.put('timer', timer)
    } else { 
      // 游戏结束
      cancelAnimationFrame(this.dataStore.get('timer'))
      this.dataStore.destory()
      this.dataStore.get('startButton').draw()
      // 垃圾回收
      wx.triggerGC()
    }
  }
}