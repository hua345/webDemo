/** When your routing table is too long, you can split it into small modules**/

import Layout from "@/layout";

const d3Router = {
  path: "/d3",
  component: Layout,
  redirect: "noRedirect",
  name: "d3Demo",
  meta: {
    title: "d3Demo",
    icon: "chart"
  },
  children: [
    {
      path: "line",
      component: () => import("@/views/d3/line.vue"),
      name: "d3Line",
      meta: { title: "d3Line", noCache: true }
    },
    {
      path: "force",
      component: () => import("@/views/d3/force.vue"),
      name: "d3Force",
      meta: { title: "d3Force", noCache: true }
    },
    {
      path: "shape",
      component: () => import("@/views/d3/shape.vue"),
      name: "d3Shape",
      meta: { title: "d3Shape", noCache: true }
    }
  ]
};

export default d3Router;
