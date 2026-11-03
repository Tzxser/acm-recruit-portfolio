import type { Metadata, Viewport } from 'next'
import { Noto_Sans_SC, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const noto = Noto_Sans_SC({ subsets: ['latin'], variable: '--font-noto', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })

export const metadata: Metadata = {
  title: 'GUIT ACM 2026 招新｜从第一行代码，到第一次 AC',
  description: '桂林信息科技学院 ACM算法与竞赛协会 2026 招新。算法训练、项目开发、AI 探索与竞赛组队，不限专业，欢迎零基础。探索成长路线、2026 赛事时间轴与数字能力地图。',
  applicationName: 'GUIT ACM',
  keywords: ['桂林信息科技学院', 'ACM算法与竞赛协会', '2026招新', 'ICPC', '算法训练', '大学生竞赛'],
  openGraph: { title: '从第一行代码，到第一次 AC。', description: 'GUIT ACM 2026 招新 · 不限专业，欢迎零基础。', locale: 'zh_CN', type: 'website', siteName: 'GUIT ACM算法与竞赛协会' },
}
export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#080B10', width: 'device-width', initialScale: 1 }
const themeInit = `(function(){try{var t=localStorage.getItem('acm-theme');if(t==='light'){var d=document.documentElement;d.classList.remove('dark');d.classList.add('light');d.style.colorScheme='light';}}catch(e){}})();`
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN" suppressHydrationWarning className={`dark bg-background ${noto.variable} ${mono.variable}`}>
    <head><script dangerouslySetInnerHTML={{ __html: themeInit }} /></head>
    <body className="font-sans antialiased">{children}</body>
  </html>
}
