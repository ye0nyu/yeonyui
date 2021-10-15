<!--
  - Created by yeonyu at 2021-09-28
  -->

<template>
  <component
    :is="fieldset ? 'fieldset' : 'div'"
    class="y-radio-set y-fieldset"
    :aria-labelledby="inputId"
    role="radioset"
  >
    <legend v-if="legend || $slots.legend" class="y-radio-set__legend">
      <slot name="legend">
        {{ legend }}
      </slot>
    </legend>
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator';
import YRadio from '@/components/yeonyui/radio/YRadio.vue';

@Component({
  name: 'YRadioSet',
  provide() {
    return {
      radioSet: this,
    };
  },
})
export default class YRadioSet extends Vue {
  private created() {
    this.counterId = this.$yeonyui.getComponentCounter().toString();
    if (this.value) {
      this.innerValue = this.value;
    }
  }

  private counterId = '';

  private items: YRadio[] = [];

  public get inputId() {
    const id = this.counterId;
    return `input-${id}`;
  }

  public register(radioItem: YRadio) {
    const index = this.items.push(radioItem) - 1;
    radioItem.$on('change', () => {
      this.changeValue(radioItem.value);
    });
    this.updateItem(radioItem);
  }

  public unregister(radioItem: YRadio) {
    const index = this.items.indexOf(radioItem);
    this.items.splice(index, 1);
  }

  @Prop({ type: String })
  private name!: string;

  @Model('change')
  private value!: string;

  @Prop({ type: String })
  private legend!: string;

  @Prop({ type: Boolean })
  private fieldset!: boolean;

  @Prop({ type: Boolean })
  private readonly!: boolean;

  private innerValue: string = '';

  private changeValue(value: string) {
    this.innerValue = value;
  }

  private get checkedItem() {
    if (this.innerValue) {
      return this.items.find((item) => {
        return item.value === this.innerValue;
      })
    }
    return undefined;
  }

  private get checkedInputId() {
    if (this.checkedItem) {
      return this.checkedItem.inputId;
    }
    return '';
  }

  @Watch('innerValue')
  private onChangeInnerValue(neo: string) {
    this.$emit('change', neo);
  }

  @Watch('value')
  private onChangeOuterValue(neo: string) {
    this.innerValue = this.value;
  }

  @Watch('checkedItem')
  onChangeCheckedItem(neo: YRadio | undefined, old: YRadio | undefined) {
    this.$nextTick(() => {
      if (old) {
        this.updateItem(old);
      }
      if (neo) {
        this.updateItem(neo);
      }
    });
  }

  private updateItem(item: YRadio) {
    item.innerValue = item.inputId === this.checkedInputId;
  }
}
</script>

<style lang="scss" scoped></style>
