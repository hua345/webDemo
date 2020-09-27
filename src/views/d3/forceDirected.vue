<template>
  <div class="chart-container">
    <d3ForceDirected height="100%" width="100%" />
  </div>
</template>

<script>
import d3ForceDirected from '@/components/d3/d3ForceDirected'

export default {
  name: 'forceDirected',
  components: { d3ForceDirected }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

