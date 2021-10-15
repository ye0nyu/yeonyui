<!--
  - Created by yeonyu at 2021-09-23
  -->

<template>
  <div @click.stop="onClick" class="y-select" :class="{ ...selectClasses }">
    <div class="y-select__stack">
      <y-window v-model="isActive" :max-height="maxHeight" :offset-y="offsetY">
        <template #activator="{ on }">
          <div
            v-on="on"
            @click="onClick"
            class="y-select__display"
            role="button"
            aria-haspopup="listbox"
            aria-expanded="false"
            :aria-owns="`list-${counterId}`"
          >
            <div class="y-select__selection">
              <div v-if="!value && placeholder" class="y-select__placeholder">
                {{ placeholder }}
              </div>
              <div v-else class="y-select__selection-text">
                {{ selectedText }}
              </div>
              <input
                :id="`input-${counterId}`"
                type="text"
                aria-readonly="true"
                autocomplete="off"
                @focusin="onFocusIn"
                @focusout="onFocusOut"
                @keydown="(e) => onKeydown(e, on)"
                ref="selectFocusInput"
                :disabled="disabled"
                :readonly="readonly"
              />
            </div>
            <svg
              class="y-select__caret"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path :d="caretPath"></path>
            </svg>
          </div>
        </template>
        <div class="y-select__menu">
          <ul
            role="listbox"
            tabindex="-1"
            class="y-select__menu-list"
            ref="menuList"
            :id="`list-${counterId}`"
          >
            <li
              role="option"
              tabindex="0"
              v-for="(item, itemIndex) in items"
              :key="itemIndex"
              class="y-select__menu-list__item"
              :class="{
                'y-select__menu-list__item--active': item === selected,
              }"
              @click="selectItem(item)"
              @keydown="onListKeydown"
              ref="options"
            >
              <span>
                {{ getItemText(item) }}
              </span>
            </li>
          </ul>
        </div>
      </y-window>
      <div class="y-select__detail"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  name: 'YSelect',
  components: { VMenu },
})
export default class YSelect extends Vue {
  private created() {
    this.counterId = this.$yeonyui.getComponentCounter().toString();
    if (this.value !== undefined) {
      const found = this.items.find((item) => item === this.value);
      if (found) {
        this.selectItem(found);
      }
    }
  }

  @Prop({
    type: String,
    default: () => '',
  })
  private placeholder!: string;

  @Prop({
    type: Array,
  })
  private items!: any[];

  private selected: any = null;

  @Model('change', { type: [String, Number] })
  private value!: string;

  @Watch('value')
  onChangeValue(neo: any) {
    if (neo !== undefined) {
      const found = this.items.find((item) => item === neo);
      if (found) {
        this.selectItem(found);
      }
    }
  }

  @Prop({ type: String })
  private label!: string;

  @Prop({
    type: [String, Number],
  })
  private menuMaxHeight?: string | number;

  @Prop({ type: Boolean })
  private offsetY!: boolean;

  @Prop({ type: Boolean })
  private disabled!: boolean;

  @Prop({ type: Boolean })
  private readonly!: boolean;

  private get maxHeight() {
    return typeof this.menuMaxHeight === 'number'
      ? `${this.menuMaxHeight}px`
      : this.menuMaxHeight;
  }

  private get selectedIndex() {
    return this.items?.findIndex((item: any) => item === this.selected);
  }

  private get selectedValue() {
    let value: any;
    if (
      typeof this.selected === 'string' ||
      typeof this.selected === 'number'
    ) {
      value = this.selected;
    }

    return value;
  }

  private get selectedText() {
    let text: number | string = '';
    const { selected } = this;
    if (typeof selected === 'string' || typeof selected === 'number') {
      text = selected;
    }
    if (selected && typeof selected === 'object') {
      if (Object.prototype.hasOwnProperty.call(selected, 'text')) {
        text = selected.text || '';
      }
    }

    return text;
  }

