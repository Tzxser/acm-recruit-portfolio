import { ExperienceProvider } from '@/components/experience-provider'
import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Welcome, Training } from '@/components/welcome-training'
import { GrowthPaths } from '@/components/growth-paths'
import { AlgorithmArena } from '@/components/algorithm-arena'
import { CompetitionUniverse } from '@/components/competition-universe'
import { CompetitionRadar } from '@/components/competition-radar'
import { RealMoments } from '@/components/real-moments'
import { SkillMap } from '@/components/skill-map'
import { JoinUs } from '@/components/join-us'

export default function Page() {
  return <ExperienceProvider><SiteHeader/><main id="main"><Hero/><Welcome/><Training/><GrowthPaths/><AlgorithmArena/><CompetitionUniverse/><CompetitionRadar/><RealMoments/><SkillMap/><JoinUs/></main></ExperienceProvider>
}
