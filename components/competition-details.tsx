'use client'

import { useRef, type RefObject } from 'react'
import { ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { type Competition, statusLabels } from '@/lib/competitions'

export function CompetitionDetails({ competition, onClose, returnFocus }: {
  competition: Competition | null
  onClose: () => void
  returnFocus: RefObject<HTMLElement | null>
}) {
  const title = useRef<HTMLHeadingElement>(null)
  return <Dialog open={!!competition} onOpenChange={open => { if (!open) onClose() }}>
    <DialogContent className="event-drawer translate-x-0 translate-y-0" showCloseButton={false} initialFocus={title} finalFocus={returnFocus}>
      {competition && <>
        <div className="event-drawer-bar">
          <span className="font-mono">EVENT DETAIL <span className="text-muted-foreground">/ {competition.year}</span></span>
          <DialogClose className="icon-button" aria-label="关闭赛事详情"><X size={20} /></DialogClose>
        </div>
        <div className="event-drawer-body">
          <DialogHeader>
            <p className="eyebrow font-mono">{competition.subtitle}</p>
            <DialogTitle ref={title} tabIndex={-1}>{competition.name}</DialogTitle>
            <DialogDescription>{competition.description}</DialogDescription>
          </DialogHeader>
          <div className="event-categories font-mono">{competition.category.join(' / ')}</div>
          <div className="detail-meta">
            <span className={`status-pill status-${competition.status}`}><i className="status-dot" />{statusLabels[competition.status]}</span>
            <span>{competition.associationRelation === 'organized' ? '组织参赛 / 协会参赛方向' : '关注探索 / 非协会组织参赛'}</span>
          </div>
          <div className="registration-note"><h3>报名与参赛</h3><p>{competition.registration}</p></div>
          <section className="event-stage-section" aria-label="2026 各阶段时间">
            <h3 className="font-mono">2026 SCHEDULE <span>/ 各阶段时间</span></h3>
            <dl className="detail-stages">{competition.stages.map(stage => <div key={stage.name}><dt>{stage.name}</dt><dd className="font-mono">{stage.date}</dd></div>)}</dl>
          </section>
          <div className="event-next-stage"><span className="font-mono">NEXT <ArrowRight size={14} /></span><div><strong>{competition.nextStage.name}</strong><p className="font-mono">{competition.nextStage.date}</p></div></div>
          {competition.note && <p className="detail-note">{competition.note}</p>}
          <div className="source-links">
            <a href={competition.officialUrl} target="_blank" rel="noopener noreferrer"><span>官方赛事入口 <span className="font-mono">/ OFFICIAL SITE</span></span><ArrowUpRight size={16} /></a>
            <a href={competition.scheduleUrl} target="_blank" rel="noopener noreferrer"><span>官方赛程 / 公告来源</span><ArrowUpRight size={16} /></a>
          </div>
          <div className="event-source-record">
            <p className="font-mono">SOURCE RECORD</p>
            <dl><div><dt>数据来源</dt><dd>{competition.sourceLabel}</dd></div><div><dt>最近核查</dt><dd className="font-mono">{competition.lastVerified}</dd></div></dl>
            <p>{competition.verificationNote}</p>
            <p>{competition.officialSchedule}。后续调整以官方通知为准。</p>
          </div>
        </div>
      </>}
    </DialogContent>
  </Dialog>
}
