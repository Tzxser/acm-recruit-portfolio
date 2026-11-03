'use client'

import { useState } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { growthPaths } from '@/lib/certifications'
import { SectionHeading } from './welcome-training'
import { cn } from '@/lib/utils'

export function GrowthPaths(){
  const [active,setActive]=useState<string | null>(null)
  return <section id="paths" className="section path-section">
    <div className="page-width">
      <div className="split-heading"><SectionHeading label="FIND YOUR OWN PATH" title="不止一条路，通向你想成为的人。"/><p className="heading-aside">有的人喜欢解题，有的人喜欢创造。<br/>先选择一个方向，再慢慢走深。</p></div>
      <div className="tree-root"><span className="root-label font-mono">YOU<span className="root-dot"/></span><span className="root-caption">从你出发</span></div>
      <div className="path-grid">{growthPaths.map(path=><article key={path.id} className={cn('path-column',`tone-${path.color}`,active===path.id&&'selected')}>
        <button className="path-header" aria-expanded={active===path.id} onClick={()=>setActive(active===path.id?null:path.id)}><span className="path-branch-dot"/><span className="font-mono path-code">PATH {path.letter} / {path.english}</span><span className="path-name">{path.name}<ArrowUpRight size={20}/></span><span className="path-intro">{path.intro}</span></button>
        <ol className="path-steps">{path.steps.map((step,i)=><li key={step}><span className="step-dot"/><span>{step}</span>{i===path.steps.length-1&&<ArrowDown size={14}/>}</li>)}</ol>
        <div className="path-destination"><span className="font-mono">NEXT DESTINATION</span><p>{path.destination}</p></div>
        {active===path.id&&<a className="path-start-link" href="#join">从新人培训开始 <ArrowUpRight size={16}/></a>}
      </article>)}</div>
      <p className="path-footnote"><span className="tiny-cross">+</span> 技术竞赛的团队，不只需要会写算法的人。<span className="text-muted-foreground"> 设计、产品、表达，同样重要。</span></p>
    </div>
  </section>
}
