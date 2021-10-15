<!--
  - Created by yeonyu at 2021-09-23
  -->

<template>
  <div class="y-text-input" :class="classes">
    <div v-if="$slots" class="y-text-input__prepend-outer">
      <slot name="prepend-outer"></slot>
    </div>
    <div class="y-text-input__stack">
      <div class="y-text-input__display">
        <div class="y-text-input__display-styler"></div>
        <div
          v-if="$slots.prepend"
          class="y-text-input__prepend"
          @click.stop="onClickPrepend"
        >
          <slot name="prepend"></slot>
        </div>
        <div class="y-text-input__field">
          <label
            v-if="showLabel"
            :for="inputId"
            class="y-text-input__label"
            :class="{ 'y-text-input__label--floated': isFloatedLabel }"
            style="position: absolute"
          >
            <slot name="label">
              <template v-if="label">
                {{ label }}
              </template>
              <template v-else-if="placeholder && !inValue">
                {{ placeholder }}
              </template>
            </slot>
          </label>
          <input
            :value="inValue"
            @change="onChange"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
            :id="inputId"
            :type="type"
            :disabled="disabled"
            ref="input"
            :placeholder="placeholder"
            :maxlength="$attrs.maxlength"
          />
        </div>
        <div class="y-text-input__append">
          <slot name="append"></slot>
        </div>
      </div>
      <div class="y-text-input__helper-text">
        <slot name="helper-text"></slot>
      </div>
    </div>
    <div class="y-text-input__append-outer">
      <slot name="append-outer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'YTextInput',
})
export default class YTextInput extends Vue {
  private created() {
    this.counterId = this.$yeonyui.getComponentCounter().toString();
  }

  private counterId = '';

  private get inputId() {
    const id = this.counterId;
    return `input-${id}`;
  }

  @Model('input', { type: [String, Number] })
  private value!: string | number;

  @Prop({
    type: String,
    default: () => 'text',
  })
  private type!: 'text' | 'number' | 'password';

  @Prop({ type: Boolean })
  private disabled!: boolean;

  @Prop({ type: String })
  private label!: string;

  @Prop({ type: Boolean })
  private floated!: boolean;

  @Prop({ type: String })
  private placeholder!: string;

  @Prop({ type: Boolean })
  private filled!: boolean;

  private isFocused = false;

  private inValue = '';

  private blurTimer = -1;

  private get modelValue() {
    if (this.type === 'number') {
      return Number(this.inValue);
    }
    return this.inValue;
  }

  private get classes() {
    return {
      'y-text-input--content': this.inValue,
      'y-text-input--focused': this.isFocused,
      'y-text-input--filled': this.filled,
      'color--primary': this.isFocused,
    };
  }

  private get showLabel() {
    return this.label || this.$slots.label;
  }

  private get isFloatedLabel() {
    return (
      this.floated ||
      this.placeholder ||
      (!this.placeholder && this.isFocused) ||
      this.inValue
    );
  }

  private onChange(e: InputEvent) {
    this.$emit('change', this.modelValue, e);
  }

  private onInput(e: InputEvent) {
    if (e) {
      this.inValue = (e.target as HTMLInputElement).value;
      this.$emit('input', this.modelValue, e);
    }
  }

  private onFocus(e: FocusEvent) {
    this.isFocused = true;
    this.$emit('focus', e);
  }

  private onBlur(e: FocusEvent) {
    this.blurTimer = window.setTimeout(() => {
      this.isFocused = false;
      this.blurTimer = -1;
    }, 100);

    this.$emit('blur', e);
  }

  private focusFromInner() {
    (this.$refs.input as HTMLInputElement).focus();
  }

  private onClickPrepend(e: MouseEvent) {
    window.clearTimeout(this.blurTimer);
    this.blurTimer = -1;
    this.focusFromInner();
  }
}
</script>

<style lang="scss" scoped></style>
