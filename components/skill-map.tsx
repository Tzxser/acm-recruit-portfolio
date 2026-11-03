'use client'

import { useState } from 'react'
import { ArrowRight,ArrowUpRight } from 'lucide-react'
import { Tabs,TabsList,TabsTrigger,TabsContent } from '@/components/ui/tabs'
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription } from '@/components/ui/dialog'
import { certifications,skillRoutes } from '@/lib/certifications'
import { SectionHeading } from './welcome-training'

export function SkillMap(){
  const [selected,setSelected]=useState<string|null>(null)
  const certification=certifications.find(c=>c.id===selected)
  return <section id="skills" className="section page-width skills-section"><div className="split-heading"><SectionHeading label="SKILL MAP" title="想往哪里走？从这里找到路线。"/><p className="heading-aside">比赛不是唯一的能力证明。<br/>也可以通过认证，检验自己的学习成果。</p></div>
    <Tabs defaultValue="algorithm" className="skill-tabs"><TabsList variant="line" className="skill-tab-list" aria-label="选择能力成长方向">{skillRoutes.map(route=><TabsTrigger key={route.id} value={route.id}>{route.label}</TabsTrigger>)}</TabsList>{skillRoutes.map(route=><TabsContent key={route.id} value={route.id}><div className="skill-route"><div className="skill-route-intro"><p className="eyebrow font-mono">YOUR DIRECTION / {route.english}</p><h3>{route.label}</h3><p>{route.description}</p></div><ol className="skill-waypoints">{route.skills.map((skill,i)=><li key={skill}><span className="skill-waypoint-dot"/><span>{skill}</span>{i<route.skills.length-1&&<ArrowRight size={16}/>}</li>)}</ol><div className="skill-destinations"><div className="skill-competition-list"><span className="font-mono skill-small-label">PRACTICE / 实践方向</span><div>{route.competitions.map(c=><a key={c} href="#competitions">{c}<ArrowUpRight size={14}/></a>)}</div></div><div className="skill-certification-list"><span className="font-mono skill-small-label">CHECKPOINT / 能力检验</span>{route.certs.map(id=>{const cert=certifications.find(c=>c.id===id)!;return <button key={id} onClick={()=>setSelected(id)}><span><strong>{cert.name}</strong><small>{cert.subtitle}</small></span><span className="font-mono cert-date">{cert.date}<ArrowUpRight size={18}/></span></button>})}</div></div></div></TabsContent>)}</Tabs>
    <p className="skill-disclaimer"><span className="tiny-cross">+</span> 学习方向导航，不是证书排行榜。协会不是商业培训机构；请按兴趣与实际需求选择，报考信息以官方为准。</p>
    <Dialog open={!!certification} onOpenChange={open=>{if(!open)setSelected(null)}}><DialogContent className="certification-dialog sm:max-w-lg">{certification&&<><DialogHeader><p className="eyebrow font-mono">SKILL CHECKPOINT</p><DialogTitle>{certification.name}</DialogTitle><DialogDescription>{certification.subtitle}</DialogDescription></DialogHeader><p className="certification-date font-mono">{certification.date}</p><p className="certification-detail">{certification.detail}</p><a className="source-link" href={certification.sourceUrl} target="_blank" rel="noopener noreferrer"><span className="font-mono">SOURCE ↗</span> {certification.sourceName}</a><p className="detail-note">信息整理截至 2026.09.07，日期、资格要求及后续调整以官方最新公告为准。</p></>}</DialogContent></Dialog>
  </section>
}
