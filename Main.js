/*
* @Description: 游戏入口
* @Author: ma.cq
* @Date: 2019-01-28 10:56:04
 * @LastEditors: ma.cq
 * @LastEditTime: 2019-01-30 17:30:57
*/

import { ResourceLoader } from './js/base/ResourceLoader'
import { Background } from './js/runtime/Background'
import { Land } from './js/runtime/Land'
import { DataStore } from './js/base/DataStore'
import { Director } from './js/Director'
import { Birds } from './js/player/Birds'
import { StartButton } from './js/player/StartButton'
import { Score } from './js/player/Score'

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

  createBgMusic () {
    const bgm = wx.createInnerAudioContext()
    bgm.loop = true
    bgm.autoplay = true
    bgm.src = './audios/bgm.mp3'
  }

  /**
   * @description: 资源第一次加载完成（重新开始只需重置逻辑，不需重置资源）
   * @param {type} 资源map
   * @return: 
   */
  onResourceFirstLoaded (map) {
    // 直接挂载在store对象上，不随游戏重新开始被销毁
    this.dataStore.canvas = this.canvas
    this.dataStore.ctx = this.ctx
    this.dataStore.res = map
    this.createBgMusic()
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
      .put('birds', Birds)
      .put('startButton', StartButton)
      .put('score', Score)
    
    this.registerEvent()

    this.director.createPencil()
    this.director.run()
  }

  registerEvent () {
    wx.onTouchStart(() => {
      if (this.director.isGameOver) {
        this.init()
      } else {
        this.director.birdJump()
      }
    })
  }
}