'use client'

import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, LocateFixed } from 'lucide-react'
import { CONTENT_DATE, competitions, type Competition, statusLabels } from '@/lib/competitions'
import { SectionHeading } from './welcome-training'
import { CompetitionDetails } from './competition-details'
import { CompetitionAgenda, type SelectCompetition } from './competition-agenda'
import { cn } from '@/lib/utils'

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const labelWidth = 198
function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'off' ? 'instant' : 'smooth'
}

function CompetitionRow({ competition: c, onSelect }: { competition: Competition; onSelect: SelectCompetition }) {
  return <article id={`event-${c.id}`} className={cn('timeline-row', c.id === 'ican' && 'featured-row', c.status === 'pending' && 'pending-row')}>
    <div className="timeline-label">
      <button className="timeline-name" aria-label={`查看 ${c.shortName} 赛事详情`} onClick={event => onSelect(c, event.currentTarget)}><span>{c.shortName}</span><small>{c.status === 'pending' ? '官方赛程待公布' : c.associationRelation === 'explore' ? '关注 / 可探索' : c.category[0]}</small></button>
      <div className="timeline-row-actions font-mono">
        <button onClick={event => onSelect(c, event.currentTarget)} aria-label={`${c.shortName} DETAILS`}>DETAILS <ArrowRight size={12} /></button>
        <a href={c.officialUrl} target="_blank" rel="noopener noreferrer" aria-label={`${c.shortName} OFFICIAL`}>OFFICIAL <ArrowUpRight size={12} /></a>
      </div>
    </div>
    <div className="timeline-track">
      <div className="timeline-grid-lines" aria-hidden="true">{months.map((month, i) => <span key={month} className={cn(i === 8 && 'current-month')} />)}</div>
      {c.status === 'pending' ? <button className="timeline-pending font-mono" onClick={event => onSelect(c, event.currentTarget)} aria-label={`${c.shortName} 官方赛程待公布，查看详情`}><span>SCHEDULE PENDING <span>/ 官方赛程待公布</span></span></button> : c.stages.map((stage, i) => <button key={stage.name} className={cn('timeline-bar', c.id === 'ican' ? 'bar-cyan' : c.category.includes('AI') ? 'bar-violet' : 'bar-blue')} style={{ gridColumn: `${stage.month} / span ${(stage.endMonth ?? stage.month!) - stage.month! + 1}`, gridRow: i % 2 + 1 }} onClick={event => onSelect(c, event.currentTarget)} aria-label={`${c.shortName} · ${stage.name} · ${stage.date}，查看详情`} title={`${c.name} · ${stage.name} · ${stage.date}`}><span>{stage.date}</span></button>)}
    </div>
    <div className="mobile-timeline-content">
      <span className={`status-pill status-${c.status}`}>{statusLabels[c.status]}</span>
      {c.stages.map(stage => <button className="mobile-stage" key={stage.name} onClick={event => onSelect(c, event.currentTarget)} aria-label={`${c.shortName} ${stage.name} ${stage.date}，查看详情`}><span>{stage.name}</span><strong className="font-mono">{stage.date}</strong></button>)}
    </div>
  </article>
}

export function CompetitionRadar() {
  const [selected, setSelected] = useState<Competition | null>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const track = useRef<HTMLDivElement>(null)
  const selectCompetition: SelectCompetition = (competition, trigger) => { returnFocus.current = trigger; setSelected(competition) }
  const current = () => {
    if (window.innerWidth < 768) document.getElementById('event-ican')?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
    else if (track.current) {
      const september = labelWidth + (track.current.scrollWidth - labelWidth) * 8.5 / 12
      track.current.scrollTo({ left: Math.max(0, september - track.current.clientWidth / 2), behavior: scrollBehavior() })
    }
  }
  return <section id="radar" className="section page-width radar-section">
    <div className="split-heading"><SectionHeading label="2026 COMPETITION RADAR" title="看见下一站，提前做好准备。" /><div className="radar-date"><span className="font-mono">YOU ARE HERE</span><strong className="font-mono">2026 <span className="text-accent">/ 09</span></strong><span>资料截至 {CONTENT_DATE.replaceAll('-', '.')}</span></div></div>
    <nav className="radar-section-nav font-mono" aria-label="赛事区快捷导航"><a href="#upcoming-competitions">UP NEXT / 比赛 <ArrowRight size={14} /></a><a href="#upcoming-certifications">认证 / 考试</a><a href="#next-cycle">NEXT CYCLE</a><a href="#explore-more">EXPLORE MORE</a></nav>
    <div className="radar-toolbar"><span className="radar-note"><i className="status-dot" />9 月招新 · 探索进行中</span><div className="radar-tools"><button onClick={current} className="text-link"><LocateFixed size={15} />回到九月</button><button className="icon-button radar-arrow" aria-label="向前浏览月份" onClick={() => track.current?.scrollBy({ left: -350, behavior: scrollBehavior() })}><ArrowLeft size={16} /></button><button className="icon-button radar-arrow" aria-label="向后浏览月份" onClick={() => track.current?.scrollBy({ left: 350, behavior: scrollBehavior() })}><ArrowRight size={16} /></button></div></div>
    <div ref={track} className="timeline-scroll" role="region" aria-label="2026 赛事时间轴，可横向滚动查看月份" tabIndex={0}><div className="timeline-chart">
      <div className="timeline-header font-mono"><span>COMPETITION / 2026</span><div>{months.map((month, i) => <span key={month} className={cn(i === 8 && 'current-month')}>{month}{i === 8 && <small>YOU ARE HERE</small>}</span>)}</div></div>
      {competitions.map(c => <CompetitionRow key={c.id} competition={c} onSelect={selectCompetition} />)}
    </div></div>
    <p className="timeline-disclaimer">悬停或键盘聚焦显示详情与官网入口，点击赛事或日期查看完整赛程。ICPC / CCPC 待公布行不表示预测月份；历史赛程不等于当前开放报名。</p>
    <CompetitionAgenda onSelect={selectCompetition} />
    <CompetitionDetails competition={selected} onClose={() => setSelected(null)} returnFocus={returnFocus} />
  </section>
}
