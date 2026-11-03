'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, Moon, Pause, Play, Sun, X } from 'lucide-react'
import { useExperience } from './experience-provider'
import { cn } from '@/lib/utils'

const nav = [{id:'training',label:'协会训练',en:'TRAINING'}, {id:'paths',label:'成长路线',en:'PATHS'}, {id:'competitions',label:'赛事星图',en:'COMPETITIONS'}, {id:'radar',label:'2026 赛程',en:'2026'}, {id:'skills',label:'能力地图',en:'SKILLS'}]
const progress = [{id:'start',en:'START'}, {id:'training',en:'TRAIN'}, {id:'paths',en:'BUILD'}, {id:'competitions',en:'COMPETE'}, {id:'skills',en:'GROW'}, {id:'join',en:'JOIN'}]
export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('start')
  const {motionEnabled,toggleMotion,accepted,theme,toggleTheme} = useExperience()
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if(entry.isIntersecting) setActive(entry.target.id) })
    }, {rootMargin:'-15% 0px -60% 0px',threshold:0})
    document.querySelectorAll('section[id]').forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if(e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown',close)
    return () => document.removeEventListener('keydown',close)
  }, [])
  return <>
    <a className="skip-link" href="#main">跳到主要内容</a>
    <header className="site-header">
      <div className="page-width header-inner">
        <a className="brand" href="#start" aria-label="ACM 协会首页"><span className="brand-symbol font-mono" aria-hidden="true">{'{'}<span>·</span>{'}'}</span><span className="font-mono brand-word">ACM<span className="brand-sub">GUIT / 2026</span></span></a>
        <nav className="desktop-nav" aria-label="主导航">{nav.map(item => <a key={item.id} href={`#${item.id}`} className={cn(active === item.id && 'is-active')}>{item.label}</a>)}</nav>
        <div className="header-actions">
          <button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'} title={theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'}><span className="theme-toggle-icon" aria-hidden="true">{theme === 'dark' ? <Sun size={15}/> : <Moon size={15}/>}</span></button>
          <button className="icon-button motion-toggle" onClick={toggleMotion} aria-label={motionEnabled ? '暂停环境动画' : '启用环境动画'} title={motionEnabled ? '暂停环境动画' : '启用环境动画'}>{motionEnabled ? <Pause size={15}/> : <Play size={15}/>}</button>
          <a href="#join" className="nav-join">加入我们 <ArrowUpRight size={16}/></a>
          <button className="icon-button mobile-menu-button" onClick={() => setOpen(v=>!v)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open?'关闭导航':'展开导航'}>{open?<X size={21}/>:<Menu size={21}/>}</button>
        </div>
      </div>
      {open && <nav id="mobile-menu" className="mobile-nav" aria-label="手机导航">{nav.map(item => <a key={item.id} href={`#${item.id}`} onClick={()=>setOpen(false)}><span>{item.label}</span><span className="font-mono">{item.en}</span></a>)}<a href="#join" onClick={()=>setOpen(false)}>加入我们 <ArrowUpRight size={18}/></a></nav>}
    </header>
    <nav className="chapter-rail" aria-label="探索进度">{progress.map((p,i)=><a key={p.id} href={`#${p.id}`} className={cn('font-mono',active===p.id&&'is-active')}><span className="rail-dot"/><span className="rail-label">0{i+1} {p.en}</span></a>)}<span className={cn('rail-status font-mono',accepted&&'text-accent')}>{accepted?'ACCEPTED':'EXPLORING'}</span></nav>
  </>
}
