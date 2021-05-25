<template>
  <div class="warpper">
    <div class="background flex color-bar">
      <div class="color-1"></div>
      <div class="color-2"></div>
      <div class="color-3"></div>
      <div class="color-4"></div>
      <div class="color-5"></div>
      <div class="color-6"></div>
      <div class="color-7"></div>
      <div class="color-8"></div>
      <div class="color-9"></div>
      <div class="color-10"></div>
    </div>
    <div class="content">
      <div class="unit-btn">
        正常模式
        <button
          :class="{'unit-btn-switch-checked': checked}"
          type="button"
          class="unit-btn-switch"
          @click="switchChange"
        />暗黑模式
      </div>
      <Sketch v-model="colors" @input="updateValue" />
    </div>
  </div>
</template>

<script>
import { updateTheme } from '@/utils/setting'
import { Sketch } from 'vue-color'

export default {
  name: 'SketchWarpper',
  components: { Sketch },
  data() {
    return {
      theme: 'default',
      checked: false,
      colors: '',
      modifyVarsObj: {}
    }
  },
  created() {
    this.colors = window.localStorage.getItem('themeColor') || ''
    const curTheme = window.localStorage.getItem('curTheme')
    this.checked = curTheme === 'dark'
    this.theme = curTheme
  },
  methods: {
    switchChange() {
      this.checked = !this.checked
      this.theme = this.checked ? 'dark' : 'default'
      updateTheme(this.theme)
    },
    updateValue(e) {
      const color = e.hex
      window.localStorage.setItem('themeColor', color)
      updateTheme(this.theme)
    }
  }
}
</script>
<style lang="less" scoped>
.warpper {
  display: flex;
}
</style>
