import { useEffect, useState } from 'react'
import {
  HashRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import './App.css'
import {
  appointmentDatesList,
  centers,
  dashboardStatuses,
  defaultUpcomingAppointment,
  doctors,
  labResults,
  patientProfile,
  promotions,
  slotCatalog,
  specialties,
  visitHistory,
} from './mockData'

const tabs = [
  { to: '/', label: 'Главная', icon: 'home' },
  { to: '/centers', label: 'Центры', icon: 'location_on' },
  { to: '/doctors', label: 'Врачи', icon: 'stethoscope' },
  { to: '/cabinet', label: 'Кабинет', icon: 'person' },
]

const doctorColors = ['#dff6f3', '#fde7e7', '#e8efff', '#fff1d8', '#efe6ff', '#dff0ff']

function readStoredAppointment() {
  try {
    const raw = window.localStorage.getItem('med-demo-upcoming')
    return raw ? JSON.parse(raw) : defaultUpcomingAppointment
  } catch {
    return defaultUpcomingAppointment
  }
}

function readStoredCenter() {
  try {
    return window.localStorage.getItem('med-demo-center') || centers[0].id
  } catch {
    return centers[0].id
  }
}

function AppShell() {
  const [selectedCenterId, setSelectedCenterId] = useState(readStoredCenter)
  const [upcomingAppointment, setUpcomingAppointment] = useState(readStoredAppointment)
  const [statusTick, setStatusTick] = useState(0)

  useEffect(() => {
    window.localStorage.setItem('med-demo-center', selectedCenterId)
  }, [selectedCenterId])

  useEffect(() => {
    if (upcomingAppointment) {
      window.localStorage.setItem(
        'med-demo-upcoming',
        JSON.stringify(upcomingAppointment),
      )
      return
    }
    window.localStorage.removeItem('med-demo-upcoming')
  }, [upcomingAppointment])

  const appState = {
    selectedCenterId,
    setSelectedCenterId,
    upcomingAppointment,
    setUpcomingAppointment,
    statusTick,
    refreshStatus: () => setStatusTick((value) => value + 1),
  }

  return (
    <div className="app-shell">
      <TopBar />
      <StatusBar />
      <main className="app-main">
        <Routes>
          <Route index element={<HomePage appState={appState} />} />
          <Route
            path="/centers"
            element={<CentersPage appState={appState} />}
          />
          <Route
            path="/doctors"
            element={<DoctorsPage />}
          />
          <Route
            path="/booking"
            element={<BookingPage appState={appState} />}
          />
          <Route
            path="/cabinet"
            element={<CabinetPage appState={appState} />}
          />
          <Route path="/analyses" element={<AnalysesPage />} />
          <Route path="/result/:resultId" element={<ResultPlaceholderPage />} />
          <Route path="/success" element={<SuccessPage appState={appState} />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}

function TopBar() {
  return (
    <header className="topbar">
      <div>
        <p className="brand-kicker">PWA demo</p>
        <h1>МедСервис</h1>
      </div>
      <div className="topbar-actions">
        <button className="icon-button" type="button" aria-label="Уведомления">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="avatar">ДП</div>
      </div>
    </header>
  )
}

function StatusBar() {
  return (
    <div className="statusbar">
      <span className="material-symbols-outlined">calendar_today</span>
      <span>Демо-режим. Все данные и запись работают как интерактивный прототип.</span>
    </div>
  )
}

function BottomNav() {
  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`
          }
        >
          <span className="material-symbols-outlined">{tab.icon}</span>
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

function HomePage({ appState }) {
  const navigate = useNavigate()
  const center = centers.find((item) => item.id === appState.selectedCenterId) || centers[0]
  const upcomingDoctor = doctors.find(
    (item) => item.id === appState.upcomingAppointment?.doctorId,
  )

  return (
    <div className="page-stack">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Панель пациента</p>
          <h2>Добро пожаловать. Здесь собраны запись, анализы и центры.</h2>
          <p className="hero-copy">
            Интерфейс показывает демо-сценарий без реальной авторизации и без отправки
            данных во внешние системы.
          </p>
        </div>
        <button className="secondary-button" type="button" onClick={appState.refreshStatus}>
          Обновить статус
        </button>
      </section>

      <section className="status-grid">
        {dashboardStatuses.map((status, index) => (
          <article key={status.id} className="status-card">
            <div className="status-card__icon">
              <span className="material-symbols-outlined">
                {index === 0 ? 'event_available' : 'lab_profile'}
              </span>
            </div>
            <div>
              <p className="status-card__title">{status.title}</p>
              <strong>{status.value}</strong>
              {index === 0 && appState.upcomingAppointment ? (
                <p className="muted-line">
                  {appState.upcomingAppointment.dateLabel}, {appState.upcomingAppointment.time}
                </p>
              ) : null}
              {index === 1 ? <p className="muted-line">Последняя синхронизация #{appState.statusTick + 1}</p> : null}
            </div>
          </article>
        ))}
      </section>

      <section className="quick-actions">
        <button className="primary-action" type="button" onClick={() => navigate('/booking')}>
          <span className="material-symbols-outlined">add_circle</span>
          Записаться к врачу
        </button>
        <button className="soft-action" type="button" onClick={() => navigate('/analyses')}>
          <span className="material-symbols-outlined">description</span>
          Мои анализы
        </button>
        <button className="soft-action" type="button" onClick={() => navigate('/centers')}>
          <span className="material-symbols-outlined">location_on</span>
          Наши центры
        </button>
      </section>

      <section className="two-column">
        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Ближайшая запись</p>
              <h3>{appState.upcomingAppointment ? 'Прием подтвержден' : 'Записи пока нет'}</h3>
            </div>
            <span className="material-symbols-outlined accent-icon">event</span>
          </div>
          {appState.upcomingAppointment ? (
            <>
              <p className="card-text">
                {appState.upcomingAppointment.dateLabel}, {appState.upcomingAppointment.weekday},{' '}
                {appState.upcomingAppointment.time}
              </p>
              <p className="muted-line">
                {appState.upcomingAppointment.specialty} {appState.upcomingAppointment.doctorName}
              </p>
              <p className="muted-line">{center.address}</p>
              {upcomingDoctor ? <p className="muted-line">{upcomingDoctor.about}</p> : null}
              <div className="row-actions">
                <button
                  className="danger-button"
                  type="button"
                  onClick={() => {
                    if (window.confirm('Отменить демо-запись?')) {
                      appState.setUpcomingAppointment(null)
                    }
                  }}
                >
                  Отменить
                </button>
                <button
                  className="ghost-button"
                  type="button"
                  onClick={() =>
                    navigate(
                      `/booking?doctor=${appState.upcomingAppointment.doctorId}&center=${appState.upcomingAppointment.centerId}`,
                    )
                  }
                >
                  Перенести
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="card-text">
                У вас пока нет записей. Можно открыть форму и выбрать специалиста или
                направление.
              </p>
              <button className="primary-button" type="button" onClick={() => navigate('/booking')}>
                Записаться
              </button>
            </>
          )}
        </article>

        <article className="card card--gradient">
          <div className="card-header">
            <div>
              <p className="eyebrow">Текущий центр</p>
              <h3>{center.name}</h3>
            </div>
            <span className="material-symbols-outlined accent-icon">apartment</span>
          </div>
          <p className="card-text">{center.address}</p>
          <p className="muted-line">
            {center.metro} · {center.hours}
          </p>
          <p className="muted-line">{center.description}</p>
          <div className="row-actions">
            <Link className="ghost-button link-button" to="/centers">
              Открыть карту
            </Link>
            <Link className="ghost-button link-button" to={`/booking?center=${center.id}`}>
              Записаться здесь
            </Link>
          </div>
        </article>
      </section>

      <section className="section-block">
        <div className="section-head">
          <div>
            <p className="eyebrow">Новости и акции</p>
            <h3>Что нового и что выгодно</h3>
          </div>
        </div>
        <div className="promo-grid">
          {promotions.map((promo) => (
            <article key={promo.id} className="promo-card">
              <span className="promo-badge">{promo.badge}</span>
              <h4>{promo.title}</h4>
              <p>{promo.text}</p>
              <button
                className="text-button"
                type="button"
                onClick={() => {
                  if (promo.action === 'К центрам') {
                    navigate('/centers')
                    return
                  }
                  navigate('/booking')
                }}
              >
                {promo.action}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="two-column">
        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Анализы</p>
              <h3>Последние результаты</h3>
            </div>
            <span className="material-symbols-outlined accent-icon">biotech</span>
          </div>
          <div className="list-block">
            {labResults.slice(0, 3).map((result) => (
              <Link
                key={result.id}
                className="list-item"
                to={`/result/${result.id}`}
              >
                <div>
                  <strong>{result.title}</strong>
                  <p>{result.date}</p>
                </div>
                <span className="material-symbols-outlined">picture_as_pdf</span>
              </Link>
            ))}
          </div>
          <Link className="ghost-button link-button" to="/analyses">
            Все анализы
          </Link>
        </article>

        <article className="card">
          <div className="card-header">
            <div>
              <p className="eyebrow">Специальности</p>
              <h3>Популярные направления</h3>
            </div>
            <span className="material-symbols-outlined accent-icon">stethoscope</span>
          </div>
          <div className="specialties-grid">
            {specialties.slice(0, 6).map((specialty) => (
              <button
                key={specialty}
                className="specialty-tile"
                type="button"
                onClick={() => navigate(`/doctors?specialty=${encodeURIComponent(specialty)}`)}
              >
                <span className="material-symbols-outlined">favorite</span>
                {specialty}
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="callback-banner">
        <div>
          <p className="eyebrow">Не нашли нужный сценарий</p>
          <h3>Закажите обратный звонок или позвоните нам</h3>
          <p className="hero-copy">+7 (495) 100-20-30 · в демо-кнопке открывается только прототипный отклик.</p>
        </div>
        <button
          className="primary-button"
          type="button"
          onClick={() => window.alert('Демо: запрос на обратный звонок не отправляется.')}
        >
          Заказать звонок
        </button>
      </section>
    </div>
  )
}

function CentersPage({ appState }) {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const filteredCenters = centers.filter((center) =>
    `${center.name} ${center.address} ${center.metro}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Карта и список</p>
          <h2>Медицинские центры</h2>
        </div>
        <input
          className="search-input"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Поиск по названию, улице или метро"
        />
      </section>

      <section className="map-card">
        <div className="map-surface">
          {centers.map((center) => (
            <button
              key={center.id}
              type="button"
              className={`map-pin${appState.selectedCenterId === center.id ? ' map-pin--active' : ''}`}
              style={{ left: center.mapX, top: center.mapY }}
              onClick={() => appState.setSelectedCenterId(center.id)}
              aria-label={center.name}
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          ))}
          <div className="map-overlay">Демо-карта филиалов</div>
        </div>
      </section>

      <section className="cards-grid">
        {filteredCenters.map((center) => (
          <article
            key={center.id}
            className={`card${appState.selectedCenterId === center.id ? ' card--selected' : ''}`}
          >
            <div className="card-header">
              <div>
                <p className="eyebrow">{center.distance}</p>
                <h3>{center.name}</h3>
              </div>
              <span className="pill">{center.metro}</span>
            </div>
            <p className="card-text">{center.address}</p>
            <p className="muted-line">{center.hours}</p>
            <p className="muted-line">{center.phone}</p>
            <p className="muted-line">{center.description}</p>
            <div className="row-actions">
              <button
                className="primary-button"
                type="button"
                onClick={() => appState.setSelectedCenterId(center.id)}
              >
                Выбрать
              </button>
              <button
                className="ghost-button"
                type="button"
                onClick={() => navigate(`/booking?center=${center.id}`)}
              >
                Записаться
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

function DoctorsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const specialtyFilter = searchParams.get('specialty') || ''
  const query = searchParams.get('q') || ''

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty = specialtyFilter ? doctor.specialty === specialtyFilter : true
    const matchesQuery = query
      ? `${doctor.name} ${doctor.specialty}`.toLowerCase().includes(query.toLowerCase())
      : true
    return matchesSpecialty && matchesQuery
  })

  return (
    <div className="page-stack">
      <section className="page-header page-header--stack">
        <div>
          <p className="eyebrow">Выбор специалиста</p>
          <h2>Врачи</h2>
        </div>
        <div className="filters-row">
          <input
            className="search-input"
            value={query}
            onChange={(event) => {
              const next = new URLSearchParams(searchParams)
              if (event.target.value) {
                next.set('q', event.target.value)
              } else {
                next.delete('q')
              }
              setSearchParams(next)
            }}
            placeholder="Поиск по врачу или специальности"
          />
          <select
            className="select-input"
            value={specialtyFilter}
            onChange={(event) => {
              const next = new URLSearchParams(searchParams)
              if (event.target.value) {
                next.set('specialty', event.target.value)
              } else {
                next.delete('specialty')
              }
              setSearchParams(next)
            }}
          >
            <option value="">Все специальности</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="cards-grid">
        {filteredDoctors.map((doctor, index) => {
          const center = centers.find((item) => item.id === doctor.centerId)

          return (
            <article key={doctor.id} className="doctor-card">
              <div className="doctor-card__head">
                <div
                  className="doctor-avatar"
                  style={{ backgroundColor: doctorColors[index % doctorColors.length] }}
                >
                  {doctor.name
                    .split(' ')
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join('')}
                </div>
                <div>
                  <h3>{doctor.name}</h3>
                  <p className="card-text">
                    {doctor.specialty} · {doctor.experience}
                  </p>
                  <p className="muted-line">
                    {center?.name} · рейтинг {doctor.rating}
                  </p>
                </div>
              </div>
              <p className="muted-line">{doctor.about}</p>
              <div className="chips-row">
                {doctor.badges.map((badge) => (
                  <span key={badge} className="pill pill--soft">
                    {badge}
                  </span>
                ))}
              </div>
              <button
                className="primary-button"
                type="button"
                onClick={() =>
                  navigate(
                    `/booking?doctor=${doctor.id}&center=${doctor.centerId}&specialty=${encodeURIComponent(doctor.specialty)}`,
                  )
                }
              >
                Записаться на прием
              </button>
            </article>
          )
        })}
      </section>
    </div>
  )
}

function BookingPage({ appState }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [mode, setMode] = useState(searchParams.get('specialty') ? 'specialty' : 'doctor')
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    searchParams.get('specialty') || '',
  )
  const [selectedDoctorId, setSelectedDoctorId] = useState(searchParams.get('doctor') || '')
  const [selectedCenterId, setSelectedCenterId] = useState(
    searchParams.get('center') || appState.selectedCenterId,
  )
  const [selectedDate, setSelectedDate] = useState(appointmentDatesList[0].iso)
  const [selectedTime, setSelectedTime] = useState('')
  const [form, setForm] = useState({
    fullName: patientProfile.fullName,
    phone: patientProfile.phone,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const doctorsByMode = doctors.filter((doctor) => {
    if (mode === 'specialty' && selectedSpecialty) {
      return doctor.specialty === selectedSpecialty
    }
    return true
  })

  const resolvedDoctorId = doctorsByMode.some((doctor) => doctor.id === selectedDoctorId)
    ? selectedDoctorId
    : (doctorsByMode[0]?.id ?? '')
  const selectedDoctor =
    doctors.find((doctor) => doctor.id === resolvedDoctorId) || doctorsByMode[0]
  const selectedCenter = centers.find((center) => center.id === selectedCenterId) || centers[0]
  const availableDates = selectedDoctor ? Object.keys(slotCatalog[selectedDoctor.id] || {}) : []
  const normalizedDate = availableDates.includes(selectedDate) ? selectedDate : availableDates[0]
  const slots = selectedDoctor ? slotCatalog[selectedDoctor.id]?.[normalizedDate] || [] : []

  const submitBooking = async (event) => {
    event.preventDefault()
    if (!selectedDoctor || !normalizedDate || !selectedTime) {
      navigate('/error')
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => window.setTimeout(resolve, 900))

    const dateMeta = appointmentDatesList.find((item) => item.iso === normalizedDate)

    appState.setSelectedCenterId(selectedCenterId)
    appState.setUpcomingAppointment({
      id: `${selectedDoctor.id}-${normalizedDate}-${selectedTime}`,
      doctorId: selectedDoctor.id,
      centerId: selectedCenterId,
      specialty: selectedDoctor.specialty,
      doctorName: selectedDoctor.name,
      dateLabel: dateMeta?.label || normalizedDate,
      weekday: dateMeta?.weekday || '',
      time: selectedTime,
      patientName: form.fullName,
      patientPhone: form.phone,
    })

    navigate('/success')
  }

  return (
    <div className="page-stack">
      <section className="page-header page-header--stack">
        <div>
          <p className="eyebrow">Форма записи</p>
          <h2>Гибкий сценарий: к врачу или по направлению</h2>
        </div>
        <div className="segmented-control">
          <button
            type="button"
            className={mode === 'doctor' ? 'segmented-control__item is-active' : 'segmented-control__item'}
            onClick={() => setMode('doctor')}
          >
            К врачу
          </button>
          <button
            type="button"
            className={mode === 'specialty' ? 'segmented-control__item is-active' : 'segmented-control__item'}
            onClick={() => setMode('specialty')}
          >
            По направлению
          </button>
        </div>
      </section>

      <div className="booking-layout">
        <div className="page-stack">
          {mode === 'specialty' ? (
            <section className="card">
              <p className="eyebrow">Шаг 1</p>
              <h3>Выберите специальность</h3>
              <div className="specialties-grid">
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    type="button"
                  className={`specialty-tile${selectedSpecialty === specialty ? ' specialty-tile--active' : ''}`}
                    onClick={() => {
                      setSelectedSpecialty(specialty)
                      setSelectedTime('')
                    }}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          <section className="card">
            <p className="eyebrow">{mode === 'doctor' ? 'Шаг 1' : 'Шаг 2'}</p>
            <h3>Выберите врача</h3>
            <div className="doctor-picker">
              {doctorsByMode.map((doctor) => (
                <button
                  key={doctor.id}
                  type="button"
                  className={`doctor-option${selectedDoctor?.id === doctor.id ? ' doctor-option--active' : ''}`}
                    onClick={() => {
                      setSelectedDoctorId(doctor.id)
                      setSelectedCenterId(doctor.centerId)
                      setSelectedTime('')
                    }}
                  >
                  <div>
                    <strong>{doctor.name}</strong>
                    <p>
                      {doctor.specialty} · {doctor.experience}
                    </p>
                  </div>
                  <span>{doctor.rating}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="card">
            <p className="eyebrow">Шаг {mode === 'doctor' ? '2' : '3'}</p>
            <h3>Выберите дату и время</h3>
            <div className="date-row">
              {appointmentDatesList.map((date) => {
                const disabled = !availableDates.includes(date.iso)
                return (
                  <button
                    key={date.iso}
                    type="button"
                    disabled={disabled}
                    className={`date-chip${normalizedDate === date.iso ? ' date-chip--active' : ''}`}
                    onClick={() => {
                      setSelectedDate(date.iso)
                      setSelectedTime('')
                    }}
                  >
                    <span>{date.label}</span>
                    <small>{date.weekday}</small>
                  </button>
                )
              })}
            </div>
            <div className="slot-grid">
              {slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`slot-chip${selectedTime === slot ? ' slot-chip--active' : ''}`}
                  onClick={() => setSelectedTime(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </section>
        </div>

        <form className="summary-card" onSubmit={submitBooking}>
          <p className="eyebrow">Итоговая форма</p>
          <h3>Данные пациента</h3>
          <label className="field">
            <span>ФИО</span>
            <input
              value={form.fullName}
              onChange={(event) =>
                setForm((current) => ({ ...current, fullName: event.target.value }))
              }
              placeholder="Введите имя"
            />
          </label>
          <label className="field">
            <span>Телефон</span>
            <input
              value={form.phone}
              onChange={(event) =>
                setForm((current) => ({ ...current, phone: event.target.value }))
              }
              placeholder="+7 (___) ___-__-__"
            />
          </label>
          <div className="summary-card__details">
            <p>
              <strong>Врач:</strong> {selectedDoctor?.name || 'Не выбран'}
            </p>
            <p>
              <strong>Направление:</strong> {selectedDoctor?.specialty || selectedSpecialty || 'Не выбрано'}
            </p>
            <p>
              <strong>Центр:</strong> {selectedCenter.name}
            </p>
            <p>
              <strong>Слот:</strong>{' '}
              {normalizedDate && selectedTime ? `${normalizedDate} · ${selectedTime}` : 'Не выбран'}
            </p>
          </div>
          <button className="primary-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Отправить заявку (демо)'}
          </button>
          <p className="muted-line">
            В демо-режиме форма не отправляется во внешний backend. После отправки
            показывается сценарий подтверждения.
          </p>
        </form>
      </div>
    </div>
  )
}

function CabinetPage({ appState }) {
  const [tab, setTab] = useState('profile')

  return (
    <div className="page-stack">
      <section className="profile-hero">
        <div className="profile-avatar">ДП</div>
        <div>
          <p className="eyebrow">Личный кабинет</p>
          <h2>{patientProfile.fullName}</h2>
          <p className="hero-copy">Демо-доступ без авторизации, с редактируемым сценарием записи.</p>
        </div>
      </section>

      <div className="tab-row">
        <button
          type="button"
          className={tab === 'profile' ? 'tab-row__item is-active' : 'tab-row__item'}
          onClick={() => setTab('profile')}
        >
          Мои данные
        </button>
        <button
          type="button"
          className={tab === 'visits' ? 'tab-row__item is-active' : 'tab-row__item'}
          onClick={() => setTab('visits')}
        >
          История посещений
        </button>
        <button
          type="button"
          className={tab === 'labs' ? 'tab-row__item is-active' : 'tab-row__item'}
          onClick={() => setTab('labs')}
        >
          Анализы
        </button>
      </div>

      {tab === 'profile' ? (
        <section className="cards-grid cards-grid--two">
          <InfoCard label="ФИО" value={patientProfile.fullName} />
          <InfoCard label="Дата рождения" value={patientProfile.birthDate} />
          <InfoCard label="Пол" value={patientProfile.gender} />
          <InfoCard label="Телефон" value={patientProfile.phone} />
          <InfoCard label="Полис" value={patientProfile.policy} />
          <article className="card">
            <p className="eyebrow">Состояние демо</p>
            <h3>{appState.upcomingAppointment ? 'Есть активная запись' : 'Активной записи нет'}</h3>
            <p className="muted-line">
              {appState.upcomingAppointment
                ? `${appState.upcomingAppointment.dateLabel}, ${appState.upcomingAppointment.time}`
                : 'Можно перейти в форму записи и создать новый сценарий.'}
            </p>
            <Link className="primary-button link-button" to="/booking">
              Записаться
            </Link>
          </article>
        </section>
      ) : null}

      {tab === 'visits' ? (
        <section className="list-block">
          {visitHistory.map((visit) => (
            <article key={visit.id} className="history-item">
              <div>
                <strong>
                  {visit.specialty}: {visit.doctor}
                </strong>
                <p>{visit.date}</p>
                <p>{visit.center}</p>
              </div>
              <Link className="ghost-button link-button" to="/booking">
                Повторить
              </Link>
            </article>
          ))}
        </section>
      ) : null}

      {tab === 'labs' ? <AnalysesList /> : null}
    </div>
  )
}

function AnalysesPage() {
  return (
    <div className="page-stack">
      <section className="page-header">
        <div>
          <p className="eyebrow">Раздел кабинета</p>
          <h2>Результаты анализов</h2>
        </div>
      </section>
      <AnalysesList />
    </div>
  )
}

function AnalysesList() {
  return (
    <section className="list-block">
      {labResults.map((result) => (
        <Link key={result.id} className="history-item" to={`/result/${result.id}`}>
          <div>
            <strong>{result.title}</strong>
            <p>{result.date}</p>
            <p>{result.status}</p>
          </div>
          <span className="material-symbols-outlined">download</span>
        </Link>
      ))}
    </section>
  )
}

function ResultPlaceholderPage() {
  const location = useLocation()
  const resultId = location.pathname.split('/').pop()
  const result = labResults.find((item) => item.id === resultId)

  return (
    <div className="page-stack">
      <section className="hero-card">
        <div>
          <p className="eyebrow">PDF-заглушка</p>
          <h2>{result?.title || 'Результат анализа'}</h2>
          <p className="hero-copy">
            Для демо используется экран-заглушка и статический PDF-файл. Если нужен именно
            файл, он лежит в `public/demo-result.pdf`.
          </p>
        </div>
        <a className="primary-button link-button" href="./demo-result.pdf" target="_blank" rel="noreferrer">
          Открыть PDF
        </a>
      </section>
    </div>
  )
}

function SuccessPage({ appState }) {
  return (
    <div className="centered-state">
      <div className="state-card">
        <span className="material-symbols-outlined state-card__icon">task_alt</span>
        <h2>Заявка обработана как демо-сценарий</h2>
        <p>
          В реальную систему запись не отправлялась. В интерфейсе сохранен сценарий
          ближайшего приема:
        </p>
        {appState.upcomingAppointment ? (
          <p className="state-card__summary">
            {appState.upcomingAppointment.dateLabel}, {appState.upcomingAppointment.time} ·{' '}
            {appState.upcomingAppointment.specialty} · {appState.upcomingAppointment.doctorName}
          </p>
        ) : null}
        <div className="row-actions row-actions--center">
          <Link className="primary-button link-button" to="/">
            На главную
          </Link>
          <Link className="ghost-button link-button" to="/cabinet">
            В кабинет
          </Link>
        </div>
      </div>
    </div>
  )
}

function ErrorPage() {
  return (
    <div className="centered-state">
      <div className="state-card">
        <span className="material-symbols-outlined state-card__icon state-card__icon--error">
          error
        </span>
        <h2>Сценарий не собран</h2>
        <p>Для демо-записи нужно выбрать врача, дату и время. После этого форму можно отправить.</p>
        <Link className="primary-button link-button" to="/booking">
          Вернуться к записи
        </Link>
      </div>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="centered-state">
      <div className="state-card">
        <span className="material-symbols-outlined state-card__icon">search_off</span>
        <h2>404</h2>
        <p>Страница не найдена. Для демо доступны главная, центры, врачи, запись и кабинет.</p>
        <Link className="primary-button link-button" to="/">
          На главную
        </Link>
      </div>
    </div>
  )
}

function InfoCard({ label, value }) {
  return (
    <article className="card">
      <p className="eyebrow">{label}</p>
      <h3>{value}</h3>
    </article>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  )
}
