'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight,ArrowUp,Check,Copy,Maximize2 } from 'lucide-react'
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription } from '@/components/ui/dialog'
const QR_URL='/images/showcase-placeholder.jpg'

export function JoinUs(){
  const [open,setOpen]=useState(false)
  const [copyState,setCopyState]=useState<'idle'|'copied'|'error'>('idle')
  const copy=async()=>{try{await navigator.clipboard.writeText('DEMO');setCopyState('copied')}catch{setCopyState('error')}}
  return <><section id="join" className="section join-section"><div className="page-width join-layout"><div className="join-copy"><p className="eyebrow font-mono"><i className="status-dot"/> READY FOR YOUR FIRST COMMIT?</p><p className="join-english font-mono">JOIN<br/>THE TEAM<span className="text-primary">.</span></p><h2>从这里开始。</h2><p className="join-description">不需要等到「准备好了」再来。<br/>如果你愿意学、愿意尝试，就可以先加入我们。</p><div className="join-group"><span className="font-mono text-muted-foreground">QQ GROUP / 2026 招新群</span><div><span className="font-mono group-number">DEMO</span><button className="icon-button" onClick={copy} aria-label="复制 QQ 群号">{copyState==='copied'?<Check size={19}/>:<Copy size={19}/>}</button></div><p className="copy-feedback" aria-live="polite">{copyState==='copied'?'群号已复制，打开 QQ 搜索加入。':copyState==='error'?'暂时无法自动复制，请长按或选中上方群号手动复制。':'不限专业 · 欢迎零基础 · 欢迎你'}</p></div><button className="text-link" onClick={()=>setOpen(true)}>打开原始二维码 <ArrowUpRight size={17}/></button></div>
    <div className="join-qr-block"><div className="qr-topline font-mono"><span>YOUR NEXT CONNECTION</span><span>↗</span></div><button className="qr-button" onClick={()=>setOpen(true)} aria-label="放大查看 QQ 招新群原始二维码"><Image src={QR_URL} alt="2026 ACM算法与竞赛协会 QQ 招新群原始二维码，群号DEMO" width={1280} height={2276} unoptimized loading="lazy" className="qr-image"/></button><div className="qr-bottomline"><span>公开展示版，联系信息已移除。</span><button className="icon-button" onClick={()=>setOpen(true)} aria-label="放大二维码"><Maximize2 size={17}/></button></div></div>
    </div></section><footer className="site-footer page-width"><div className="footer-brand"><a className="font-mono" href="#start">{'{·}'} ACM</a><p>桂林信息科技学院<br/>ACM算法与竞赛协会</p></div><p className="footer-note">一个人写第一行代码，一群人一起走到赛场。<span className="font-mono">GUIT ALGORITHM & COMPETITION ASSOCIATION · 2026</span></p><a href="#start" className="back-to-top" aria-label="回到顶部"><ArrowUp size={18}/></a></footer>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent className="qr-dialog sm:max-w-lg"><DialogHeader><DialogTitle>加入 2026 ACM 招新群</DialogTitle><DialogDescription>展示版无群号 · 使用 QQ 扫码，或保存原图后在 QQ 中识别。</DialogDescription></DialogHeader><Image src={QR_URL} alt="QQ 招新群原始二维码，群号DEMO" width={1280} height={2276} unoptimized className="qr-expanded"/><a className="source-link" href={QR_URL} target="_blank" rel="noopener noreferrer">查看原尺寸图片 / 长按保存 <ArrowUpRight size={16}/></a></DialogContent></Dialog>
  </>
}
