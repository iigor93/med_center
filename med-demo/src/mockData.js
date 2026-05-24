const formatDate = (date, options) =>
  new Intl.DateTimeFormat('ru-RU', options).format(date)

const addDays = (amount) => {
  const next = new Date()
  next.setHours(0, 0, 0, 0)
  next.setDate(next.getDate() + amount)
  return next
}

const appointmentDates = [1, 2, 4, 6].map((offset) => {
  const date = addDays(offset)
  return {
    id: date.toISOString().slice(0, 10),
    iso: date.toISOString().slice(0, 10),
    label: formatDate(date, { day: 'numeric', month: 'long' }),
    weekday: formatDate(date, { weekday: 'short' }),
  }
})

export const specialties = [
  'Терапевт',
  'ЛОР',
  'Окулист',
  'Хирург',
  'Кардиолог',
  'Невролог',
]

export const centers = [
  {
    id: 'center-prospect-mira',
    name: 'Центр на Проспекте Мира',
    address: 'пр. Мира, 10',
    hours: 'Ежедневно 08:00-21:00',
    metro: 'Проспект Мира',
    distance: '2.4 км',
    phone: '+7 (495) 100-20-30',
    description:
      'Флагманский центр с диагностикой, терапией и быстрым доступом к анализам.',
    mapX: '28%',
    mapY: '30%',
  },
  {
    id: 'center-city',
    name: 'Семейная клиника Сити',
    address: 'Пресненская наб., 12',
    hours: 'Пн-Сб 07:30-20:00',
    metro: 'Деловой центр',
    distance: '4.1 км',
    phone: '+7 (495) 100-20-31',
    description:
      'Удобно для приема после работы, есть детское отделение и check-up программы.',
    mapX: '52%',
    mapY: '47%',
  },
  {
    id: 'center-kids',
    name: 'Диагностический центр Север',
    address: 'ул. Академика Королева, 18',
    hours: 'Пн-Пт 08:00-20:00',
    metro: 'ВДНХ',
    distance: '5.8 км',
    phone: '+7 (495) 100-20-32',
    description:
      'Филиал с акцентом на лабораторию, кардиологию и расширенную диагностику.',
    mapX: '71%',
    mapY: '63%',
  },
]

export const doctors = [
  {
    id: 'volkov',
    name: 'Александр Волков',
    specialty: 'Кардиолог',
    experience: '12 лет стажа',
    rating: 4.9,
    centerId: 'center-city',
    badges: ['Кандидат наук', 'Рекомендуем'],
    about:
      'Работает с профилактикой, check-up и ведением пациентов после кардионагрузок.',
  },
  {
    id: 'sokolova',
    name: 'Елена Соколова',
    specialty: 'Терапевт',
    experience: '9 лет стажа',
    rating: 4.8,
    centerId: 'center-prospect-mira',
    badges: ['Популярный выбор'],
    about:
      'Спокойный прием, удобна как первый контакт для маршрутизации пациента.',
  },
  {
    id: 'morozov',
    name: 'Илья Морозов',
    specialty: 'ЛОР',
    experience: '14 лет стажа',
    rating: 4.7,
    centerId: 'center-prospect-mira',
    badges: ['Детский прием'],
    about:
      'Принимает взрослых и детей, ведет повторные визиты и контроль лечения.',
  },
  {
    id: 'smirnova',
    name: 'Анна Смирнова',
    specialty: 'Окулист',
    experience: '11 лет стажа',
    rating: 4.9,
    centerId: 'center-kids',
    badges: ['Точная диагностика'],
    about:
      'Подбор маршрута обследования, консультации и сопровождение после диагностики.',
  },
  {
    id: 'kozlov',
    name: 'Дмитрий Козлов',
    specialty: 'Хирург',
    experience: '16 лет стажа',
    rating: 4.8,
    centerId: 'center-city',
    badges: ['Высшая категория'],
    about:
      'Консультации перед вмешательствами и постоперационное наблюдение.',
  },
  {
    id: 'petrova',
    name: 'Мария Петрова',
    specialty: 'Невролог',
    experience: '13 лет стажа',
    rating: 4.8,
    centerId: 'center-kids',
    badges: ['Без ожидания'],
    about:
      'Помогает быстро сориентироваться по симптомам и плану обследований.',
  },
]

