/*
 * @Description: 精灵基类，负责初始化精灵加载的资源、大小和位置
 * @Author: ma.cq
 * @Date: 2019-01-28 10:47:38
 * @LastEditors: ma.cq
 * @LastEditTime: 2019-01-30 17:07:29
 */
import { DataStore } from './DataStore'

export class Sprite {
  static getImage (key) {
    return DataStore.getInstance().res.get(key)
  }

  constructor (
    img = null,
    srcX = 0,
    srcY = 0,
    srcW = 0,
    srcH = 0,
    x = 0,
    y = 0,
    width = 0,
    height = 0
  ) {
    this.dataStore = DataStore.getInstance()
    this.ctx = this.dataStore.ctx
    this.img = img
    this.srcX = srcX
    this.srcY = srcY
    this.srcW = srcW
    this.srcH = srcH
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  /**
   * @description: canvas绘制图片
   * @param {type} img 传入的图片
   * @param {type} srcX 图片剪裁x坐标
   * @param {type} srcY 图片剪裁y坐标
   * @param {type} srcW 图片剪裁宽度
   * @param {type} srcH 图片剪裁高度
   * @param {type} x 放置在canvas中的x坐标
   * @param {type} y 放置在canvas中的y坐标
   * @param {type} width 要使用的宽度
   * @param {type} heigth 要使用的高度
   * @return: 
   */
  draw (
    img = this.img,
    srcX = this.srcX,
    srcY = this.srcY,
    srcW = this.srcW,
    srcH = this.srcH,
    x = this.x,
    y = this.y,
    width = this.width,
    height = this.height
  ) {
    this.ctx.drawImage(
      img,
      srcX,
      srcY,
      srcW,
      srcH,
      x,
      y,
      width,
      height
    )
  }
}