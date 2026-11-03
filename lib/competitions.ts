export const CONTENT_DATE = '2026-09-08'
export type CompetitionStatus = 'ended' | 'ongoing' | 'upcoming' | 'pending'
export type Stage = { name: string; date: string; month?: number; endMonth?: number }
export type OfficialSource = {
  officialUrl: string
  scheduleUrl: string
  sourceLabel: string
  lastVerified: string
  verificationNote: string
}
export type Competition = OfficialSource & {
  id: string; name: string; shortName: string; subtitle: string; category: string[]; year: number
  registration: string; stages: Stage[]; status: CompetitionStatus; officialSchedule: string
  associationRelation: 'organized' | 'explore'; description: string; note?: string
  nextStage: { name: string; date: string }
  upcoming?: { date: string; label: string; summary: string }
}
export const statusLabels: Record<CompetitionStatus, string> = {
  ended: '已结束', ongoing: '进行中', upcoming: '即将开始', pending: '官方赛程待公布',
}
const nextPending = { name: '等待官方发布赛程', date: 'SCHEDULE PENDING' }
const cyclePending = { name: '关注下一周期', date: '官方日程待公布' }

export const competitions: Competition[] = [
  {
    id: 'icpc', name: 'ICPC 国际大学生程序设计竞赛', shortName: 'ICPC', subtitle: '2026–2027 ASIA EAST',
    category: ['ALGORITHM'], year: 2026, registration: '新赛季报名及各站安排以 ICPC 官方最新通知为准。',
    stages: [{ name: '2026–2027 Asia East 赛程', date: 'SCHEDULE PENDING' }],
    status: 'pending', officialSchedule: '官方赛程待公布', associationRelation: 'organized',
    officialUrl: 'https://icpc.global/', scheduleUrl: 'https://icpc.global/regionals/finder/Asia-East-Online-II-2027',
    sourceLabel: 'ICPC 官方 · 2026 Asia Regionals Online Contest II', lastVerified: CONTENT_DATE,
    verificationNote: '所链接官方赛程页仍显示 No schedule available；不填入推测日期。',
    description: '在有限时间里，与队友一起拆解问题、设计算法、提交代码。算法竞技，从一道题开始。',
    note: '这里展示新赛季待公布状态，不将往届日期或未经确认的单站日期写入时间轴。', nextStage: nextPending,
  },
  {
    id: 'ccpc', name: '中国大学生程序设计竞赛', shortName: 'CCPC', subtitle: '2026 新赛季',
    category: ['ALGORITHM'], year: 2026, registration: '2026 新赛季报名及比赛安排等待 CCPC 官方通知。',
    stages: [{ name: '2026 新赛季完整日程', date: 'SCHEDULE PENDING' }], status: 'pending',
    officialSchedule: '未见完整的新赛季官方日程', associationRelation: 'organized',
    officialUrl: 'https://ccpc.io/', scheduleUrl: 'https://ccpc.io/', sourceLabel: 'CCPC 官方网站 · 最新赛事与公告', lastVerified: CONTENT_DATE,
    verificationNote: '官网仍展示 2025 各场比赛安排与第十一届总决赛；不据此推算 2026 新赛季。',
    description: '把数据结构、搜索、动态规划与团队协作放进同一场比赛。',
    note: '上届全国总决赛与 2026 新赛季不是同一赛程，本时间轴不混用。', nextStage: nextPending,
  },
  {
    id: 'lanqiao', name: '第十七届蓝桥杯全国软件和信息技术专业人才大赛', shortName: '蓝桥杯', subtitle: 'THE 17TH LAN QIAO CUP',
    category: ['ALGORITHM', 'SOFTWARE'], year: 2026, registration: '2025.10—2025.12.15（第十七届、2026 赛程）',
    stages: [{ name: '省赛', date: '04 月', month: 4 }, { name: '全国总决赛', date: '06 月中上旬', month: 6 }],
    status: 'ended', officialSchedule: '赛道具体安排以官方通知为准', associationRelation: 'organized',
    officialUrl: 'https://dasai.lanqiao.cn/', scheduleUrl: 'https://dasai.lanqiao.cn/', sourceLabel: '蓝桥杯大赛官网', lastVerified: CONTENT_DATE,
    verificationNote: '已复核官方入口；本届历史月份沿用原版资料，未新增报名日期。',
    description: '从编程基础出发，用一道道问题练习思考与实现，探索算法与软件能力。',
    nextStage: { name: '第18届蓝桥杯', date: 'COMING SOON · 日程待公布' },
  },
  {
    id: 'software', name: '中国软件杯大学生软件设计大赛', shortName: '中国软件杯', subtitle: '第十五届 · BUILD SOMETHING REAL',
    category: ['SOFTWARE'], year: 2026, registration: '03.24—07.20 15:00（延期原文待复核）',
    stages: [{ name: '报名与作品提交', date: '03.24—07.20 15:00', month: 3, endMonth: 7 }, { name: '全国总决赛', date: '08 月', month: 8 }],
    status: 'ended', officialSchedule: '历史赛程参考；延期原文待复核', associationRelation: 'organized',
    officialUrl: 'https://www.cnsoftbei.com/', scheduleUrl: 'https://www.cnsoftbei.com/list-1-1.html', sourceLabel: '中国软件杯官方网站 · 新闻动态', lastVerified: CONTENT_DATE,
    verificationNote: '可访问的官网首页仍展示旧届内容；当前日期沿用资料，不标注为已完成官方原文核验。',
    description: '围绕真实问题做软件，把开发、工程实践和项目表达连接起来。',
    note: '原资料截止日为 06.30，后续资料为 07.20；请以组委会最新原文为准。', nextStage: cyclePending,
  },
  {
    id: 'ican', name: 'iCAN 大学生创新创业大赛', shortName: 'iCAN', subtitle: '第二十届 · INNOVATION & ENTREPRENEURSHIP',
    category: ['INNOVATION', 'AI'], year: 2026, registration: '创新赛报名、作品制作及材料提交：04.01—08.31，已结束。',
    stages: [{ name: '报名与作品制作', date: '04.01—08.31', month: 4, endMonth: 8 }, { name: '校内赛', date: '09.01—09.15', month: 9 }, { name: '区域赛', date: '09.19—10.25', month: 9, endMonth: 10 }, { name: '全国总决赛', date: '11 月中下旬', month: 11 }],
    status: 'ongoing', officialSchedule: '创新赛全国阶段安排，以赛区通知为准', associationRelation: 'organized',
    officialUrl: 'https://www.g-ican.com/', scheduleUrl: 'https://www.g-ican.com/', sourceLabel: 'iCAN 大赛官网 · 创新赛', lastVerified: CONTENT_DATE,
    verificationNote: '官方入口已核对；阶段日期按本轮赛事资料整理，具体执行以赛区通知为准。',
    description: '让技术与创意成为能解决问题的作品。智慧软件、教育、医疗、农业……跨专业合作也有自己的赛场。',
    note: '校内赛阶段不代表我校已发布选拔通知；协会组织参赛方向不等于当前仍开放报名。',
    nextStage: { name: '区域赛', date: '09.19—10.25' },
    upcoming: { date: '09.19 → 10.25', label: 'iCAN 区域赛', summary: '09.01—15 校内赛 · 11 月中下旬全国总决赛' },
  },
  {
    id: '4c', name: '中国大学生计算机设计大赛', shortName: '4C', subtitle: '第19届 · 中国大学生计算机设计大赛',
    category: ['SOFTWARE', 'DESIGN', 'AI'], year: 2026, registration: '各省 / 区域赛安排不同，没有全国统一报名截止日。',
    stages: [{ name: '六个赛区全国决赛', date: '07.17—08.20', month: 7, endMonth: 8 }], status: 'ended',
    officialSchedule: '按作品类别与赛区分别安排', associationRelation: 'organized',
    officialUrl: 'https://jsjds.blcu.edu.cn/', scheduleUrl: 'https://jsjds.blcu.edu.cn/', sourceLabel: '中国大学生计算机设计大赛组委会', lastVerified: CONTENT_DATE,
    verificationNote: '官网已发布 2026 决赛落幕与评审结果信息；具体赛区日期以通知为准。',
    description: '软件、AI 应用、数据可视化、数字媒体、游戏与交互。给不同兴趣留下位置。', nextStage: cyclePending,
  },
  {
    id: 'gplt', name: '中国高校计算机大赛·团体程序设计天梯赛', shortName: 'GPLT', subtitle: '第十一届 · 团体程序设计天梯赛',
    category: ['ALGORITHM'], year: 2026, registration: '报名与参赛资格以官方通知为准。',
    stages: [{ name: '全国比赛', date: '04.18', month: 4 }], status: 'ended', officialSchedule: '本届赛事已结束', associationRelation: 'explore',
    officialUrl: 'https://gplt.patest.cn/', scheduleUrl: 'https://gplt.patest.cn/', sourceLabel: '团体程序设计天梯赛官网', lastVerified: CONTENT_DATE,
    verificationNote: '已核对官方入口；历史日期沿用原版资料，动态通知请在官网查看。',
    description: '关注方向：数据结构、字符串、搜索、图论与团队程序设计，寻找更多算法练习的赛场。', nextStage: cyclePending,
  },
  {
    id: 'aigc', name: '中国高校计算机大赛·AIGC 创新赛', shortName: 'AIGC', subtitle: '第三届 · AIGC 创新赛',
    category: ['AI', 'DESIGN'], year: 2026, registration: '应用赛道报名及初赛作品：03.16—05.11',
    stages: [{ name: '应用赛道初赛', date: '03.16—05.11', month: 3, endMonth: 5 }, { name: '复赛', date: '05.25—07.06', month: 5, endMonth: 7 }, { name: '全国线下决赛', date: '08.22—08.24', month: 8 }],
    status: 'ended', officialSchedule: '应用赛道安排', associationRelation: 'explore',
    officialUrl: 'https://aigc.vivo.com.cn/', scheduleUrl: 'https://aigc.vivo.com.cn/', sourceLabel: 'AIGC 创新赛官网 · 南开大学 / vivo', lastVerified: CONTENT_DATE,
    verificationNote: '官方入口已复核；部分动态文档需要在官网菜单内打开。',
    description: '关注方向：用生成式 AI 实现应用与创作。面向高校在校生，不限专业，可跨年级、跨专业组队。', nextStage: cyclePending,
  },
  {
    id: 'ccsp', name: 'CCF 大学生计算机系统与程序设计竞赛', shortName: 'CCF CCSP', subtitle: 'CCSP 2026 · ALGORITHM / SYSTEM',
    category: ['ALGORITHM', 'SYSTEM'], year: 2026, registration: '报名资格与窗口等待官方具体参赛通知，不使用往年报名日期。',
    stages: [{ name: 'CCSP 2026 · 成都', date: '10.21—10.22', month: 10 }], status: 'upcoming',
    officialSchedule: 'CCF 官方活动日历已公布日期', associationRelation: 'explore',
    officialUrl: 'https://www.ccf.org.cn/ccsp/', scheduleUrl: 'https://www.ccf.org.cn/Activities/Event_calendar/ccsp_dd/2026-03-26/866913.shtml',
    sourceLabel: '中国计算机学会 · 2026 CCSP 官方活动日历', lastVerified: CONTENT_DATE,
    verificationNote: '已核验 2026.03.26 官方日历原文：10.21—10.22，四川省成都市，具体场地待定。',
    description: '以算法、系统与程序设计能力为核心的大学生竞赛。CCSP 是竞赛，不是 CCF CSP 软件能力认证。',
    nextStage: { name: 'CCSP 2026', date: '10.21—10.22' },
    upcoming: { date: '10.21 → 10.22', label: 'CCF CCSP 2026', summary: 'Algorithm / System · 报名细则以官方通知为准' },
  },
]

