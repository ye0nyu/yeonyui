<!--
  - Created by yeonyu at 2021-09-23
  -->

<template>
  <div
    class="y-switch"
    :class="classes"
  >
    <div class="y-switch__slot">
      <div class="y-switch__input" @click="onClick">
        <input
          :id="inputId"
          :aria-checked="innerValue"
          type="checkbox"
          role="switch"
          :value="innerValue"
          @focus="onFocus"
          @blur="onBlur"
          :disabled="disabled"
        />
        <div class="y-switch__track">
          <div v-if="stateLabel" class="y-switch__state">
              <span
                class="y-switch__state-label y-switch__state-label--on"
              >
                ON
              </span>
            <span
              class="y-switch__state-label y-switch__state-label--off"
            >
                OFF
              </span>
          </div>
        </div>
        <div class="y-switch__thumb">
          <div v-if="loading" class="y-switch__spinner"></div>
        </div>
      </div>
      <label :for="inputId" class="y-switch__label">
        <slot name="label"></slot>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Model, Prop, Vue, Watch,
} from 'vue-property-decorator';

@Component({
  name: 'YSwitch',
})
export default class YSwitch extends Vue {
  private created() {
    this.counterId = this.$yeonyui.getComponentCounter().toString();
    this.innerValue = this.value;
  }

  @Model('change', { type: Boolean })
  private value!: boolean;

  private innerValue = false;

  @Watch('value')
  private onChangeValue(neo: boolean) {
    this.innerValue = neo;
  }

  private counterId = '';

  private get inputId() {
    const id = this.counterId;
    return `input-${id}`;
  }

  @Prop({ type: Boolean })
  private loading!: boolean;

  @Prop({ type: Boolean })
  private disabled!: boolean;

  @Prop({ type: Boolean })
  private stickOut!: boolean;

  @Prop({ type: Boolean })
  private stateLabel!: boolean;

  private focused = false;

  private get classes() {
    return {
      'y-switch--disabled': this.disabled,
      'y-switch--loading': this.loading,
      'y-switch--active': this.innerValue,
      'y-switch--stick-out': this.stickOut,
      'y-switch--focused': this.focused,
    };
  }

  private onClick() {
    if (this.disabled || this.loading) return;
    const changeValue = !this.innerValue;
    this.$emit('change', changeValue);
    this.innerValue = changeValue;
  }

  private onFocus() {
    this.focused = true;
  }

  private onBlur() {
    this.focused = false;
  }
}
</script>

<style lang="scss" scoped>
.y-switch {
  &__slot {
    display: flex;
    cursor: pointer;
    align-items: center;
    color: inherit;
    min-height: inherit;
    position: relative;
  }

  &__input {
    width: 64px;
    height: 32px;
    position: relative;
    display: inline-flex;
    user-select: none;
    color: inherit;
    flex: 0 0 auto;

    input[role='switch'] {
      position: absolute;
      opacity: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      user-select: none;
    }
  }
  &:not(&--loading) &__input:active &__thumb {
    width: 24px;
  }

  &__track {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    background-color: #a0a0a0;
    position: absolute;
    left: 0;
    top: 0;
    transition: 300ms;
  }

  &__thumb {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    pointer-events: none;
    position: relative;
    top: calc(50% - 13px);
    left: 3px;
    transition: 180ms cubic-bezier(0.78, 0.04, 0.9, 0.18);
  }

  &__spinner {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: rotate 2s linear infinite;
    contain: paint;

    @keyframes spinner-blur {
      0% {
        filter: blur(4px);
      }
      50% {
        filter: blur(1px);
      }
      100% {
        filter: blur(4px);
      }
    }

    &:before {
      content: "";
      position: absolute;
      top: 2px;
      left: 2px;
      right: 2px;
      bottom: 2px;
      border-radius: 50%;
      border-width: 2px 2px 0 0;
      border-style: solid;
      border-color: $primary transparent;
    }

    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(0deg, transparent 60%, rgba($primary, 0.4));
      filter: blur(4px);
      animation: spinner-blur 3s infinite;
    }
  }

  &:hover:not(&--disabled) {
    .y-switch__thumb {
      background: map-get($light-theme, 'hover-bg');
    }
  }

  &--active {
    .y-switch__track {
      background-color: $primary;
    }

    .y-switch__thumb {
      transform: translateX(32px);
    }
  }
  &--active:not(&--loading):active &__thumb {
    left: 5px;
  }

  &--focused {
    .y-switch__thumb:before {
      content: "";
      position: absolute;
      top: 2px;
      bottom: 2px;
      left: 2px;
      right: 2px;
      border-radius: 50%;
      background-color: rgba($primary, 0.4);
    }
  }

  &--stick-out {
    .y-switch__thumb {
      box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.32);
    }

    .y-switch__track {
      width: 90%;
      height: 80%;
      left: 5%;
      top: 12%;
      box-shadow: inset 0 0 4px 0 rgba(0, 0, 0, 0.4);
    }
  }

  &--disabled {
    opacity: 0.8;
    filter: brightness(0.88);

    .y-switch__thumb {
      opacity: 0.4;
    }
  }
  &--disabled &__slot,
  &--disabled &__input input {
    cursor: default;
  }

  &__state {
    position: relative;
    width: 100%;
    height: 100%;
    contain: content;
  }

  &__state-label {
    font-size: 12px;
    color: #ffffff;
    position: absolute;
    height: 100%;
    display: flex;
    align-items: center;
    transition: transform 180ms cubic-bezier(0.78, 0.04, 0.9, 0.18);

    &--on {
      left: -40px;
    }
    &--off {
      right: 10px;
    }
  }

  &--active &__state-label {
    transform: translateX(50px);
  }

  &--stick-out &__state-label--off {
    right: 7px;
  }
}
</style>
