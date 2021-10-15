<!--
  - Created by yeonyu at 2021-09-23
  -->

<template>
  <div class="y-checkbox" :class="classes">
    <slot name="prepend"></slot>
    <div class="y-checkbox__slot">
      <y-input-checkbox
        @click.stop="onClick"
        :id="counterId"
        :value="innerValue"
        :icon="computedIcon"
        @focus="onFocus"
        @blur="onBlur"
        :color="color"
        :disabled="disabled"
        :readonly="readonly"
      >
        <template v-if="$slots.icon" #icon="{ checked }">
          <slot name="icon" :checked="checked"></slot>
        </template>
      </y-input-checkbox>
      <label @click.stop="" class="y-checkbox__label" :for="inputId">
        <slot name="label">{{ label }}</slot>
      </label>
    </div>
    <slot name="append"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator';
import YInputCheckbox from './YInputCheckbox.vue';

@Component({
  name: 'y-checkbox',
  components: { YInputCheckbox },
})
export default class YCheckbox extends Vue {
  private created() {
    this.counterId = this.$yeonyui.getComponentCounter().toString();
    this.innerValue = this.inputValue;
  }

  @Model('change', { type: Boolean })
  private readonly inputValue!: boolean;

  @Prop({ type: String }) private label!: string;

  @Prop({ type: Boolean }) private reverse!: boolean;

  @Prop({ type: [Object, String] })
  private icon!: { checked?: string; unchecked?: string } | string;

  @Prop({ type: String, default: () => 'primary' })
  private color!: string;

  @Prop({ type: Boolean })
  private disabled!: boolean;

  @Prop({ type: Boolean })
  private readonly!: boolean;

  private get classes() {
    const { reverse, focused, disabled, readonly } = this;
    return {
      'y-checkbox--reverse': reverse,
      'y-checkbox--focused': focused,
      'y-checkbox--disabled': disabled,
      'y-checkbox--readonly': readonly,
    };
  }

  private get computedIcon() {
    if (typeof this.icon === 'string') {
      return this.icon;
    }
    return undefined;
  }

  private counterId = '';

  private get inputId() {
    const id = this.counterId;
    return `input-${id}`;
  }

  private innerValue = false;

  private focused = false;

  private onFocus(e: FocusEvent) {
    this.focused = true;
    this.$emit('focus', e);
  }

  private onBlur(e: FocusEvent) {
    this.focused = false;
    this.$emit('blur', e);
  }

  private onClick(e: MouseEvent) {
    this.innerValue = !this.innerValue;
    this.$emit('change', this.innerValue, e);
  }

  @Watch('inputValue')
  onChangeInputValue(neo: boolean): void {
    this.innerValue = neo;
  }
}
</script>
