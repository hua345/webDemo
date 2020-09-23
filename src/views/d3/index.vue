<template>
  <div class="chart-container">
    <el-row :gutter="10">
      <el-col :sm="12" :md="12" :lg="12">
        <router-link to="/d3/line">
          <d3-line></d3-line>
        </router-link>
      </el-col>
      <el-col :sm="24" :md="12" :lg="12">
        <router-link to="/d3/force">
          <d3-force></d3-force>
        </router-link>
      </el-col>
      <el-col :sm="24" :md="12" :lg="12">
        <router-link to="/d3/forceLinks">
          <d3-force-links></d3-force-links>
        </router-link>
      </el-col>
      <el-col :sm="24" :md="12" :lg="12">
        <d3ForceDirected></d3ForceDirected>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import D3Line from "@/components/d3/d3Line";
import D3Force from "@/components/d3/d3Force";
import d3ForceLinks from "@/components/d3/d3ForceLinks";
import d3ForceDirected from "@/components/d3/d3ForceDirected";
export default {
  name: "index",
  components: { D3Line, D3Force, d3ForceLinks,d3ForceDirected },
};
</script>


<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
