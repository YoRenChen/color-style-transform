<template>
  <div id="app" class="unit-layout warpper">
    <div class="unit-menu unit-menu-dark">
      <div class="unit-menu-logo">这里是logo</div>
      <div class="unit-menu-item">明天的中午</div>
      <div class="unit-menu-item unit-menu-item-action">午饭到底吃啥</div>
      <div class="unit-menu-item">牛肉炒饭</div>
      <div class="unit-menu-item">筒骨拉面</div>
    </div>
    <div class="unit-layout">
      <Header />
      <div class="list">
        <PageList :shadow="true" />
        <PageList :shadow="true" />
        <PageList />
      </div>
      <SketchWarpper />
    </div>
  </div>
</template>

<script>
import PageList from '@/components/PageList.vue'
import SketchWarpper from '@/components/SketchWarpper.vue'
import Header from '@/components/Header.vue'
export default {
  name: 'App',
  components: { SketchWarpper, PageList, Header }
}
</script>
