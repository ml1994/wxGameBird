/*
 * @Description: 开始按钮
 * @Author: ma.cq
 * @Date: 2019-01-28 10:50:38
 * @LastEditors: ma.cq
 * @LastEditTime: 2019-01-30 17:03:27
 */
import { Sprite } from '../base/Sprite'
import { DataStore } from '../base/DataStore'

export class StartButton extends Sprite {
  constructor () {
    const image = Sprite.getImage('startButton')
    super(
      image,
      0, 0,
      image.width, image.height,
      (DataStore.getInstance().canvas.width - image.width) / 2, (DataStore.getInstance().canvas.height - image.height) / 2,
      image.width, image.height
    )
  }
}