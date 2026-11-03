'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion,useScroll,useTransform } from 'motion/react'
import { Maximize2 } from 'lucide-react'
import { SectionHeading } from './welcome-training'
import { useExperience } from './experience-provider'
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription } from '@/components/ui/dialog'

const photos=[{src:'/images/showcase-placeholder.jpg',alt:'同学们在机房参加编程培训，面向投影与电脑练习',file:'training_01.jpg',caption:'坐下来，从第一道题开始。'}, {src:'/images/showcase-placeholder.jpg',alt:'协会培训现场，同学们在电脑前听讲与进行编程练习',file:'training_02.jpg',caption:'有问题，就一起找到答案。'}]
export function RealMoments(){
  const ref=useRef<HTMLElement>(null)
  const [selected,setSelected]=useState<number|null>(null)
  const {motionEnabled}=useExperience()
  const {scrollYProgress}=useScroll({target:ref,offset:['start end','end center']})
  const rotateLeft=useTransform(scrollYProgress,[0,0.9],[-4,0])
  const rotateRight=useTransform(scrollYProgress,[0,0.9],[4,0])
  const yRight=useTransform(scrollYProgress,[0,0.9],[45,0])
  return <section id="moments" ref={ref} className="section moments-section"><div className="page-width"><div className="split-heading"><SectionHeading label="TRAINING.LOG" title="不只是页面上的算法动画。"/><p className="heading-aside">真正的训练，从坐下来写第一道题开始。<br/>普通的教室，认真的我们。</p></div><div className="photo-gallery">{photos.map((photo,i)=><motion.figure className="training-photo" key={photo.file} style={motionEnabled?{rotate:i===0?rotateLeft:rotateRight,y:i===1?yRight:0}:undefined}><div className="photo-toolbar font-mono"><span><i className="status-dot"/> REAL MOMENTS</span><span>{photo.file}</span></div><button className="photo-image-button" onClick={()=>setSelected(i)} aria-label={`放大查看：${photo.alt}`}><Image src={photo.src} alt={photo.alt} width={1280} height={960} sizes="(max-width: 767px) 92vw, 45vw" loading="lazy"/><span className="photo-expand"><Maximize2 size={18}/></span></button><figcaption><span>{photo.caption}</span><span className="font-mono">GUIT ACM</span></figcaption></motion.figure>)}</div><p className="photo-note font-mono"><span className="tiny-cross">+</span> 真实培训记录 · 来自协会提供的现场照片</p></div><Dialog open={selected!==null} onOpenChange={open=>{if(!open)setSelected(null)}}><DialogContent className="photo-dialog sm:max-w-4xl"><DialogHeader><DialogTitle>TRAINING.LOG · 真实培训现场</DialogTitle><DialogDescription>桂林信息科技学院 ACM算法与竞赛协会</DialogDescription></DialogHeader>{selected!==null&&<Image src={photos[selected].src} alt={photos[selected].alt} width={1280} height={960} sizes="90vw" className="expanded-photo"/>}</DialogContent></Dialog></section>
}
