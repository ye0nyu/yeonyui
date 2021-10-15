<!--
  - Created by yeonyu at 2021-09-23
  -->

<template>
  <div
    class="y-progress-bar"
    :class="classes"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="numValue"
    :style="{
      height: height !== undefined ? `${height}px` : undefined,
      background,
    }"
  >
    <div class="y-progress-bar__lead" :style="styles">
      <slot name="lead-inner">
        <div
          class="y-progress-bar__lead-inner"
          :class="{ 'y-progress-bar__lead-inner--fixed': numValue < 3 }"
          v-if="innerText"
          :style="{ color: textColor }"
        >
          <span>{{ numValue }} %</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Watch,
} from 'vue-property-decorator';
import YProgressMixin from '@/components/yeonyui/progress/y-progress.mixin';

@Component({
  name: 'YProgressBar',
})
export default class YProgressBar extends YProgressMixin {
  @Prop({ type: String })
  private background!: string;

  @Prop({ type: Number })
  private height?: number;

  @Prop({ type: Boolean })
  private noRewindTransition!: boolean;

  @Prop({ type: Boolean })
  private rounded!: boolean;

  @Prop({ type: Boolean })
  private outlined!: boolean;

  @Prop({ type: Boolean })
  private innerText!: boolean;

  @Prop({ type: String })
  private textColor!: string;

  private delta = 0;

  private get styles() {
    let minWidth;
    if (this.innerText && this.numValue < 5 && this.numValue > 0) {
      minWidth = '2rem';
    }
    return {
      width: `${this.numValue}%`,
      minWidth,
    };
  }

  private get classes() {
    let noTransition = false;
    if (this.noRewindTransition && this.delta < 0) {
      noTransition = true;
    }
    return {
      'y-progress-bar--no-trans': noTransition,
      'y-progress-bar--rounded': this.rounded,
      'y-progress-bar--outlined': this.outlined,
    };
  }

  @Watch('numValue')
  private onChangeNumValue(neo: number, old: number): void {
    this.delta = neo - old;
  }
}
</script>

<style lang="scss">
.y-progress-bar {
  height: 4px;
  display: flex;
  contain: content;
  background: #e9ecef;
  border-radius: 0.25rem;

  &--rounded {
    border-radius: 15px;
    .y-progress-bar__lead {
      border-radius: inherit;
    }
  }

  &--outlined {
    border: 2px solid $primary;
    background: transparent;
    padding: 1px;
    .y-progress-bar__lead {
      box-shadow: none;
    }
  }
}

.y-progress-bar__lead {
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 2rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.38);
  background: $primary;
  transition: 0.2s cubic-bezier(0.4, 0, 0.6, 1);
  height: 100%;
  position: relative;
}

.y-progress-bar--no-trans .y-progress-bar__lead {
  transition: none;
}

.y-progress-bar__lead-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  text-shadow: -1px 0 #fff, 0 1px #fff, 1px 0 #fff, 0 -1px #fff;

  &--fixed {
    position: absolute;
    width: 2rem;
  }
}
</style>
