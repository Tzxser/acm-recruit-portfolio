'use client'

import { useEffect, useRef, useState } from 'react'
import { heroEdges, heroNodes, heroSteps } from '@/lib/graph'
import { useExperience } from './experience-provider'

export function AlgorithmGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState('INITIALIZING...')
  const { motionEnabled, theme } = useExperience()
  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if(!canvas || !wrapper) return
    const ctx = canvas.getContext('2d')
    if(!ctx) return
    const style = getComputedStyle(document.documentElement)
    let blue = style.getPropertyValue('--primary').trim()
    let cyan = style.getPropertyValue('--accent').trim()
    let violet = style.getPropertyValue('--violet').trim()
    let foreground = style.getPropertyValue('--foreground').trim()
    let background = style.getPropertyValue('--background').trim()
    let frame = 0, lastTime = 0, elapsed = 0, visible = true, width = 0, height = 0
    let currentStatus = ''
    let pointer = {x:-1000,y:-1000}
    const mobile = window.matchMedia('(max-width: 767px)').matches
    const final = heroSteps[heroSteps.length-1]
    const resize = () => {
      width = wrapper.clientWidth; height = wrapper.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2)
      canvas.width = width*dpr; canvas.height = height*dpr
      ctx.setTransform(dpr,0,0,dpr,0,0)
      if(!motionEnabled) draw(100000)
    }
    function draw(t: number) {
      if(!ctx) return
      ctx.clearRect(0,0,width,height)
      const stepIndex = motionEnabled ? Math.floor((t-700)/155) : heroSteps.length-1
      const step = stepIndex>=0 ? heroSteps[Math.min(stepIndex,heroSteps.length-1)] : undefined
      const found = step?.found ?? false
      const nextStatus = found ? 'ACCEPTED' : t<250 ? 'INITIALIZING...' : t<700 ? 'GRAPH READY' : 'BFS SEARCH'
      if(currentStatus!==nextStatus) {currentStatus=nextStatus;setStatus(nextStatus)}
      const sx = width/850, sy = height/530
      const points = heroNodes.map((node,i)=> {
        const drift = motionEnabled && !mobile ? Math.sin(t/2600+i*1.7)*3 : 0
        const dx = node.x*sx-pointer.x, dy = node.y*sy-pointer.y
        const distance = Math.hypot(dx,dy)
        const force = !mobile && distance<95 && motionEnabled ? (1-distance/95)*5 : 0
        return {x:node.x*sx+drift+dx/(distance||1)*force,y:(node.y+22)*sy+drift+dy/(distance||1)*force}
      })
      for(const [a,b] of heroEdges) {
        const onPath = found && final.path.some((n,i)=> i<final.path.length-1 && ((n===a && final.path[i+1]===b)||(n===b && final.path[i+1]===a)))
        const visited = !!step && step.visited.includes(a) && step.visited.includes(b)
        ctx.beginPath();ctx.moveTo(points[a].x,points[a].y);ctx.lineTo(points[b].x,points[b].y)
        ctx.strokeStyle=onPath?cyan:blue;ctx.globalAlpha=onPath?0.9:visited?0.28:0.13
        ctx.lineWidth=onPath?1.8:0.8;ctx.shadowColor=cyan;ctx.shadowBlur=onPath?8:0;ctx.stroke()
      }
      ctx.shadowBlur=0
      points.forEach((point,i)=> {
        const isPath = found && final.path.includes(i)
        const visited = step?.visited.includes(i)
        const near = Math.hypot(point.x-pointer.x,point.y-pointer.y)<95
        const major = [0,3,6,10,12,15,18].includes(i)
        const color = i>19 ? violet : isPath ? cyan : blue
        const radius = (major?6:3.6)*(mobile?0.85:1)
        if(major || isPath || near) {
          ctx.beginPath();ctx.arc(point.x,point.y,radius+9,0,Math.PI*2);ctx.fillStyle=color;ctx.globalAlpha=isPath?0.075:0.035;ctx.fill()
          ctx.beginPath();ctx.arc(point.x,point.y,radius+6,0,Math.PI*2);ctx.strokeStyle=color;ctx.globalAlpha=isPath?0.32:0.13;ctx.lineWidth=0.7;ctx.stroke()
        }
        ctx.beginPath();ctx.arc(point.x,point.y,radius,0,Math.PI*2)
        ctx.fillStyle=major?background:color;ctx.globalAlpha=visited||isPath?1:0.42;ctx.fill()
        ctx.strokeStyle=color;ctx.lineWidth=major?1.7:1;ctx.stroke()
        if(major) {ctx.beginPath();ctx.arc(point.x,point.y,2,0,Math.PI*2);ctx.fillStyle=color;ctx.fill()}
        if(major || (!mobile && i%3===0)) {
          ctx.font=`${mobile?10:12}px monospace`;ctx.globalAlpha=major?0.7:0.3;ctx.fillStyle=foreground
          ctx.fillText(i===0?'START':i===18?'TARGET':heroNodes[i].id,point.x+11,point.y-10)
        }
      })
      ctx.globalAlpha=1;ctx.shadowBlur=0
    }
    function loop(now: number) {
      if(!visible || document.hidden || !motionEnabled) {frame=0;lastTime=0;return}
      if(lastTime) elapsed+=Math.min(now-lastTime,50)
      lastTime=now;draw(elapsed);frame=requestAnimationFrame(loop)
    }
    function resume() {
      if(!document.hidden && visible && motionEnabled && !frame) frame=requestAnimationFrame(loop)
      if((document.hidden || !visible) && frame) {cancelAnimationFrame(frame);frame=0;lastTime=0}
    }
    const observer = new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;resume()},{threshold:0.05})
    const resizeObserver = new ResizeObserver(resize)
    observer.observe(wrapper);resizeObserver.observe(wrapper)
    const move = (e: PointerEvent) => {const rect=canvas.getBoundingClientRect();pointer={x:e.clientX-rect.left,y:e.clientY-rect.top}}
    const leave = () => {pointer={x:-1000,y:-1000}}
    canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerleave',leave)
    document.addEventListener('visibilitychange',resume)
    resize();resume()
    // Theme transition tween is ~420ms; re-read the settled tokens after it so a paused canvas isn't left on a mid-transition color.
    const settle = window.setTimeout(refresh, 520)
    function refresh() {
      const s = getComputedStyle(document.documentElement)
      blue = s.getPropertyValue('--primary').trim(); cyan = s.getPropertyValue('--accent').trim()
      violet = s.getPropertyValue('--violet').trim(); foreground = s.getPropertyValue('--foreground').trim()
      background = s.getPropertyValue('--background').trim()
      if(!motionEnabled) draw(100000)
    }
    return ()=>{window.clearTimeout(settle);cancelAnimationFrame(frame);observer.disconnect();resizeObserver.disconnect();document.removeEventListener('visibilitychange',resume);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerleave',leave)}
  }, [motionEnabled, theme])
  return <div className="hero-graph" aria-label="广度优先搜索算法演示：从起点搜索目标，不代表协会成绩">
    <div className="graph-topline font-mono"><span><i className="status-dot"/> ALGORITHM GRAPH</span><span>G = (V, E)</span></div>
    <div ref={wrapperRef} className="graph-canvas-wrap"><canvas ref={canvasRef} className="graph-canvas" aria-hidden="true"/></div>
    <div className="graph-coordinate font-mono">28 NODES / UNDIRECTED GRAPH</div>
    <div className="graph-console font-mono">
      <div className="console-title"><span className="console-lights"><i/><i/><i/></span><span>bfs_search.cpp</span><span>DEMO</span></div>
      <div className="console-result"><span className="text-muted-foreground">{'>'} result</span><span className="text-accent">{status==='ACCEPTED'?'✓ Accepted':status}</span></div>
      <div className="console-metrics"><span>Runtime <b>34 ms</b></span><span>Memory <b>12.7 MB</b></span></div>
      <span className="simulation-note">算法模拟 · 非真实竞赛成绩</span>
    </div>
  </div>
}
