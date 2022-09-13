export type TeamData = {
  img: string
  name: string
  description?: string
  linkedInProfile?: string
}

export const data: TeamData[] = [
  {
    img: '/img/team-photos/GratsielaShtereva.jpg',
    name: 'Грациела Щeрева',
    description: 'Проектен мениджмънт',
    linkedInProfile: 'https://www.linkedin.com/in/gratsiela-shtereva-2a9596100/',
  },
  {
    img: '/img/team-photos/IlkoKacharov.jpg',
    name: 'Илко Качаров',
    description: 'Софтуерна разработка, Технически лийд',
    linkedInProfile: 'https://www.linkedin.com/in/ilko-kacharov/',
  },
  {
    img: '/img/team-photos/RadianaKoleva.jpg',
    name: 'Радиана Колева',
    description: 'Маркетинг',
    linkedInProfile: 'https://www.linkedin.com/in/radiana-koleva/',
  },
  {
    img: '/img/team-photos/AniKalpachka.jpg',
    name: 'Ани Калпачка',
    description: 'Софтуерна разработка, фронтенд',
    linkedInProfile: 'https://www.linkedin.com/in/ani-kalpachka-937170105/',
  },
  {
    img: '/img/team-photos/NeliRadkova.jpg',
    name: 'Нели Радкова',
    description: 'Софтуерна разработка',
    linkedInProfile: 'https://www.linkedin.com/in/neli-radkova-8771041b6/',
  },
]
