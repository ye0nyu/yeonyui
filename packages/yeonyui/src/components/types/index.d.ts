import './components';
import Vue from 'vue';
import Yeonyui from './yeonyui';

export default Yeonyui;

declare module 'vue/types/vue' {
  interface Vue {
    $yeonyui: Yeonyui;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    yeonyui?: Yeonyui;
  }
}

declare module 'yeonyui/components' {
  import { VueConstructor } from 'vue';

  const YAlert: VueConstructor;
  const YBtn: VueConstructor;
  const YCheckbox: VueConstructor;
  const YInputCheckbox: VueConstructor;
  const YProgressBar: VueConstructor;
  const YRadio: VueConstructor;
  const YRadioSet: VueConstructor;
  const YSelect: VueConstructor;
  const YSwitch: VueConstructor;
  const YTabs: VueConstructor;
  const YTextInput: VueConstructor;

  export {
    YAlert,
    YBtn,
    YCheckbox,
    YInputCheckbox,
    YProgressBar,
    YRadio,
    YRadioSet,
    YSelect,
    YSwitch,
    YTabs,
    YTextInput,
  };
}
