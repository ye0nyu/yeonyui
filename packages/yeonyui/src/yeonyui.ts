/*
 * Created by yeonyu at 2021-09-30
 */

import { install } from './install';
import { PluginFunction } from 'vue';

export default class Yeonyui {
  public static install: PluginFunction<any> = install;

  private componentCounter = 0;

  private _icons: Record<string, any> = {
    //
  };

  // TODO: Yeonyui 초기화 옵션 인터페이스 생성
  constructor(options?: any) {
    if (options && Object.prototype.hasOwnProperty.call(options, 'icons')) {
      this._icons = { ...this._icons, ...options.icons };
    }
  }

  public getComponentCounter() {
    const counter = this.componentCounter;
    this.componentCounter += 1;
    return counter;
  }

  private _palette: Record<string, string> = {};

  public get palette() {
    return this._palette;
  }

  public get icons() {
    return this._icons;
  }

  public addPaletteColor(name: string, color: string) {
    Object.defineProperty(this._palette, name, {
      value: color,
    });
  }
}
