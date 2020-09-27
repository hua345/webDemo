<template>
  <div id="d3-line" />
</template>

<script>
import * as d3 from 'd3'

const height = 800
const width = height
export default {
  name: 'D3ForceLinks',
  mounted() {
    const data = this.getData()
    const links = data.links.map((d) => Object.create(d))
    const nodes = data.nodes.map((d) => Object.create(d))
    const canvas = d3
      .select(this.$el)
      .append('canvas')
      .attr('width', height)
      .attr('height', height)
      .node()
    const canvasContext = canvas.getContext('2d')
    const simulation = d3
      .forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-30))
      .force(
        'link',
        d3.forceLink(links).distance(15).iterations(10)
      )
      .on('tick', ticked)

    function ticked() {
      canvasContext.clearRect(0, 0, width, height)
      canvasContext.save()
      canvasContext.translate(width / 2, height / 2)
      canvasContext.beginPath()
      for (const d of links) {
        canvasContext.moveTo(d.source.x, d.source.y)
        canvasContext.lineTo(d.target.x, d.target.y)
      }
      canvasContext.strokeStyle = '#aaa'
      canvasContext.stroke()
      canvasContext.beginPath()
      for (const d of nodes) {
        canvasContext.moveTo(d.x + 3, d.y)
        canvasContext.arc(d.x, d.y, 5, 0, 2 * Math.PI)
      }
      canvasContext.fillStyle = '#76BF8A'
      canvasContext.fill()
      canvasContext.strokeStyle = '#76BF8A'
      canvasContext.stroke()
      canvasContext.restore()
    }

    d3.select(canvas)
      .call(
        this.drag(simulation).subject(({ x, y }) =>
          simulation.find(x - width / 2, y - height / 2)
        )
      )
      .node()
  },
  methods: {
    drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.2).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
      }

      function dragged(event) {
        event.subject.fx = event.x
        event.subject.fy = event.y
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0)
        event.subject.fx = null
        event.subject.fy = null
      }

      return d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    },
    getData() {
      const n = 20
      const nodes = Array.from({ length: n * n }, (_, i) => ({ index: i }))
      const links = []
      for (let y = 0; y < n; ++y) {
        for (let x = 0; x < n; ++x) {
          if (y > 0) links.push({ source: (y - 1) * n + x, target: y * n + x })
          if (x > 0) links.push({ source: y * n + (x - 1), target: y * n + x })
        }
      }
      return { nodes, links }
    }
  }
}
</script>
<style lang="sass">
#d3-line
  margin: 25px
  path
    fill: none
    stroke: #76BF8A
    stroke-width: 3px
</style>