export const additionalCompetitions: Competition[] = [
  {
    id: 'cumcm', name: '全国大学生数学建模竞赛', shortName: '数学建模', subtitle: 'CUMCM 2026 · CROSS-DISCIPLINARY',
    category: ['跨学科', '数学建模'], year: 2026, registration: '报名通过官方指定平台，由学校与赛区组织；具体参赛资格请查校内通知。',
    stages: [{ name: '竞赛开始 / 赛题发布', date: '09.10 18:00', month: 9 }, { name: '竞赛结束', date: '09.13', month: 9 }],
    status: 'upcoming', officialSchedule: '全国竞赛安排', associationRelation: 'explore',
    officialUrl: 'https://www.mcm.edu.cn/', scheduleUrl: 'https://www.mcm.edu.cn/', sourceLabel: '全国大学生数学建模竞赛 · 组委会官网', lastVerified: CONTENT_DATE,
    verificationNote: '官网已明确 2026.09.10 18:00 发布赛题；比赛至 09.13，论文提交要求以官方通知为准。',
    description: '把现实问题转化成模型，结合数学、编程、数据分析与论文表达，体验跨学科协作。',
    note: '仅作关注探索方向展示，不代表协会已组织参赛。时间均为北京时间。',
    nextStage: { name: '竞赛开始', date: '09.10 18:00' },
    upcoming: { date: '09.10 / 18:00', label: '全国大学生数学建模竞赛', summary: '09.13 结束 · 数学、编程与表达的跨学科协作' },
  },
  {
    id: 'innovation', name: '中国国际大学生创新大赛（2026）', shortName: '中国国际大学生创新大赛', subtitle: '2026 · INNOVATION / ENTREPRENEURSHIP',
    category: ['创新创业', '跨专业'], year: 2026, registration: '08.10 开始报名，09.25 12:00 全国统一报名截止。学校 / 省级截止时间可能更早。',
    stages: [{ name: '全国统一报名', date: '08.10—09.25 12:00', month: 8, endMonth: 9 }, { name: '校赛 / 省赛', date: '08—10 月', month: 8, endMonth: 10 }, { name: '全国总决赛', date: '11 月', month: 11 }],
    status: 'ongoing', officialSchedule: '全国报名与三级赛制安排', associationRelation: 'explore',
    officialUrl: 'https://cy.ncss.cn/', scheduleUrl: 'https://cy.ncss.cn/information/2c93f4c69dfca46a019f91aa6535008a',
    sourceLabel: '全国大学生创业服务网 · 教育部办赛通知', lastVerified: CONTENT_DATE,
    verificationNote: '已定位教育部 2026.07.24 通知；日期按本轮资料整理，报名以官方系统及校内通知为准。',
    description: '把技术、产品、创意与社会需求连接起来。不同专业可以围绕同一个问题组成团队。',
    note: '关注探索方向，不表示协会已组织参赛；全国截止日期不等于本校截止日期。',
    nextStage: { name: '全国统一报名截止', date: '09.25 12:00' },
    upcoming: { date: '09.25 / 12:00', label: '中国国际大学生创新大赛', summary: '08.10 起报名 · 08—10 月校赛 / 省赛 · 11 月总决赛' },
  },
]

