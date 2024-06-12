export interface TUser {
  id: string
  name: string
  github: string
  email: string
  image: string
  expirience: string
  work: string
  skills: TSkill[]
  portfolio: string
  projects: TProject[]
  phone: string
  tg: string
  tg_bot: string
}

export interface TProject {
  id: string
  title: string
  description: string
  email: string
  image: string
  tags: string
  repository: string
  live: string
}

export interface TSkill {
  id: string
  title: string
  image: string
}
export enum ECountry {
  RU = 'RU',
  KZ = 'KZ',
  EN = 'EN'
}
