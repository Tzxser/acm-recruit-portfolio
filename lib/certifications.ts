export const growthPaths = [
  {id:'algorithm',letter:'A',name:'算法竞技',english:'ALGORITHM',color:'blue',intro:'喜欢拆解问题，享受那一刻 AC。',steps:['编程基础','数据结构','基础算法','图论 / DP / 搜索','竞赛训练'],destination:'ICPC / CCPC / 蓝桥杯'},
  {id:'software',letter:'B',name:'项目开发',english:'SOFTWARE',color:'cyan',intro:'有一个想法，就把它做出来。',steps:['Programming','Git & 协作','Frontend / Backend','Database','Engineering'],destination:'中国软件杯 / 计算机设计大赛'},
  {id:'ai',letter:'C',name:'人工智能',english:'AI & DATA',color:'violet',intro:'不只使用 AI，也试着理解和构建。',steps:['Python','Data','Machine Learning','LLM / AIGC','AI Application'],destination:'AIGC / iCAN / 4C'},
  {id:'creative',letter:'D',name:'创意与产品',english:'CREATIVE / PRODUCT',color:'blue',intro:'好作品，也需要代码以外的视角。',steps:['产品与视觉设计','交互与数据表达','创意策划','项目展示','答辩表达'],destination:'iCAN / 4C / AIGC / 软件项目'},
] as const

export const certifications = [
  {id:'csp',name:'CCF CSP',subtitle:'算法设计与编程能力',date:'09.13',detail:'第 43 次认证：09.13；报名 08.17—09.06，已截止。第 41、42 次分别为 03.29、05.31。注意：这里是 CSP 软件能力认证，不是 CSP-J/S。',sourceName:'CCF CSP 官方网站',sourceUrl:'https://www.cspro.org/'},
  {id:'ncre',name:'NCRE',subtitle:'全国计算机等级考试',date:'09.19—09.21',detail:'本校报名缴费：06.25 09:00—07.08 23:55，已截止。考试具体时段及考场以准考证为准。可探索 C、C++、Java、Python、Web、数据库、Office、网络、信息安全、AI 与大模型基础等科目，以考点开考安排为准。',sourceName:'桂林信息科技学院教务科技处通知',sourceUrl:'https://www.guit.edu.cn/jwkj/info/1023/2676.htm'},
  {id:'ruankao',name:'软考',subtitle:'计算机技术与软件专业技术资格（水平）考试',date:'10.24—10.27',detail:'2026 上半年 05.23—05.26，下半年 10.24—10.27。可按方向了解程序员、软件设计师、网络工程师、信息安全工程师、数据库及系统架构相关资格。各资格与地区批次以官方通知和准考证为准。',sourceName:'中国计算机技术职业资格网',sourceUrl:'https://www.ruankao.org.cn/'},
  {id:'huawei',name:'Huawei ICT',subtitle:'HCIA → HCIP → HCIE',date:'按方向查询',detail:'Associate、Professional、Expert 三个层级。可了解 AI、openEuler、openGauss、Big Data、IoT、Cloud、HarmonyOS、Datacom 与 Security。这里仅作学习方向导航，不提供统一考试日期。',sourceName:'华为认证官方网站',sourceUrl:'https://e.huawei.com/cn/talent/#/cert'},
  {id:'aliyun',name:'Alibaba Cloud',subtitle:'ACA → ACP → ACE',date:'按方向查询',detail:'可从大模型工程师 ACA、云计算工程师 ACA 了解起步路线，再按需求探索 Cloud、Big Data、LLM 与 AI。大模型 ACA 也面向初学者及非技术背景学习者，报考要求以官方为准。',sourceName:'阿里云培训与认证',sourceUrl:'https://edu.aliyun.com/certification'},
]
export const skillRoutes = [
  {id:'algorithm',label:'算法',english:'ALGORITHM',description:'从一道题的解法，走向系统的问题解决能力。',skills:['编程基础','数据结构','算法设计','竞赛训练'],competitions:['ICPC','CCPC','蓝桥杯'],certs:['csp']},
  {id:'software',label:'软件开发',english:'SOFTWARE',description:'把想法变成可以使用、可以协作、可以交付的作品。',skills:['Programming','Git','前后端开发','工程实践'],competitions:['中国软件杯','4C'],certs:['ncre','ruankao']},
  {id:'ai',label:'AI',english:'ARTIFICIAL INTELLIGENCE',description:'从 Python 和数据开始，让 AI 成为解决真实问题的工具。',skills:['Python','数据处理','机器学习','AI 应用'],competitions:['AIGC','iCAN'],certs:['aliyun','huawei']},
  {id:'cloud',label:'网络 / 云',english:'NETWORK & CLOUD',description:'理解应用背后的网络、云服务与安全基础。',skills:['网络基础','Linux','云计算','安全与运维'],competitions:['软件项目实践'],certs:['huawei','ruankao','aliyun']},
  {id:'creative',label:'非计算机 / 跨专业',english:'CROSS-DISCIPLINARY',description:'产品、设计、表达与创意，都能成为一个技术团队的重要部分。',skills:['AI 工具','产品与设计','数据表达','项目展示'],competitions:['AIGC 创作','4C','iCAN'],certs:['ncre','aliyun']},
]
