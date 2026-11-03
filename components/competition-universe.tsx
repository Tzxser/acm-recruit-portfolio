'use client'

import { useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { competitions, statusLabels } from '@/lib/competitions'
import { SectionHeading } from './welcome-training'
import { cn } from '@/lib/utils'

const clusters = [{ id: 'ALGORITHM', x: 29, y: 30 }, { id: 'SOFTWARE', x: 61, y: 22 }, { id: 'AI', x: 76, y: 45 }, { id: 'INNOVATION', x: 61, y: 75 }, { id: 'DESIGN', x: 33, y: 76 }]
const coordinates: Record<string, { x: number; y: number; group: string }> = {
  icpc: { x: 12, y: 12, group: 'ALGORITHM' }, ccpc: { x: 11, y: 43, group: 'ALGORITHM' }, lanqiao: { x: 38, y: 6, group: 'ALGORITHM' },
  gplt: { x: 10, y: 76, group: 'ALGORITHM' }, software: { x: 73, y: 8, group: 'SOFTWARE' }, ican: { x: 62, y: 93, group: 'INNOVATION' },
  '4c': { x: 89, y: 76, group: 'DESIGN' }, aigc: { x: 94, y: 32, group: 'AI' }, ccsp: { x: 29, y: 94, group: 'ALGORITHM' },
}

export function CompetitionUniverse() {
  const [active, setActive] = useState('ican')
  const competition = competitions.find(c => c.id === active)!
  const coord = coordinates[active]
  return <section id="competitions" className="section universe-section"><div className="page-width">
    <div className="split-heading"><SectionHeading label="COMPETITION UNIVERSE" title="你的兴趣，也有自己的赛场。" /><p className="heading-aside">从算法竞技到创意实践。<br />探索节点，找到想挑战的下一站。</p></div>
    <div className="universe-layout">
      <div className="universe-map" aria-label="赛事关系星图">
        <div className="universe-orbit orbit-one" /><div className="universe-orbit orbit-two" />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="universe-lines" aria-hidden="true">
          {clusters.map(c => <line key={c.id} x1="50" y1="50" x2={c.x} y2={c.y} className={cn('cluster-line', coord.group === c.id && 'active')} />)}
          {competitions.map(c => { const p = coordinates[c.id], parent = clusters.find(g => g.id === p.group)!; return <line key={c.id} x1={parent.x} y1={parent.y} x2={p.x} y2={p.y} className={cn('competition-line', active === c.id && 'active')} /> })}
        </svg>
        <div className="universe-center font-mono"><span>GUIT</span><strong>ACM</strong></div>
        {clusters.map(c => <span key={c.id} className={cn('universe-category font-mono', c.id === coord.group && 'active')} style={{ left: `${c.x}%`, top: `${c.y}%` }}><i />{c.id}</span>)}
        {competitions.map(c => { const p = coordinates[c.id]; return <button type="button" key={c.id} className={cn('competition-node', active === c.id && 'active', c.associationRelation === 'explore' && 'explore')} style={{ left: `${p.x}%`, top: `${p.y}%` }} onClick={() => setActive(c.id)} onMouseEnter={() => setActive(c.id)} onFocus={() => setActive(c.id)} aria-pressed={active === c.id} aria-controls="selected-competition" aria-label={`选择 ${c.shortName}`}><span className="competition-node-dot" /><span className="font-mono">{c.id === 'ccsp' ? 'CCSP' : c.shortName}</span>{c.id === 'ican' && <small className="font-mono">NOW</small>}</button> })}
      </div>
      <aside id="selected-competition" className="universe-detail" aria-live="polite" aria-atomic="true">
        <div className="universe-detail-top font-mono"><span>SELECTED NODE</span><ArrowUpRight size={16} /></div>
        <div className="universe-detail-content">
          <span className="font-mono competition-year">2026 / {competition.category.join(' + ')}</span><h3>{competition.shortName}</h3><p className="universe-full-name">{competition.name}</p>
          <span className={`status-pill status-${competition.status}`}><i className="status-dot" />{statusLabels[competition.status]}</span>
          <p className="universe-description">{competition.description}</p>
          <div className="universe-stage"><span>NEXT / {competition.nextStage.name}</span><strong className="font-mono">{competition.nextStage.date}</strong></div>
          <div className="universe-node-actions font-mono"><a href={`#event-${competition.id}`} className="text-link" aria-label={`${competition.shortName} 2026 SCHEDULE`} onClick={event => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || window.innerWidth < 768) return
            requestAnimationFrame(() => {
              const row = document.getElementById(`event-${competition.id}`)
              const track = row?.closest('.timeline-scroll')
              const bars = row?.querySelectorAll<HTMLElement>('.timeline-bar')
              const nextIndex = competition.stages.findIndex(stage => stage.name === competition.nextStage.name)
              const bar = bars?.[nextIndex >= 0 ? nextIndex : bars.length - 1]
              if (!track || !bar) return
              const labelWidth = row?.querySelector('.timeline-label')?.getBoundingClientRect().width ?? 198
              const target = bar.getBoundingClientRect(), viewport = track.getBoundingClientRect()
              const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'off' ? 'instant' : 'smooth'
              track.scrollBy({ left: target.left - viewport.left - labelWidth - (track.clientWidth - labelWidth - target.width) / 2, behavior })
            })
          }}>2026 SCHEDULE <ArrowRight size={14} /></a><a href={competition.officialUrl} className="text-link" target="_blank" rel="noopener noreferrer" aria-label={`${competition.shortName} OFFICIAL SITE`}>OFFICIAL SITE <ArrowUpRight size={14} /></a></div>
        </div>
        <div className="universe-detail-footer"><span>{competition.associationRelation === 'organized' ? '协会组织参赛方向' : '关注赛事 / 可探索方向'}</span><span className="font-mono">2026.09.08</span></div>
      </aside>
    </div>
    <div className="universe-legend"><span><i className="solid-dot" /> 协会组织参赛方向</span><span><i className="outline-dot" /> 关注 / 可探索赛事</span><span className="universe-hint">点击选择节点 · 从面板查看赛程或官网</span></div>
  </div></section>
}
