'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, RotateCcw, StepForward, ArrowRight } from 'lucide-react'
import { arenaEdges, arenaNodes, arenaSteps } from '@/lib/graph'
import { useExperience } from './experience-provider'
import { SectionHeading } from './welcome-training'
import { cn } from '@/lib/utils'

export function AlgorithmArena(){
  const [index,setIndex]=useState(-1)
  const [playing,setPlaying]=useState(false)
  const [speed,setSpeed]=useState(1)
  const [visible,setVisible]=useState(false)
  const [hidden,setHidden]=useState(false)
  const sectionRef=useRef<HTMLElement>(null)
  const {setAccepted}=useExperience()
  const step=arenaSteps[index]
  const finished=!!step?.found
  useEffect(()=>{
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:0.1})
    if(sectionRef.current) observer.observe(sectionRef.current)
    const onVisibility=()=>setHidden(document.hidden)
    document.addEventListener('visibilitychange',onVisibility)
    return ()=>{observer.disconnect();document.removeEventListener('visibilitychange',onVisibility)}
  },[])
  useEffect(()=>{
    if(finished){setPlaying(false);setAccepted(true);return}
    if(!playing||!visible||hidden) return
    const timer=setTimeout(()=>setIndex(i=>Math.min(i+1,arenaSteps.length-1)),800/speed)
    return ()=>clearTimeout(timer)
  },[index,playing,visible,hidden,speed,finished,setAccepted])
  const toggle=()=>{if(finished)setIndex(-1);setPlaying(v=>!v)}
  const logs=arenaSteps.slice(0,index+1).flatMap(s=>[`visit ${arenaNodes[s.current].id}`,...s.added.map(n=>`push ${arenaNodes[n].id}`),...(s.found?['target L found','return ACCEPTED']:[])])
  return <section ref={sectionRef} id="arena" className="section page-width arena-section">
    <div className="split-heading"><SectionHeading label="TRY AN ALGORITHM" title="第一次 AC，现在就可以。"/><p className="heading-aside">不需要写代码，先让一个算法跑起来。<br/>从 A 出发，一层一层找到 L。</p></div>
    <div className="arena-window"><div className="window-title font-mono"><span><i className="status-dot"/> ALGORITHM PLAYGROUND</span><span>BREADTH-FIRST SEARCH</span></div>
      <div className="arena-layout"><div className="arena-visual"><div className="arena-graph-label font-mono">UNDIRECTED GRAPH <span>12 NODES</span></div>
        <svg viewBox="0 0 700 365" className="arena-svg" role="img" aria-label={`BFS 图，共 12 个节点。${step?`当前访问 ${arenaNodes[step.current].id}`:'等待开始'}。目标节点 L。`}>
          {arenaEdges.map(([a,b])=>{const inPath=step?.path.some((v,i)=>i<step.path.length-1&&((v===a&&step.path[i+1]===b)||(v===b&&step.path[i+1]===a)));return <line key={`${a}-${b}`} x1={arenaNodes[a].x} y1={arenaNodes[a].y} x2={arenaNodes[b].x} y2={arenaNodes[b].y} className={cn('arena-edge',inPath&&'in-path',step?.visited.includes(a)&&step?.visited.includes(b)&&'visited')}/>})}
          {arenaNodes.map((node,i)=><g key={node.id} className={cn('arena-node',step?.visited.includes(i)&&'visited',step?.current===i&&'current',i===11&&'target')}><circle cx={node.x} cy={node.y} r={24}/><text x={node.x} y={node.y} textAnchor="middle" dominantBaseline="central">{node.id}</text>{(i===0||i===11)&&<text className="node-caption" x={node.x} y={node.y+43} textAnchor="middle">{i===0?'START':'TARGET'}</text>}</g>)}
        </svg><div className="arena-legend"><span><i/>未访问</span><span><i className="visited"/>已访问</span><span><i className="current"/>当前节点</span></div>
      </div><div className="arena-terminal font-mono"><div className="terminal-heading"><span>EXECUTION.LOG</span><span className="text-accent">{finished?'ACCEPTED':playing?'RUNNING':'READY'}</span></div><div className="queue-readout"><span>queue = </span><b>[{step?step.queue.map(n=>arenaNodes[n].id).join(', '):'A'}]</b></div><div className="execution-lines">{index<0?<><p className="text-muted-foreground">{'// 从起点开始探索'}</p><p>queue.push(A)</p><p className="text-muted-foreground">等待运行<span className="terminal-cursor">_</span></p></>:logs.slice(-8).map((line,i)=><p key={`${index}-${i}`} className={cn(line.includes('ACCEPTED')&&'text-accent')}><span className="log-chevron">{'>'}</span>{line}</p>)}</div><span className="terminal-step">STEP {String(index+1).padStart(2,'0')} / {arenaSteps.length}</span></div></div>
      <div className="arena-controls"><div className="arena-control-main"><button className="action-button compact" onClick={toggle}>{playing?<Pause size={15}/>:<Play size={15}/>} {playing?'暂停 BFS':finished?'再次运行':'START BFS'}</button><button className="icon-button" onClick={()=>{setPlaying(false);setIndex(i=>Math.min(i+1,arenaSteps.length-1))}} disabled={finished} aria-label="单步执行 BFS" title="单步执行"><StepForward size={18}/></button><button className="icon-button" onClick={()=>{setPlaying(false);setIndex(-1)}} aria-label="重置 BFS" title="重置"><RotateCcw size={16}/></button></div><button className="speed-button font-mono" onClick={()=>setSpeed(s=>s===1?2:s===2?0.5:1)} aria-label={`运行速度 ${speed} 倍，点击切换`}>{speed}× SPEED</button></div>
    </div>
    <div className="arena-explanation" aria-live="polite">{finished?<><span className="text-accent font-mono">✓ TARGET FOUND</span><span>刚才运行的是一次 BFS（广度优先搜索）。</span></>:<><span className="font-mono text-primary">A → L</span><span>看不懂也没关系。新人培训，就是从这些东西开始。</span></>}<a href="#join">一起从基础开始 <ArrowRight size={15}/></a></div>
  </section>
}
