import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useActivity, useApp } from '../context/AppContext'
import { categoryInfo, workspaceFields } from '../data/catalog'
import type { CreationStatus } from '../types/models'
import { NotFoundPage } from './NotFoundPage'

export function CreatePage() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const activity = useActivity(id)
  const { data, saveCreation } = useApp()
  const creationId = params.get('creation')
  const existing = data.creations.find((item) => item.id === creationId && item.activityId === id)
  const [title, setTitle] = useState(existing?.title ?? '')
  const [content, setContent] = useState<Record<string, string>>(existing?.content ?? {})
  const [savedId, setSavedId] = useState(existing?.id)
  const [message, setMessage] = useState('')
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    if (existing) { setTitle(existing.title); setContent(existing.content); setSavedId(existing.id) }
  }, [existing])

  if (!activity) return <NotFoundPage activity />
  const fields = workspaceFields[activity.activityType]
  const hasWork = title.trim() || Object.values(content).some((value) => value.trim())

  const persist = (status: CreationStatus) => {
    if (!title.trim()) { setMessage('Give your creation a title before saving.'); document.getElementById('creation-title')?.focus(); return }
    if (!Object.values(content).some((value) => value.trim())) { setMessage('Add at least one of your own ideas before saving.'); return }
    try {
      const saved = saveCreation({ id: savedId, activityId: activity.id, title: title.trim(), content, status })
      setSavedId(saved.id)
      if (status === 'completed') navigate('/progress', { state: { completed: activity.title } })
      else setMessage('Saved! You can keep creating or come back later.')
    } catch { setMessage('Your creation could not be saved. Please try again.') }
  }

  const submit = (event: FormEvent) => { event.preventDefault(); persist('in-progress') }
  const clear = () => {
    if (!hasWork || window.confirm('Clear everything in this workspace? This cannot be undone.')) { setTitle(''); setContent({}); setMessage('Workspace cleared.'); setShowExplanation(false) }
  }

  return <div className="workspace-page"><div className="workspace-top section-wrap"><Link className="back-link" to={`/activity/${activity.id}`}>← Back to activity</Link><div><p className="eyebrow">{categoryInfo[activity.category].icon} {activity.category}</p><h1>{activity.title}</h1></div><span className="private-pill">🔒 Private on this device</span></div><div className="workspace-layout section-wrap"><aside className="prompt-panel"><p className="eyebrow">Your mission</p>{activity.challenge ? <p className="challenge-text">{activity.challenge}</p> : <p>{activity.description}</p>}<h2>Try thinking about...</h2><ul>{activity.prompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul><p className="gentle-note">There is no perfect answer. Make it yours, and change it as you go.</p></aside><form className="creation-form" onSubmit={submit} noValidate><div className="form-heading"><div><p className="eyebrow">My workspace</p><h2>Build your idea</h2></div>{message && <p className="form-message" role="status">{message}</p>}</div><label htmlFor="creation-title">{activity.activityType === 'story' ? 'Story title' : activity.activityType === 'code' ? 'Project name' : activity.activityType === 'design' ? 'Design name' : 'Creation title'}<input id="creation-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Give your creation a name..." maxLength={100} /></label>{fields.map((field) => <label key={field.key} htmlFor={`field-${field.key}`}>{field.label}{field.multiline ? <textarea id={`field-${field.key}`} value={content[field.key] ?? ''} onChange={(event) => setContent({ ...content, [field.key]: event.target.value })} placeholder={field.hint} rows={5} maxLength={5000} /> : <input id={`field-${field.key}`} value={content[field.key] ?? ''} onChange={(event) => setContent({ ...content, [field.key]: event.target.value })} placeholder={field.hint} maxLength={500} />}</label>)}{activity.activityType === 'brain' && <div className="answer-box"><button type="button" className="button button-secondary" onClick={() => setShowExplanation((shown) => !shown)}>{showExplanation ? 'Hide explanation' : 'Submit and see explanation'}</button>{showExplanation && <div role="status"><h3>A way to think about it</h3><p>{activity.explanation}</p><p>Your own reasoning matters too. Notice what helped you reach your answer.</p></div>}</div>}<div className="form-actions"><button className="button" type="submit">Save</button><button className="button button-complete" type="button" onClick={() => persist('completed')}>Complete Activity</button><button className="button button-ghost" type="button" onClick={clear}>Clear</button></div></form></div></div>
}