export const upcomingCompetitions = [additionalCompetitions[0], competitions[4], additionalCompetitions[1], competitions[8]]
export const nextCycle: OfficialSource & { name: string; status: string } = {
  name: '第18届蓝桥杯', status: 'COMING SOON / OFFICIAL SCHEDULE PENDING',
  officialUrl: 'https://dasai.lanqiao.cn/', scheduleUrl: 'https://dasai.lanqiao.cn/', sourceLabel: '蓝桥杯大赛官方入口', lastVerified: CONTENT_DATE,
  verificationNote: '下一周期入口。报名与比赛日期尚未确认，不沿用第十七届安排。',
}
export const exploreMore: (OfficialSource & { id: string; name: string; category: string; competition?: Competition })[] = [
  { ...additionalCompetitions[0], category: '跨学科 / 关注探索', competition: additionalCompetitions[0] },
  { ...additionalCompetitions[1], category: '创新创业 / 跨专业', competition: additionalCompetitions[1] },
  { id: 'ciscn', name: 'CISCN 信息安全竞赛', category: 'SECURITY / 关注探索', officialUrl: 'http://www.ciscn.cn/', scheduleUrl: 'http://www.ciscn.cn/', sourceLabel: '全国大学生信息安全竞赛官网', lastVerified: CONTENT_DATE, verificationNote: '官网 HTTP 入口可访问，HTTPS 证书异常；仅提供公开信息导航，不在此收集账号或个人信息。' },
  { id: 'c4-network', name: 'C4 网络技术挑战赛', category: 'NETWORK / 关注探索', officialUrl: 'http://net.c4best.cn/', scheduleUrl: 'http://net.c4best.cn/', sourceLabel: '中国高校计算机大赛 · 网络技术挑战赛官方入口', lastVerified: CONTENT_DATE, verificationNote: '官方 HTTP 入口可打开，HTTPS 证书名称不匹配；动态页面可能加载较慢。' },
]
