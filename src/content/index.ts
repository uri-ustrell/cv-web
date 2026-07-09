/**
 * Build-time content layer. Every JSON file is imported at module scope, so
 * all copy is baked into the static export — nothing is fetched at runtime.
 */
import type { Locale } from '@/lib/locales'
import caAbout from './ca/about.json'
import caAchievements from './ca/achievements.json'
import caContact from './ca/contact.json'
import caEducation from './ca/education.json'
import caExperience from './ca/experience.json'
import caInterests from './ca/interests.json'
import caProfile from './ca/profile.json'
import caProjects from './ca/projects.json'
import caSkills from './ca/skills.json'
import caTerminal from './ca/terminal.json'
import caUi from './ca/ui.json'
import enAbout from './en/about.json'
import enAchievements from './en/achievements.json'
import enContact from './en/contact.json'
import enEducation from './en/education.json'
import enExperience from './en/experience.json'
import enInterests from './en/interests.json'
import enProfile from './en/profile.json'
import enProjects from './en/projects.json'
import enSkills from './en/skills.json'
import enTerminal from './en/terminal.json'
import enUi from './en/ui.json'
import esAbout from './es/about.json'
import esAchievements from './es/achievements.json'
import esContact from './es/contact.json'
import esEducation from './es/education.json'
import esExperience from './es/experience.json'
import esInterests from './es/interests.json'
import esProfile from './es/profile.json'
import esProjects from './es/projects.json'
import esSkills from './es/skills.json'
import esTerminal from './es/terminal.json'
import esUi from './es/ui.json'
import sharedJson from './shared.json'
import type { LocaleContent, SharedContent } from './types'

const CONTENT: Record<Locale, LocaleContent> = {
  en: {
    profile: enProfile,
    about: enAbout,
    skills: enSkills,
    experience: enExperience,
    projects: enProjects,
    education: enEducation,
    interests: enInterests,
    contact: enContact,
    terminal: enTerminal,
    achievements: enAchievements,
    ui: enUi,
  } as LocaleContent,
  ca: {
    profile: caProfile,
    about: caAbout,
    skills: caSkills,
    experience: caExperience,
    projects: caProjects,
    education: caEducation,
    interests: caInterests,
    contact: caContact,
    terminal: caTerminal,
    achievements: caAchievements,
    ui: caUi,
  } as LocaleContent,
  es: {
    profile: esProfile,
    about: esAbout,
    skills: esSkills,
    experience: esExperience,
    projects: esProjects,
    education: esEducation,
    interests: esInterests,
    contact: esContact,
    terminal: esTerminal,
    achievements: esAchievements,
    ui: esUi,
  } as LocaleContent,
}

export const shared = sharedJson as SharedContent

export const getContent = (locale: Locale): LocaleContent => CONTENT[locale]