export const slotCatalog = {
  volkov: {
    [appointmentDates[0].iso]: ['10:00', '11:30', '14:00'],
    [appointmentDates[1].iso]: ['09:30', '12:00', '16:30'],
  },
  sokolova: {
    [appointmentDates[0].iso]: ['10:00', '12:00', '18:00'],
    [appointmentDates[2].iso]: ['09:00', '13:30', '15:00'],
  },
  morozov: {
    [appointmentDates[1].iso]: ['11:00', '13:00', '17:30'],
    [appointmentDates[3].iso]: ['10:30', '12:30'],
  },
  smirnova: {
    [appointmentDates[0].iso]: ['08:30', '11:00'],
    [appointmentDates[2].iso]: ['10:30', '16:00'],
  },
  kozlov: {
    [appointmentDates[1].iso]: ['14:00', '15:30'],
    [appointmentDates[3].iso]: ['09:00', '11:30', '13:00'],
  },
  petrova: {
    [appointmentDates[0].iso]: ['12:30', '16:00'],
    [appointmentDates[2].iso]: ['09:30', '11:00', '17:00'],
  },
}

export const promotions = [
  {
    id: 'promo-therapy',
    badge: '-20%',
    title: 'Скидка на первичный прием терапевта до конца месяца',
    text: 'Подходит для первого знакомства с сервисом и быстрого старта маршрута лечения.',
    action: 'Записаться',
  },
  {
    id: 'promo-checkup',
    badge: 'Check-up',
    title: 'Бесплатный мини-check-up для новых пациентов',
    text: 'Короткий маршрут с консультацией, базовой диагностикой и рекомендациями.',
    action: 'Узнать больше',
  },
  {
    id: 'promo-schedule',
    badge: 'Новости',
    title: 'Обновили график работы центров на длинные выходные',
    text: 'Часть филиалов будет работать в продленном режиме для срочных консультаций.',
    action: 'К центрам',
  },
]

export const labResults = [
  {
    id: 'cbc',
    title: 'Общий анализ крови',
    date: '18 мая 2026',
    status: 'Готов',
  },
  {
    id: 'tsh',
    title: 'ТТГ',
    date: '16 мая 2026',
    status: 'Готов',
  },
  {
    id: 'bio',
    title: 'Биохимия расширенная',
    date: '12 мая 2026',
    status: 'Готов',
  },
]

export const visitHistory = [
  {
    id: 'visit-1',
    doctor: 'Елена Соколова',
    specialty: 'Терапевт',
    center: 'Центр на Проспекте Мира',
    date: '14 апреля 2026, 10:30',
  },
  {
    id: 'visit-2',
    doctor: 'Александр Волков',
    specialty: 'Кардиолог',
    center: 'Семейная клиника Сити',
    date: '28 марта 2026, 15:00',
  },
]

export const patientProfile = {
  fullName: 'Демо Пациент',
  birthDate: '12.05.1985',
  gender: 'Мужской',
  phone: '+7 (999) 555-00-11',
  policy: '7800 0000 0000 1234',
}

export const defaultUpcomingAppointment = {
  id: 'upcoming-demo',
  doctorId: 'sokolova',
  centerId: 'center-prospect-mira',
  specialty: 'Терапевт',
  doctorName: 'Елена Соколова',
  dateLabel: appointmentDates[0].label,
  weekday: appointmentDates[0].weekday,
  time: '10:00',
}

export const dashboardStatuses = [
  {
    id: 'appointments',
    title: 'Ближайшая запись',
    value: 'Есть активная запись',
  },
  {
    id: 'labs',
    title: 'Анализы',
    value: 'Новые результаты: 2',
  },
]

export const appointmentDatesList = appointmentDates
