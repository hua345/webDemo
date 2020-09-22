<template>
  <div id="d3-line" />
</template>

<script>
import * as d3 from "d3";
const points = [
  [0, 80],
  [100, 100],
  [200, 30],
  [300, 50],
  [400, 40],
  [500, 80],
];
export default {
  name: "d3Shape",
  mounted() {
    var context = d3.select(this.$el).append("canvas").node().getContext("2d");
    var lineGenerator = d3.line();
    lineGenerator.context(context);

    context.strokeStyle = "#999";
    context.beginPath();
    lineGenerator(points);
    context.stroke();
  },
};
</script>
<style lang="sass">
#d3-line
  margin: 25px
  path
    fill: none
    stroke: #76BF8A
    stroke-width: 3px
</style>
