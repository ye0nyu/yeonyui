<!--
  - Created by yeonyu at 2021-09-27
  -->

<template>
  <svg
    class="icon-radio"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
  >
    <circle
      class="icon-radio__outline"
      cx="12"
      cy="12"
      r="11"
      stroke-width="2"
      stroke="currentColor"
    />
    <circle
      class="icon-radio__bead"
      cx="12"
      cy="12"
      r="6"
    />
  </svg>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'IconRadio',
})
export default class IconRadio extends Vue {

}
</script>

<style lang="scss" scoped>

</style>
