import { Link, useParams } from 'react-router-dom'
import { difficultyIcon } from '../components/ActivityCard'
import { useActivity } from '../context/AppContext'
import { categoryInfo } from '../data/catalog'
import { NotFoundPage } from './NotFoundPage'

export function ActivityDetailPage() {
  const { id } = useParams()
  const activity = useActivity(id)
  if (!activity) return <NotFoundPage activity />
  const info = categoryInfo[activity.category]
  return <div className="section-wrap detail-page"><Link className="back-link" to="/activities">← All activities</Link><header className={`detail-hero accent-${info.color}`}><div><p className="eyebrow">{info.icon} {activity.category}</p><h1>{activity.title}</h1><p className="hero-subtitle">{activity.description}</p><div className="card-meta"><span>{difficultyIcon[activity.difficulty]} {activity.difficulty}</span><span>◷ About {activity.estimatedTime} minutes</span></div></div><div className="detail-icon" aria-hidden="true">{info.icon}</div></header><div className="detail-layout"><div className="detail-main"><section><h2>Why try this?</h2><p>{activity.whyInteresting}</p></section>{activity.challenge && <section className="challenge-preview"><p className="eyebrow">Your challenge</p><h2>{activity.challenge}</h2></section>}<section><h2>Your mission</h2><ol className="instruction-list">{activity.instructions.map((instruction, index) => <li key={instruction}><span>{index + 1}</span><p>{instruction}</p></li>)}</ol></section><section><h2>Creative tips</h2><div className="tips-grid">{activity.prompts.map((prompt) => <p key={prompt}>✦ {prompt}</p>)}</div></section></div><aside className="start-panel"><p>Ready to begin?</p><h2>Make it your own.</h2><p>There is room for your way of thinking. You can save and return whenever you like.</p><Link className="button button-large" to={`/create/${activity.id}`}>Start Creating <span aria-hidden="true">→</span></Link><small>🔒 Saved privately on this device</small></aside></div></div>
}
