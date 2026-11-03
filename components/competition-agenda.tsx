'use client'

import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { CONTENT_DATE, exploreMore, nextCycle, upcomingCompetitions, type Competition } from '@/lib/competitions'
import { certifications } from '@/lib/certifications'

export type SelectCompetition = (competition: Competition, trigger: HTMLElement) => void

export function CompetitionAgenda({ onSelect }: { onSelect: SelectCompetition }) {
  return <div className="competition-agenda">
    <section id="upcoming-competitions" className="agenda-block" aria-labelledby="upcoming-title">
      <div className="agenda-heading"><h3 id="upcoming-title" className="font-mono">UP NEXT <span>/ COMPETITIONS</span></h3><span>从 {CONTENT_DATE.replaceAll('-', '.')} 往后，值得关注的比赛</span></div>
      <div className="agenda-competition-list">{upcomingCompetitions.map(c => <article key={c.id} className="agenda-event">
        <button className="agenda-event-main" onClick={event => onSelect(c, event.currentTarget)} aria-label={`查看 ${c.shortName} 近期赛程`}>
          <span className="agenda-event-date font-mono">{c.upcoming!.date}</span>
          <span className="agenda-event-copy"><strong>{c.upcoming!.label}</strong><span>{c.upcoming!.summary}</span></span>
          <span className="agenda-event-relation">{c.associationRelation === 'organized' ? '组织参赛方向' : '关注探索'}<small>{c.category.join(' / ')}</small></span>
          <ArrowRight size={16} />
        </button>
        <a className="agenda-official text-link font-mono" href={c.officialUrl} target="_blank" rel="noopener noreferrer" aria-label={`${c.shortName} 官方网站`}>OFFICIAL <ArrowUpRight size={14} /></a>
      </article>)}</div>
    </section>
    <section id="upcoming-certifications" className="agenda-certifications" aria-labelledby="certifications-title">
      <div className="agenda-heading"><h3 id="certifications-title" className="font-mono">UP NEXT <span>/ CERTIFICATIONS</span></h3><span>认证 / 考试 · 不属于竞赛</span></div>
      <div className="certification-inline-list">{certifications.slice(0, 3).map(c => <a key={c.id} href={c.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`${c.id === 'csp' ? 'CCF CSP #43' : c.name} 官方考试通知`}><span className="font-mono">{c.date}</span><strong>{c.id === 'csp' ? 'CCF CSP #43' : c.name}</strong><span>{c.id === 'ruankao' ? '下半年考试' : '报名已截止'}<ArrowUpRight size={14} /></span></a>)}</div>
    </section>
    <section id="next-cycle" className="next-cycle" aria-label="下一赛事周期">
      <div><span className="font-mono">NEXT CYCLE</span><h3>{nextCycle.name}</h3></div>
      <div><span className="font-mono">COMING SOON <span>/ OFFICIAL SCHEDULE PENDING</span></span><p>今年的赛场陆续落幕，下一周期从准备开始。报名日期以官方后续通知为准。</p></div>
      <a href={nextCycle.officialUrl} target="_blank" rel="noopener noreferrer" className="text-link font-mono" aria-label="第18届蓝桥杯官方入口">OFFICIAL SITE <ArrowUpRight size={14} /></a>
    </section>
    <section id="explore-more" className="explore-more" aria-labelledby="explore-more-title">
      <div className="agenda-heading"><h3 id="explore-more-title" className="font-mono">EXPLORE MORE</h3><span>跨方向看看 · 仅作关注探索，不代表协会组织参赛</span></div>
      <div className="explore-more-links">{exploreMore.map(item => <a key={item.id} href={item.officialUrl} target="_blank" rel="noopener noreferrer" title={`${item.sourceLabel} · ${item.verificationNote}`}><span>{item.name}<small>{item.category}</small></span><ArrowUpRight size={15} /></a>)}</div>
      <p className="explore-source-note">CISCN、C4 网络赛当前使用官方 HTTP 公开入口；HTTPS 证书异常，浏览时请留意安全提示。</p>
    </section>
  </div>
}
