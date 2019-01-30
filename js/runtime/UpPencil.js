/*
 * @Description: 上铅笔
 * @Author: ma.cq
 * @Date: 2019-01-28 10:53:03
 * @LastEditors: ma.cq
 * @LastEditTime: 2019-01-29 15:38:11
 */
import { Sprite } from '../base/Sprite'
import { Pencil } from './Pencil'

export class UpPencil extends Pencil {
  constructor (top) {
    const image = Sprite.getImage('pieUp')
    super(image, top)
  }

  draw () {
    this.y = this.top - this.height
    super.draw()
  }
}