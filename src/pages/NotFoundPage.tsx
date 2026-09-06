import { Link } from 'react-router-dom'

export function NotFoundPage({ activity = false }: { activity?: boolean }) {
  return <div className="centered-state"><div className="state-icon" aria-hidden="true">🧭</div><h1>{activity ? 'We could not find that activity' : 'This page wandered away'}</h1><p>{activity ? 'The link may be old, but there are plenty of other ideas to explore.' : 'Let’s head back to a place you know.'}</p><Link className="button" to={activity ? '/activities' : '/'}>{activity ? 'Explore Activities' : 'Go Home'}</Link></div>
}
