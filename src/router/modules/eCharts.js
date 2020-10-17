/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const echartsRouter = {
  path: '/echarts',
  component: Layout,
  redirect: 'noRedirect',
  name: 'echarts',
  meta: {
    title: 'echarts',
    icon: 'chart'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/echarts/keyboard'),
      name: 'KeyboardChart',
      meta: { title: 'keyboardChart', noCache: true }
    },
    {
      path: 'line',
      component: () => import('@/views/echarts/line'),
      name: 'LineChart',
      meta: { title: 'lineChart', noCache: true }
    },
    {
      path: 'mix-chart',
      component: () => import('@/views/echarts/mix-chart'),
      name: 'MixChart',
      meta: { title: 'mixChart', noCache: true }
    }
  ]
}

export default echartsRouter
