<!--
  - Created by yeonyu at 2021-10-15
  -->

<template>
  <svg class="mdc-circular-progress__determinate-circle-graphic" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <circle class="mdc-circular-progress__determinate-track" cx="24" cy="24" r="18" stroke-width="4"/>
  </svg>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'YRingSpinner'
})
export default class YRingSpinner extends Vue {

}
</script>

<style lang="scss" scoped>

</style>