  private getItemText(item: any): string {
    if (typeof item === 'object') {
      if ('text' in item) {
        return item.text || '';
      }
    }
    if (typeof item === 'string') {
      return item;
    }
    return '';
  }

  private counterId = '';

  private isFocused = false;

  private isActive = false;

  @Watch('isActive')
  onChangeActive(neo: boolean) {
    if (neo) {
      setTimeout(() => {
        if (this.selectedIndex > -1) {
          (this.$refs.options as HTMLElement[])[this.selectedIndex].focus();
          (this.$refs.selectFocusInput as HTMLElement).blur();
        }
      }, 200);
      // else if (!this.isFocused && this.$refs.selectFocusInput) {
      //   (this.$refs.selectFocusInput as HTMLElement).focus();
      // }
    }
  }

  private onFocusIn(e: FocusEvent) {
    this.isFocused = true;
  }

  private onFocusOut(e: FocusEvent) {
    this.isFocused = false;
  }

  private onClick(e: MouseEvent) {
    this.$emit('click', e);
  }

  private onKeydown(e: KeyboardEvent, on: any) {
    const { code } = e;
    switch (code) {
      case 'Space':
      case 'Enter': {
        this.isActive = true;
        break;
      }
      case 'Escape': {
        this.isActive = false;
        break;
      }
      case 'Tab': {
        this.isActive = false;
        break;
      }
      case 'ArrowDown': {
        e.stopPropagation();
        this.selectSiblingItem(1);
        break;
      }
      case 'ArrowUp': {
        e.stopPropagation();
        this.selectSiblingItem(-1);
        break;
      }
      default:
    }
  }

  private selectSiblingItem(direction: 1 | -1) {
    const aspectIndex = this.selectedIndex + direction;
    if (aspectIndex >= this.items.length || aspectIndex < 0) {
      return;
    }
    if (this.isActive && this.selectedIndex < 0) {
      (this.$refs.options as HTMLElement[])[0].focus();
    } else {
      this.selectItem(this.items[this.selectedIndex + direction]);
    }
  }

  private get selectClasses() {
    return {
      'y-select--focused': this.isFocused,
      'y-select--active': this.isActive,
      'y-select--no-label': !this.$slots.label && !this.label,
      'y-select--disabled': this.disabled,
      'y-select--readonly': this.readonly,
    };
  }

  private selectItem(item: any) {
    this.selected = item;
    if (!this.isFocused && this.$refs.selectFocusInput) {
      (this.$refs.selectFocusInput as HTMLElement).focus();
    }
  }

  private get caretPath() {
    if (this.isActive) {
      return 'M7,15L12,10L17,15H7Z';
    }
    return 'M7,10L12,15L17,10H7Z';
  }

  private onListKeydown(e: KeyboardEvent) {
    // console.log(document.activeElement)
    const { code } = e;
    switch (code) {
      case 'ArrowDown':
      case 'ArrowUp': {
        e.stopPropagation();
        e.preventDefault();
        const direction = code === 'ArrowUp' ? -1 : 1;
        const $options = this.$refs.options as HTMLElement[];
        const index = $options.findIndex(
          ($option) => document.activeElement === $option,
        );
        const aspectIndex = index + direction;
        if (aspectIndex < 0) {
          $options[$options.length - 1].focus();
        } else if (aspectIndex >= $options.length) {
          $options[0].focus();
        } else {
          $options[aspectIndex].focus();
        }
        break;
      }
      case 'Space':
      case 'Enter': {
        const $options = this.$refs.options as HTMLElement[];
        const index = $options.findIndex(
          ($option) => document.activeElement === $option,
        );
        if (index > -1) {
          this.selectItem(this.items[index]);
          this.isActive = false;
        }
        break;
      }
      case 'Tab': {
        this.isActive = false;
        break;
      }
      default:
        break;
    }
  }
}
</script>

<style lang="scss" scoped></style>
