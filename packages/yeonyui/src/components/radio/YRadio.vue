<!--
  - Created by yeonyu at 2021-09-27
  -->

<template>
  <div class="y-radio" :class="{ 'y-radio--focused': focused }">
    <slot name="prepend"></slot>
    <div class="y-radio__slot">
      <div
        @click="onClick"
        class="y-input y-input--radio"
        :class="inputClasses"
      >
        <input
          :id="inputId"
          type="radio"
          role="radio"
          :aria-checked="innerValue"
          :name="inputName"
          @change="onChangeInput"
          :checked="innerValue"
          @focus="onFocus"
          @blur="onBlur"
          :disabled="disabled"
        />
        <slot name="icon" :value="innerValue">
          <component :is="iconComponent" v-if="iconComponent"></component>
          <icon-radio v-else></icon-radio>
        </slot>
      </div>
      <label @click.stop="" class="y-radio__label" :for="inputId">
        <slot name="label">{{ label }}</slot>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Inject, Model, Prop, Vue,
} from 'vue-property-decorator';
import IconRadio from '@/components/yeonyui/radio/IconRadio.vue';
import YRadioSet from '@/components/yeonyui/radio/YRadioSet.vue';

@Component({
  name: 'YRadio',
  components: { IconRadio },
})
export default class YRadio extends Vue {
  private created() {
    this.counterId = this.$yeonyui.getComponentCounter().toString();
    if (this.radioSet) {
      this.radioSet.register(this);
    }
  }

  private beforeDestroy() {
    if (this.radioSet) {
      this.radioSet.unregister(this);
    }
  }

  @Inject()
  private readonly radioSet!: YRadioSet | null;

  @Prop({ type: String }) private label!: string;

  @Prop({ type: String }) public value!: string;

  @Prop({ type: [Object, String] })
  private icon!: { checked?: string; unchecked?: string } | string;

  @Prop({ type: String, default: () => 'primary' })
  private color!: string;

  @Prop({ type: Boolean })
  private disabled!: boolean;

  private get coloredClass() {
    if (this.color.startsWith('#')) {
      return undefined;
    }
    return `color--${this.color}`;
  }

  private get inputClasses() {
    const ret: Record<string, any> = {
      'y-input--active': this.innerValue,
      'y-input--focused': this.focused,
    };
    if (this.coloredClass) {
      ret[this.coloredClass] = true;
    }
    return ret;
  }

  private get computedIcon() {
    if (typeof this.icon === 'string') {
      return this.icon;
    }
    return undefined;
  }

  private get iconComponent() {
    const icon = this.computedIcon;
    if (icon) {
      if (this.$yeonyui.icons[icon]) {
        return this.$yeonyui.icons[icon];
      }
    }
    return null;
  }

  private counterId = '';

  public get inputId() {
    const id = this.counterId;
    const { radioSet } = this;

    if (radioSet) {
      return `radio-${radioSet.inputId}__${id}`;
    }
    return `input-${id}`;
  }

  private get inputName() {
    const { radioSet } = this;
    if (radioSet) {
      return radioSet.inputId;
    }
    return this.inputId;
  }

  public innerValue = false;

  private onClick(event: MouseEvent) {
    this.$emit('change', event);
  }

  private onChangeInput(event: Event) {
    this.$emit('change', event);
  }

  private focused = false;

  private onFocus() {
    this.focused = true;
  }

  private onBlur() {
    this.focused = false;
  }
}
</script>

<style lang="scss" scoped></style>
