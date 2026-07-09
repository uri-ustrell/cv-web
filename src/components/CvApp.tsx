'use client'

import type { LocaleContent, SharedContent } from '@/content/types'
import { useGameState } from '@/hooks/useGameState'
import type { Locale } from '@/lib/locales'
import { AboutPanel } from './AboutPanel'
import { Coin } from './Coin'
import { ContactPanel } from './ContactPanel'
import { CrtOverlay } from './CrtOverlay'
import { EducationGrid } from './EducationGrid'
import { Hero } from './Hero'
import { Hud } from './Hud'
import { InterestsPanel } from './InterestsPanel'
import { ProjectGrid } from './ProjectGrid'
import { QuestLog } from './QuestLog'
import { Section, sectionMeta } from './Section'
import { SkillGrid } from './SkillGrid'
import { Terminal } from './Terminal'
import { ToastStack } from './ToastStack'

interface CvAppProps {
  locale: Locale
  content: LocaleContent
  shared: SharedContent
  avatarSrc?: string
}

export const CvApp = ({ locale, content, shared, avatarSrc }: CvAppProps) => {
  const game = useGameState({
    achievements: content.achievements,
    icons: shared.achievementIcons,
    timings: shared.timings,
    beeps: shared.beeps,
  })

  const sectionCoin = (id: string, title: string) => (
    <Coin
      id={id}
      title={title}
      collected={game.collectedCoins.has(id)}
      onCollect={game.collectCoin}
    />
  )

  const terminal = sectionMeta(shared, 'terminal')
  const about = sectionMeta(shared, 'about')
  const skills = sectionMeta(shared, 'skills')
  const experience = sectionMeta(shared, 'experience')
  const projects = sectionMeta(shared, 'projects')
  const education = sectionMeta(shared, 'education')
  const interests = sectionMeta(shared, 'interests')

  return (
    <>
      <CrtOverlay />
      <Hud
        ui={content.ui}
        level={game.level}
        xpPct={game.xpPct}
        achievementCount={game.achievementCount}
        achievementTotal={game.achievementTotal}
        coins={game.coins}
        coinTotal={game.coinTotal}
        muted={game.muted}
        onToggleMute={game.toggleMute}
      />
      <main>
        <Hero
          profile={content.profile}
          ui={content.ui}
          links={shared.links}
          mpPct={shared.mpPct}
          avatarSrc={avatarSrc}
          coinCollected={game.collectedCoins.has('hero')}
          onCollectCoin={game.collectCoin}
          coinTitle={content.ui.coinTitleFirst}
        />

        <Section
          id="terminal"
          achKey={terminal.achKey}
          num={terminal.num}
          accent={terminal.accent}
          title={content.terminal.title}
          tight
        >
          <Terminal
            content={content.terminal}
            getStats={() => ({
              level: game.level,
              achievements: game.achievementCount,
              achievementsTotal: game.achievementTotal,
              coins: game.coins,
              coinsTotal: game.coinTotal,
            })}
            onFirstCommand={() => game.unlock('hacker')}
            beepEnter={() => game.beep(shared.beeps.terminalEnter)}
            beepClear={() => game.beep(shared.beeps.terminalClear)}
          />
        </Section>

        <Section
          id="about"
          achKey={about.achKey}
          num={about.num}
          accent={about.accent}
          title={content.about.title}
        >
          <AboutPanel about={content.about} />
        </Section>

        <Section
          id="skills"
          achKey={skills.achKey}
          num={skills.num}
          accent={skills.accent}
          title={content.skills.title}
          coin={sectionCoin('skills', content.ui.coinTitle)}
        >
          <SkillGrid groups={shared.skillGroups} />
        </Section>

        <Section
          id="experience"
          achKey={experience.achKey}
          num={experience.num}
          accent={experience.accent}
          title={content.experience.title}
          coin={sectionCoin('experience', content.ui.coinTitle)}
        >
          <QuestLog
            experience={content.experience}
            jobs={shared.jobs}
            pastLives={shared.pastLives}
          />
        </Section>

        <Section
          id="projects"
          achKey={projects.achKey}
          num={projects.num}
          accent={projects.accent}
          title={content.projects.title}
          coin={sectionCoin('projects', content.ui.coinTitle)}
        >
          <ProjectGrid projects={shared.projects} copy={content.projects} ui={content.ui} />
        </Section>

        <Section
          id="education"
          achKey={education.achKey}
          num={education.num}
          accent={education.accent}
          title={content.education.title}
        >
          <EducationGrid entries={shared.education} copy={content.education} />
        </Section>

        <Section
          id="interests"
          achKey={interests.achKey}
          num={interests.num}
          accent={interests.accent}
          title={content.interests.title}
          coin={sectionCoin('interests', content.ui.coinTitleLast)}
        >
          <InterestsPanel interests={shared.interests} copy={content.interests} />
        </Section>

        <ContactPanel
          contact={content.contact}
          ui={content.ui}
          links={shared.links}
          locale={locale}
        />
      </main>
      <ToastStack toasts={game.toasts} title={content.ui.toastTitle} />
    </>
  )
}
