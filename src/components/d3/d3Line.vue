<template>
  <div id="d3-line" />
</template>

<script>
import * as d3 from "d3";
const data = [99, 71, 78, 25, 36, 92];
const points = [
  [0, 80],
  [100, 100],
  [200, 30],
  [300, 50],
  [400, 40],
  [500, 80],
];
export default {
  name: "NonVueLineChart",
  mounted() {
    const svg = d3
      .select(this.$el)
      .append("svg")
      .attr("width", 500)
      .attr("height", 270)
      .append("g")
      .attr("transform", "translate(0, 10)");

    // 折线
    const x = d3.scaleLinear().range([0, 430]);
    const y = d3.scaleLinear().range([210, 0]);
    d3.axisLeft().scale(x);
    d3.axisTop().scale(y);
    x.domain(d3.extent(data, (d, i) => i));
    y.domain([0, d3.max(data, (d) => d)]);
    const createPath = d3
      .line()
      .x((d, i) => x(i))
      .y((d) => y(d));
    console.log(createPath);
    svg.append("path").attr("d", createPath(data));
    // 曲线
    var lineGenerator = d3.line().curve(d3.curveCardinal);
    var pathData = lineGenerator(points);
    console.log(pathData);

    svg.append("path").attr("d", pathData);
    // canvas线
    var context = d3.select(this.$el).append("canvas").node().getContext("2d");
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
