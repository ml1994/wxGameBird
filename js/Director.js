/*
 * @Description: 导演类，控制游戏逻辑
 * @Author: ma.cq
 * @Date: 2019-01-28 10:54:17
 * @LastEditors: ma.cq
 * @LastEditTime: 2019-01-29 17:31:27
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
    const minTop = window.innerHeight / 8
    const maxTop = window.innerHeight / 2
    const top = minTop + Math.random() * (maxTop - minTop)
    this.dataStore.get('pencils').push(new UpPencil(top))
    this.dataStore.get('pencils').push(new DownPencil(top))
  }

  run () {
    if (!this.isGameOver) {
      this.dataStore.get('background').draw()

      const pencils = this.dataStore.get('pencils')
      if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
        pencils.shift()
        pencils.shift()
      }

      if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2 && pencils.length === 2) {
        this.createPencil()
      }
      this.dataStore.get('pencils').forEach(value => {
        value.draw()
      })

      this.dataStore.get('land').draw()
      
      // 循环渲染，动起来
      const timer = requestAnimationFrame(() => {this.run()})
      this.dataStore.put('timer', timer)
    } else { 
      // 游戏结束
      cancelAnimationFrame(this.dataStore.get('timer'))
      this.dataStore.destory()
    }
  }
}