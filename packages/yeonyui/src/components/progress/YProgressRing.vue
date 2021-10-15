<!--
  - Created by yeonyu at 2021-10-15
  -->

<template>
  <div
    class="y-progress-ring"
    :class="classes"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="numValue"
    :style="styles"
  >
    <div class="y-progress-ring__container">
      <slot v-if="loading" name="spinner">
        <y-ring-spinner></y-ring-spinner>
      </slot>
      <slot v-else>
        <svg
          class="y-progress-ring__graph"
          :viewBox="`0 0 ${safeSize} ${safeSize}`"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            class="y-progress-ring__graph-track"
            :cx="safeSize / 2"
            :cy="safeSize / 2"
            :r="radius"
            :stroke-width="safeWidth"
          />
          <circle
            class="y-progress-ring__graph-lead"
            :cx="safeSize / 2"
            :cy="safeSize / 2"
            :r="radius"
            stroke-dasharray="113.097"
            stroke-dashoffset="113.097"
            :stroke-width="safeWidth"
          />
        </svg>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import YProgressMixin from '@/components/yeonyui/progress/y-progress.mixin';
import YRingSpinner from '@/components/yeonyui/spinner/YRingSpinner.vue';

@Component({
  name: 'YProgressRing',
  components: { YRingSpinner },
})
export default class YProgressRing extends YProgressMixin {
  @Prop({ type: [Number, String], default: 48 })
  private size!: number | string;

  @Prop({ type: [Number, String], default: 4 })
  private width!: number | string;

  @Prop({ type: [Number, string], default: 2 })
  private padding!: number | string;

  private getSafeNumber(val: number | string) {
    if (typeof val === 'string') {
      return Number(val);
    }
    return val;
  }

  private get safeSize() {
    return this.getSafeNumber(this.size);
  }

  private get safeWidth() {
    return this.getSafeNumber(this.width);
  }

  private get safePadding() {
    return this.getSafeNumber(this.padding);
  }

  private get radius() {
    return this.safeSize / 2 - this.safeWidth - this.safePadding;
  }

  private get classes() {
    return {};
  }

  private get styles() {
    return {};
  }
}
</script>

<style lang="scss" scoped></style>
