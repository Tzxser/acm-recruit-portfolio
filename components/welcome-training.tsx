import { ArrowRight, CornerDownRight } from 'lucide-react'

export function SectionHeading({label,title,description}:{label:string;title:string;description?:string}) {
  return <div className="section-heading"><p className="eyebrow font-mono"><span className="tiny-cross">+</span>{label}</p><h2 className="text-balance">{title}</h2>{description&&<p className="section-description text-pretty">{description}</p>}</div>
}
const starts = [
  {code:'ZERO',name:'零基础，也欢迎',body:'没学过算法？没关系。带上好奇心，从第一行代码开始。',tag:'从 0 开始'},
  {code:'CODE',name:'学过一点，刚刚好',body:'C / C++ / Java / Python，学过一点，也能找到下一步。',tag:'从兴趣开始'},
  {code:'BUILD',name:'想做东西，就来试试',body:'开发、设计、产品、AI、数据，把想法变成能运行的作品。',tag:'从一个想法开始'},
  {code:'COMPETE',name:'第一次比赛，一起上',body:'不是计算机专业也可以。找到队友，在实践里慢慢成长。',tag:'从一次尝试开始'},
]
export function Welcome() {
  return <section id="welcome" className="section page-width welcome-section">
    <div className="split-heading"><SectionHeading label="YOU CAN START HERE" title="你不需要先成为高手。"/><p className="heading-aside">有人从刷题开始，有人从一个点子开始。<br/>起点不同，但这里总有你的位置。</p></div>
    <div className="starting-points">{starts.map((s,i)=><article className="starting-point" key={s.code}><div className="starting-top"><span className="font-mono start-code">{s.code}</span><span className="start-node" aria-hidden="true">{i===0?'○':i===1?'⌁':i===2?'{ }':'↗'}</span></div><h3>{s.name}</h3><p>{s.body}</p><span className="start-tag"><span className="status-dot"/>{s.tag}</span></article>)}</div>
  </section>
}
const activities = [
  {code:'01',english:'NEWCOMER TRAINING',title:'新人培训',body:'从环境配置、编程基础到第一道题。不用先会，愿意学就可以。'},
  {code:'02',english:'ALGORITHM TRAINING',title:'算法与程序设计训练',body:'学习数据结构与算法，讨论不同解法，也一起找那个藏起来的 bug。'},
  {code:'03',english:'TEAM UP',title:'竞赛组队',body:'认识方向相近的伙伴，练习协作、分工与沟通，一起走向赛场。'},
  {code:'04',english:'BUILD TOGETHER',title:'项目开发与实践',body:'从一个小工具到一份完整作品，把开发、AI、设计和创意连接起来。'},
]
export function Training() {
  return <section id="training" className="section page-width training-section">
    <div className="training-intro"><SectionHeading label="LESS TALK. MORE BUILD." title="不止刷题，也一起做东西。" description="一个人写第一行代码，一群人一起走到赛场。这里的成长，发生在真正动手之后。"/><a href="#moments" className="text-link">看看我们的训练现场 <ArrowUpRightSmall/></a><div className="training-command font-mono"><span className="text-primary">~/guit-acm</span><p><span className="text-accent">$</span> git switch -c your-first-step</p><span className="text-muted-foreground">Switched to a new beginning.</span></div></div>
    <div className="training-list">{activities.map(a=><article className="training-item" key={a.code}><span className="training-number font-mono">{a.code}</span><div><p className="font-mono activity-label">{a.english}</p><h3>{a.title}</h3><p className="activity-body">{a.body}</p></div><CornerDownRight className="training-arrow" size={20}/></article>)}<p className="training-disclaimer">具体培训与活动安排以协会通知为准。</p></div>
  </section>
}
function ArrowUpRightSmall(){ return <ArrowRight size={16} className="diagonal-arrow"/> }
