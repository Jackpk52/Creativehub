import { Link } from 'react-router-dom'
import { ActivityCard } from '../components/ActivityCard'
import { RandomIdea } from '../components/RandomIdea'
import { useApp } from '../context/AppContext'
import { activities, categoryInfo } from '../data/catalog'
import type { Category } from '../types/models'

export function HomePage() {
  const { data } = useApp()
  const day = Math.floor(Date.now() / 86_400_000)
  const daily = activities[day % activities.length]
  const unfinished = data.creations.filter((item) => item.status === 'in-progress').slice(0, 3)
  const explored = new Set(data.creations.map((creation) => activities.find((activity) => activity.id === creation.activityId)?.category).filter((category): category is Category => Boolean(category)))
  return (
    <>
      <section className="hero section-wrap">
        <div className="hero-copy"><p className="eyebrow">Welcome to your creative playground</p><h1>Your imagination is your <span>superpower.</span></h1><p className="hero-subtitle">Create something new, solve a problem, and discover what your mind can do.</p><div className="button-row"><Link className="button button-large" to={`/activity/${daily.id}`}>Start Creating <span aria-hidden="true">→</span></Link><Link className="button button-secondary button-large" to="/activities">Explore Activities</Link></div><p className="privacy-note">🔒 No account needed. Your work stays on this device.</p></div>
        <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><span className="hero-bulb">💡</span><span className="float-shape shape-one">✦</span><span className="float-shape shape-two">●</span><span className="float-shape shape-three">▲</span><span className="float-shape shape-four">✎</span></div>
      </section>

      <section className="section-wrap daily-section" aria-labelledby="daily-title">
        <div className="daily-card"><div><p className="eyebrow">Today’s challenge</p><h2 id="daily-title">{daily.title}</h2><p>{daily.description}</p><div className="card-meta"><span>🟡 {daily.difficulty}</span><span>◷ {daily.estimatedTime} min</span></div><Link className="button" to={`/activity/${daily.id}`}>Start Challenge</Link></div><div className="daily-doodle" aria-hidden="true">{categoryInfo[daily.category].icon}</div></div>
      </section>

      <section className="section-wrap" aria-labelledby="explore-title"><div className="section-heading"><div><p className="eyebrow">Pick a path</p><h2 id="explore-title">Explore activities</h2></div><Link to="/activities">See all 20 <span aria-hidden="true">→</span></Link></div><div className="category-grid">{Object.entries(categoryInfo).map(([name, info]) => <Link className={`category-card accent-${info.color}`} to={`/activities?category=${encodeURIComponent(name)}`} key={name}><span className="category-icon" aria-hidden="true">{info.icon}</span><h3>{name}</h3><p>{info.description}</p><span className="text-link">Explore <span aria-hidden="true">→</span></span></Link>)}</div></section>

      <section className="section-wrap idea-section" aria-labelledby="idea-title"><div className="section-heading"><div><p className="eyebrow">A spark when you need one</p><h2 id="idea-title">I’m out of ideas</h2></div></div><RandomIdea /></section>

      {unfinished.length > 0 && <section className="section-wrap" aria-labelledby="continue-title"><div className="section-heading"><div><p className="eyebrow">Pick up where you left off</p><h2 id="continue-title">Continue creating</h2></div><Link to="/creations">My Creations <span aria-hidden="true">→</span></Link></div><div className="mini-grid">{unfinished.map((creation) => { const activity = activities.find((item) => item.id === creation.activityId)!; return <article className="mini-card" key={creation.id}><span aria-hidden="true">{categoryInfo[activity.category].icon}</span><div><p className="eyebrow">{activity.title}</p><h3>{creation.title}</h3><Link to={`/create/${activity.id}?creation=${creation.id}`}>Continue <span aria-hidden="true">→</span></Link></div></article> })}</div></section>}

      <section className="section-wrap skills-section" aria-labelledby="skills-title"><div><p className="eyebrow">Your journey</p><h2 id="skills-title">Every idea grows a skill</h2><p>Explore at your own pace. There are no rankings here, just new things to try.</p><Link className="button button-secondary" to="/progress">See my progress</Link></div><div className="skill-cloud">{Object.entries(categoryInfo).map(([category, info]) => <span className={explored.has(category as Category) ? 'explored' : ''} key={category}>{info.icon} {category}</span>)}</div></section>

      <section className="section-wrap privacy-banner"><div aria-hidden="true">🔐</div><div><h2>Your ideas belong to you</h2><p>Everything you create is private and stored only in this browser. There are no public profiles, comments, followers or ads.</p></div><Link to="/privacy">Learn about privacy</Link></section>
      <section className="section-wrap coach-card"><span aria-hidden="true">✨</span><div><p className="eyebrow">Coming later</p><h2>Creative Coach</h2><p>A future thinking helper that will ask questions, not do your work for you.</p></div></section>
    </>
  )
}
