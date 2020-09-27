<template>
  <div id="d3-line" />
</template>

<script>
// https://observablehq.com/@d3/force-directed-graph
import * as d3 from "d3";
import { forceDirectedData } from "@/api/d3data";
const height = 600;
const width = height;

export default {
  name: "D3ForceDirected",
  mounted() {
    forceDirectedData().then((response) => {
      this.data = response.data;
      this.init();
    });
  },
  methods: {
    init() {
      const links = this.data.links.map((d) => Object.create(d));
      const nodes = this.data.nodes.map((d) => Object.create(d));
      const scale = d3.scaleOrdinal(d3.schemeCategory10);
      const color = (d) => {
        scale(d.index);
        console.log(d);
        console.log(scale(d.index));
      };
      const simulation = d3
        .forceSimulation(nodes)
        .force(
          "link",
          d3.forceLink(links).id((d) => d.id)
        )
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

      const svg = d3
        .select(this.$el)
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

      const link = svg
        .append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", (d) => Math.sqrt(d.value));

      const node = svg
        .append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 5)
        .attr("fill", color)
        .call(this.drag(simulation));

      node.append("title").text((d) => d.id);

      simulation.on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y).attr("fill", color);
      });
    },

    drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    },
  },
};
</script>
<style lang="sass">

</style>
