import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ActivityCard } from '../components/ActivityCard'
import { PageHeader } from '../components/PageHeader'
import { activities, categoryInfo } from '../data/catalog'
import type { Category, Difficulty } from '../types/models'

export function ActivitiesPage() {
  const [params, setParams] = useSearchParams()
  const initialCategory = params.get('category') ?? 'All'
  const [category, setCategory] = useState(initialCategory)
  const [difficulty, setDifficulty] = useState('All')
  const filtered = useMemo(() => activities.filter((activity) => (category === 'All' || activity.category === category) && (difficulty === 'All' || activity.difficulty === difficulty)), [category, difficulty])
  const selectCategory = (value: string) => { setCategory(value); value === 'All' ? setParams({}) : setParams({ category: value }) }
  return <div className="section-wrap page"><PageHeader eyebrow="20 ways to begin" title="What will you make today?">Choose a path that sounds interesting. Difficulty means how many steps an activity has, never how clever you are.</PageHeader><div className="filters" aria-label="Activity filters"><label>Category<select value={category} onChange={(event) => selectCategory(event.target.value)}><option>All</option>{Object.keys(categoryInfo).map((item) => <option key={item}>{item as Category}</option>)}</select></label><label>Difficulty<select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}><option>All</option>{(['Beginner', 'Explorer', 'Creator'] satisfies Difficulty[]).map((item) => <option key={item}>{item}</option>)}</select></label><p aria-live="polite">Showing <strong>{filtered.length}</strong> activities</p></div><div className="activity-grid">{filtered.map((activity) => <ActivityCard activity={activity} key={activity.id} />)}</div>{filtered.length === 0 && <div className="empty-state"><span aria-hidden="true">🧭</span><h2>No activities match yet</h2><p>Try a different category or difficulty.</p><button className="button" onClick={() => { setCategory('All'); setDifficulty('All'); setParams({}) }}>Clear filters</button></div>}</div>
}
