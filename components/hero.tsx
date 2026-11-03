'use client'

import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { AlgorithmGraph } from './algorithm-graph'
import { useExperience } from './experience-provider'

export function Hero() {
  const {motionEnabled}=useExperience()
  return <>
    <section id="start" className="hero page-width">
      <div className="hero-top-label font-mono"><span className="recruitment-label"><i className="status-dot"/> 2026 RECRUITMENT</span><span className="hero-location">GUILIN, CHINA <span className="text-primary">↗</span></span></div>
      <div className="hero-main">
        <motion.div className="hero-copy" initial={motionEnabled?{opacity:0,y:12}:false} animate={{opacity:1,y:0}} transition={{duration:0.65}}>
          <p className="school-label">桂林信息科技学院</p>
          <h1>ACM算法与竞赛协会</h1>
          <p className="hero-slogan">从第一行代码，<br/>到第一次 <span className="text-primary font-mono">AC<span className="cursor-mark">_</span></span></p>
          <p className="hero-description">算法训练、项目实践、AI 探索、竞赛组队。<br/>零基础，也可以从新人培训开始。</p>
          <div className="hero-ctas"><a href="#welcome" className="action-button">探索协会 <ArrowRight size={18}/></a><a href="#radar" className="action-button secondary">查看 2026 赛事 <ArrowUpRight size={18}/></a></div>
          <div className="hero-note"><span className="tiny-cross">+</span> 不限专业 <span>·</span> 欢迎零基础 <span>·</span> 一起把想法写成现实</div>
        </motion.div>
        <AlgorithmGraph/>
      </div>
      <div className="hero-bottom"><a href="#welcome" className="scroll-prompt font-mono"><ArrowDown size={16}/> SCROLL TO EXPLORE</a><span className="font-mono hero-bottom-copy">WRITE. BUILD. COMPETE. <span className="text-primary">TOGETHER.</span></span><span className="font-mono hero-index">01 — 10</span></div>
    </section>
    <div className="discipline-strip" aria-label="协会探索方向"><div className="page-width discipline-inner font-mono"><span>ALGORITHM</span><i>+</i><span>SOFTWARE</span><i>+</i><span>AI & DATA</span><i>+</i><span>INNOVATION</span><i>+</i><span>TEAMWORK</span></div></div>
  </>
}
