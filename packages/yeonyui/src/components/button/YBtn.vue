<!--
  - Created by yeonyu at 2021-09-23
  -->

<template>
  <button
    class="y-btn"
    :class="btnClasses"
    @click="onClick"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @focus="onFocus"
    @blur="onBlur"
    @keydown="onKeydown"
    @keyup="onKeyup"
    :disabled="disabled"
    :style="{
      color: color,
    }"
  >
    <span class="y-btn__content">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'YBtn',
})
export default class YBtn extends Vue {
  // Shape
  @Prop({ type: Boolean })
  private icon!: boolean;

  @Prop({ type: Boolean })
  private small!: boolean;

  @Prop({ type: Boolean })
  private large!: boolean;

  @Prop({ type: Boolean })
  private outlined!: boolean;

  @Prop({ type: Boolean })
  private disabled!: boolean;

  @Prop({ type: String })
  private color!: string;

  @Prop({ type: Boolean })
  private alwaysOn!: boolean;

  @Prop({ type: Boolean })
  private rounded!: boolean;

  private aniShow = (el: HTMLElement | null) => {
    if (!el) return;
    const animation = document.createElement('span');
    animation.className = 'y-btn__animation';
    el.appendChild(animation);
    animation.dataset.activated = String(performance.now());
  };

  private aniHide = (el: HTMLElement | null) => {
    if (!el) {
      return;
    }
    const animations = el.getElementsByClassName('y-btn__animation');
    if (animations.length === 0) return;
    const animation = animations[animations.length - 1] as HTMLElement;
    if (animation.dataset.isHiding) return;
    animation.dataset.isHiding = 'true';
    const diff = performance.now() - Number(animation.dataset.activated);
    const delay = Math.max(250 - diff, 0);
    setTimeout(() => {
      if (animation) {
        el.removeChild(animation);
      }
    }, delay + 300);
  };

  private isKeydownAni = false;

  private onClick(e: MouseEvent) {
    this.$emit('click', e);
  }

  private onMouseenter(e: MouseEvent) {
    this.$emit('mouseenter', e);
  }

  private onMouseDown(e: MouseEvent) {
    this.aniShow(this.$el as HTMLElement);
    this.$emit('mousedown', e);
  }

  private onMouseUp(e: MouseEvent) {
    this.aniHide(this.$el as HTMLElement);
    this.$emit('mouseup', e);
  }

  private onMouseleave(e: MouseEvent) {
    this.aniHide(this.$el as HTMLElement);
    this.$emit('mouseleave', e);
  }

  private onFocus(e: FocusEvent) {
    this.$emit('focus', e);
  }

  private onBlur(e: FocusEvent) {
    this.$emit('blur', e);
  }

  private onKeydown(e: KeyboardEvent) {
    const keyCode = e.code;
    if (!this.isKeydownAni && (keyCode === 'Space' || keyCode === 'Enter')) {
      this.isKeydownAni = true;
      this.aniShow(this.$el as HTMLElement);
    }
    this.$emit('keydown', e);
  }

  private onKeyup(e: KeyboardEvent) {
    this.isKeydownAni = false;
    this.aniHide(this.$el as HTMLElement);
    this.$emit('keyup', e);
  }

  private get btnClasses() {
    return {
      'y-btn--icon': this.icon,
      'y-btn--always-on': this.alwaysOn,
      'y-btn--small': this.small,
      'y-btn--outlined': this.outlined,
      'y-btn--large': this.large,
      'y-btn--rounded': this.rounded,
    };
  }
}
</script>

<style scoped></style>
