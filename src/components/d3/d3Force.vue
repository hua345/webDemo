<template>
  <div id="d3-line" />
</template>

<script>
import * as d3 from 'd3'

const n = 4
const width = 600
const height = width
export default {
  name: 'D3Force',
  mounted() {
    const k = width / 200
    const r = d3.randomUniform(k, k * 4)
    const data = Array.from({ length: 200 }, (_, i) => ({
      r: r(),
      group: i && (i % n) + 1
    }))
    const canvas = d3
      .select(this.$el)
      .append('canvas')
      .attr('width', height)
      .attr('height', height)
      .node()
    const canvasContext = canvas.getContext('2d')
    const nodes = data.map(Object.create)
    const color = d3.scaleOrdinal(
      d3.range(n),
      ['transparent'].concat(d3.schemeTableau10)
    )
    const simulation = d3
      .forceSimulation(nodes)
      .alphaTarget(0.3) // stay hot
      .velocityDecay(0.1)
      .force('x', d3.forceX().strength(0.01))
      .force('y', d3.forceY().strength(0.01))
      .force(
        'collide', // 碰撞
        d3
          .forceCollide()
          .radius((d) => d.r + 1)
          .iterations(3)
      )
      .force(
        'charge',
        d3.forceManyBody().strength((d, i) => (i ? 0 : (-width * 2) / 3))
      )
      .on('tick', ticked)

    canvas.addEventListener('touchmove', (event) => event.preventDefault())
    canvas.addEventListener('pointermove', pointed)

    function pointed(event) {
      const [x, y] = d3.pointer(event)
      nodes[0].fx = x - width / 2
      nodes[0].fy = y - height / 2
    }

    function ticked() {
      canvasContext.clearRect(0, 0, width, height)
      canvasContext.save()
      canvasContext.translate(width / 2, height / 2)
      for (const d of nodes) {
        canvasContext.beginPath()
        canvasContext.moveTo(d.x + d.r, d.y)
        canvasContext.arc(d.x, d.y, d.r, 0, 2 * Math.PI)
        canvasContext.fillStyle = color(d.group)
        canvasContext.fill()
      }
      canvasContext.restore()
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
