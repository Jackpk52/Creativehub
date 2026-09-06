import { Link, useLocation } from 'react-router-dom'

const content: Record<string, { title: string; intro: string; sections: { title: string; text: string }[] }> = {
  '/about': { title: 'About CreativeHub', intro: 'A creative playground for young people to imagine, solve and make.', sections: [{ title: 'Why it exists', text: 'CreativeHub puts creating before consuming. Short, flexible activities help build curiosity and confidence without grades or comparison.' }, { title: 'What it is not', text: 'It is not a social network, test or competition. There are no followers, rankings, likes or public profiles.' }] },
  '/privacy': { title: 'Privacy', intro: 'Your ideas belong to you and stay private by default.', sections: [{ title: 'Stored on your device', text: 'Creations, settings and progress use browser local storage. CreativeHub does not send them to a server.' }, { title: 'Minimal information', text: 'No real name, school, address, phone number or precise location is requested. Clearing browser data may remove your work.' }] },
  '/safety': { title: 'Safety', intro: 'CreativeHub is designed for safe, independent exploration.', sections: [{ title: 'A quiet private space', text: 'There is no messaging, public posting, advertising or contact with strangers.' }, { title: 'If you need support', text: 'Pause and speak with a trusted adult if any online experience makes you worried or uncomfortable.' }] },
  '/help': { title: 'Help', intro: 'A few quick answers to keep you creating.', sections: [{ title: 'Where is my work?', text: 'Open My Creations in the main menu. Saved work remains in this browser unless its browser data is cleared.' }, { title: 'Can I change completed work?', text: 'Yes. Open My Creations and choose View or edit. You can keep improving any project.' }, { title: 'A save did not work', text: 'Keep the page open and try again. Check that private browsing or browser storage restrictions are not blocking local storage.' }] },
}

export function InfoPage() {
  const { pathname } = useLocation()
  const page = content[pathname] ?? content['/help']
  return <div className="section-wrap page narrow-page info-page"><p className="eyebrow">CreativeHub guide</p><h1>{page.title}</h1><p className="hero-subtitle">{page.intro}</p>{page.sections.map((section) => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}<Link className="button button-secondary" to="/">Back home</Link></div>
}
