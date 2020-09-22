# [https://github.com/d3/d3-force](https://github.com/d3/d3-force)

该模块实现了速度 Verlet 数值积分器，用于模拟粒子上的物理力

## 物理仿真系统 Simulation

### simulation.nodes([nodes])

数组每个节点必须是一个对象。通过模拟分配以下属性：
index-节点的从零开始的索引节点

- x-节点的当前 x-位置
- y-节点的当前 y-位置
- vx-节点当前的 x-速度
- vy-节点的当前 y-速度

位置(x,y)和速度(vx,vy)

### simulation.alpha([alpha])

大致类似于模拟退火算法(simulated annealing)中的温度。随着仿真的“冷却”，它会随着时间的流逝而减少。当 alpha 达到 alphaMin 时，模拟停止

### simulation.alphaDecay([decay])

设置 alpha 衰减率,默认为 0.0228…= 1- pow（0.001，1/300），其中 0.001 是默认的 alphaMin

### simulation.alphaTarget([target])

设置当前 alpha 值,范围[0,1]

### simulation.velocityDecay([decay])

速度衰减因子，默认为 0.4。衰减因子类似于大气摩擦

### simulation.tick([iterations])

每次迭代，它都会将当前 alpha 增加（alphaTarget - alpha）× alphaDecay

## force

force 是个简单的函数，改变 nodes 节点的位置和速度.可以用在经典力学(例如电荷力和重力)或者解决几何约束
force 通常会根据需要组成多个`force`。该模块为您提供一些乐趣：

```js
var simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody())
    .force("link", d3.forceLink(links))
    .force("center", d3.forceCenter());
```

### Centering 定心

定心力转换节点均匀，使得所有节点的平均位置（重心如果所有节点都具有相同的权重）是在给定位置(x,y)。

### Collision 碰撞

碰撞力将节点视为具有给定半径的圆，而不是点，并防止节点重叠。两个节点 a 和 b 是分开的，因此 a 和 b 之间的距离至少为半径（a）+ 半径（b）
d3.forceCollide()创建一个具有指定半径的新的圆碰撞力

### Links 链接

链接力根据所需的链接距离将链接的节点推到一起或分开。类似于弹簧力，力的强度与链接节点的距离和目标距离之间的差成正比。

### Many-Body 多体

多体（或 n 体）力在所有节点之间相互施加。如果强度为正，则可用于模拟重力（吸引力），如果强度为负，则可用于模拟静电荷（排斥力）。此实现使用四叉树和 Barnes-Hut 逼近来大大提高性能。
d3.forceManyBody()创建一个 Many-Body 力
manyBody.strength([strength])正值使节点彼此吸引，类似于重力，而负值使节点彼此排斥，类似于静电荷。默认值-30

### Positioning 定位方式

d3.forceX([x])创建一个沿 x 轴方向的定位力。如果未指定 x，则默认为 0。x.strength([strength]) x.方向力强度默认 0.1
d3.forceY([y])创建一个沿 x 轴方向的定位力。如果未指定 y，则默认为 0。y.strength([strength]) y.方向力强度默认 0.1
d3.forceRadial(radius[, x][, y])创建一个沿半径范围(x,y)范围的定位力
