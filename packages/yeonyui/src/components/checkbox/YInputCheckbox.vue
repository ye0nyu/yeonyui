<!--
  - Created by yeonyu at 2021-09-23
  -->

<template>
  <div
    @click="onClick"
    class="y-input y-input--checkbox"
    :class="classes"
  >
    <input
      :id="inputId"
      :aria-checked="checked"
      role="checkbox"
      type="checkbox"
      :checked="checked"
      @focus="onFocus"
      @blur="onBlur"
    >
    <slot name="icon" :checked="checked">
      <component :is="iconComponent" v-if="iconComponent"></component>
      <icon-checkbox v-else></icon-checkbox>
    </slot>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';
import IconCheckbox from './IconCheckbox.vue';

@Component({
  name: 'y-input-checkbox',
  components: { IconCheckbox },
})
export default class YCheckbox extends Vue {
  private counterId = '';

  @Prop({ type: Boolean }) private value!: boolean;

  @Prop() private id!: string;

  @Prop() private icon!: string;

  @Prop({ type: String, default: () => 'primary' })
  private color!: string;

  private get coloredClass() {
    if (this.color.startsWith('#')) {
      return undefined;
    }
    return `color--${this.color}`;
  }

  private get classes() {
    const ret: Record<string, boolean> = {
      'y-input--active': this.checked,
      'y-input--focused': this.focused,
    };
    if (this.coloredClass) {
      ret[this.coloredClass] = true;
    }
    return ret;
  }

  private get inputId() {
    let id = this.counterId;
    if (this.id) {
      id = this.id;
    }
    return `input-${id}`;
  }

  private created() {
    this.checked = this.value;
    this.counterId = this.$yeonyui.getComponentCounter().toString();
  }

  private checked = false;

  private get iconComponent() {
    if (this.icon) {
      if (this.$yeonyui.icons[this.icon]) {
        return this.$yeonyui.icons[this.icon];
      }
    }
    return null;
  }

  private focused = false;

  private onFocus(e: FocusEvent) {
    this.focused = true;
    this.$emit('focus', e);
  }

  private onBlur(e: FocusEvent) {
    this.focused = false;
    this.$emit('blur', e);
  }

  @Watch('value')
  private onChangeValue(neo: boolean) {
    this.checked = neo;
  }

  private onClick(event: MouseEvent) {
    this.$emit('click', event);
  }
}
</script>
