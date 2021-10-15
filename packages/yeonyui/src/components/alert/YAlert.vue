<!--
  - Created by yeonyu at 2021-09-23
  -->

<template>
  <div
    class="y-alert"
    role="alert"
    :class="classes"
  >
    <div
      class="y-alert__container"
    >
      <div class="y-alert__prepend">
        <slot name="prepend">
          <alert-outline-svg v-if="defaultIcon"></alert-outline-svg>
        </slot>
      </div>
      <div class="y-alert__content">
        <div v-if="$slots.action" class="y-alert__text">
          <slot></slot>
        </div>
        <slot v-else></slot>
        <div class="y-alert__action" v-if="$slots.action">
          <slot name="action"></slot>
        </div>
      </div>
      <div class="y-alert__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertOutlineSvg from '@/assets/svg/alert-outline.svg';

@Component({
  name: 'YAlert',
  components: {
    AlertOutlineSvg,
  },
})
export default class YAlert extends Vue {
  @Prop({ type: String })
  private type!: 'warning' | 'error' | 'info';

  @Prop({ type: Boolean })
  private dense!: boolean;

  @Prop({ type: Boolean })
  private appendAction!: boolean;

  @Prop({ type: Boolean })
  private hideDefaultIcon!: boolean;

  private get realType() {
    if (['warning'].includes(this.type)) {
      return this.type;
    }
    return undefined;
  }

  private get classes() {
    return {
      'y-alert--error': this.type === 'error',
      'y-alert--warning': this.type === 'warning',
      'y-alert--info': this.type === 'info',
      'y-alert--dense': this.dense,
      'y-alert--has-action': this.$slots.action,
    };
  }

  private get defaultIcon() {
    if (this.hideDefaultIcon) return false;
    return this.type === 'error' || this.type === 'warning';
  }
}
</script>
