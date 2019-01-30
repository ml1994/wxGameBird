/*
 * @Description: 铅笔类
 * @Author: ma.cq
 * @Date: 2019-01-29 15:13:37
 * @LastEditors: ma.cq
 * @LastEditTime: 2019-01-30 17:03:44
 */
import { Sprite } from '../base/Sprite'
import { DataStore } from '../base/DataStore'

export class Pencil extends Sprite {
  constructor (image, top) {
    super(
      image,
      0, 0,
      image.width, image.height,
      DataStore.getInstance().canvas.width, 0,
      image.width, image.height
    )
    this.top = top
    this.moveSpeed = 2
  }

  draw () {
    this.x -= this.moveSpeed
    super.draw(
      this.img,
      0, 0,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height
    )
  }
}