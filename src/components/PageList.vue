<template>
  <div class="unit-page">
    <div :class="{'unit-page-list-loading': shadow}" class="unit-page-list">
      <div class="unit-page-list-figure"></div>
      <div class="unit-page-list-warpper">
        <div class="unit-page-list-warpper-title">
          <span v-if="!shadow">这里是标题</span>
        </div>
        <div class="unit-page-list-warpper-li">
          <span v-if="!shadow">
            这里是
            <span class="unit-page-list-link">一大段文字</span>
            一大段文字一大段文字
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageList',
  props: {
    shadow: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="less" scoped>
.unit-page {
  width: 240px;

  &-list {
    &-loading {
      position: relative;
      &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        z-index: 1;
        top: 0;
        animation: 1s loading ease-in-out infinite;
      }
    }
    &-figure {
      width: 100%;
      height: 140px;
    }
    &-warpper {
      padding: 16px 24px;
      &-title {
        width: 100%;
        height: 20px;
        font-size: 16px;
        margin-bottom: 10px;
        border-radius: 2px;
      }

      &-li {
        width: 100%;
        height: 40px;
        font-size: 12px;
        border-radius: 2px;
      }
    }
  }
}
@keyframes loading {
  to {
    background-position-x: -20%;
  }
}
</style>
