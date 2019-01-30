/*
* @Description: 游戏入口
* @Author: ma.cq
* @Date: 2019-01-28 10:56:04
 * @LastEditors: ma.cq
 * @LastEditTime: 2019-01-29 17:31:45
*/

import { ResourceLoader } from './js/base/ResourceLoader'
import { Background } from './js/runtime/Background'
import { Land } from './js/runtime/Land'
import { DataStore } from './js/base/DataStore'
import { Director } from './js/Director'

export class Main {
  constructor () {
    this.canvas = wx.createCanvas()
    this.ctx = this.canvas.getContext('2d')
    
    this.dataStore = DataStore.getInstance()
    this.director = Director.getInstance()

    const loader = ResourceLoader.create()
    loader.onLoaded(map => {
      this.onResourceFirstLoaded(map)
    })
  }
  /**
   * @description: 资源第一次加载完成（重新开始只需重置逻辑，不需重置资源）
   * @param {type} 资源map
   * @return: 
   */
  onResourceFirstLoaded (map) {
    // 直接挂载在store对象上，不随游戏重新开始被销毁
    this.dataStore.ctx = this.ctx
    this.dataStore.res = map
    this.init()
  }

  init () {
    // 游戏结束标识
    this.director.isGameOver = false

    // 需要随游戏一轮销毁的放入store
    this.dataStore
      .put('pencils', [])
      .put('background', Background)
      .put('land', Land)
    
    this.director.createPencil()
    this.director.run()
  }
}