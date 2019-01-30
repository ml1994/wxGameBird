/*
 * @Description: 下铅笔
 * @Author: ma.cq
 * @Date: 2019-01-28 10:53:09
 * @LastEditors: ma.cq
 * @LastEditTime: 2019-01-29 16:43:34
 */
import { Sprite } from '../base/Sprite'
import { Pencil } from './Pencil'

export class DownPencil extends Pencil {
  constructor (top) {
    const image = Sprite.getImage('pieDown')
    super(image, top)
  }

  draw () {
    const gap = window.innerHeight / 5
    this.y = this.top + gap
    super.draw()
  }
}