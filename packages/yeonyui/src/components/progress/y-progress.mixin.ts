/*
 * Created by yeonyu at 2021-10-15
 */


import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'YProgressMixin',
})
export default class YProgressMixin extends Vue {
  @Prop({ type: Boolean })
  protected loading!: boolean;

  @Prop({ type: [String, Number] })
  protected value!: string | number;

  @Prop({ type: String })
  protected color!: string;

  protected get numValue() {
    const numValue = Number(this.value);
    if (Number.isNaN(numValue) || numValue < 0) {
      return 0;
    }
    if (numValue > 100) {
      return 100;
    }
    return numValue;
  }
}
