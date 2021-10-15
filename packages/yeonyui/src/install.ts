/*
 * Created by yeonyu at 2021-09-30
 */

import { PluginFunction, VueConstructor } from 'vue';
import * as components from './components';

export const install: PluginFunction<any> = (
  Vue: VueConstructor,
  options: any = {},
) => {
  const yeonyui = options.yeonyui;
  if (yeonyui) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$yeonyui = yeonyui;
    if (options) {
      if (options.palette) {
        const { palette } = options;
        Object.keys(palette).forEach((colorName) => {
          yeonyui.addPaletteColor(colorName, palette[colorName]);
        });
      }
    }
  }

  const componentNames = Object.keys(components) as (keyof typeof components)[];
  componentNames.forEach((name) => {
    Vue.component(name, components[name] as typeof Vue);
  });
};
