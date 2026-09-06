import type { Activity, AchievementDefinition, ActivityType, Category, Difficulty } from '../types/models'

export const categoryInfo: Record<Category, { icon: string; color: string; description: string }> = {
  'Art & Design': { icon: '🎨', color: 'coral', description: 'Draw, shape and redesign bright new possibilities.' },
  'Idea Lab': { icon: '💡', color: 'yellow', description: 'Turn everyday questions into clever new ideas.' },
  'Brain Challenges': { icon: '🧩', color: 'blue', description: 'Stretch your thinking with patterns and puzzles.' },
  'Story Studio': { icon: '✍️', color: 'purple', description: 'Build characters, worlds and surprising adventures.' },
  'Code Lab': { icon: '💻', color: 'green', description: 'Plan digital projects and think like a developer.' },
  'Discovery Lab': { icon: '🔬', color: 'teal', description: 'Explore science, nature, space and engineering.' },
}

const makeActivity = (
  id: string,
  title: string,
  category: Category,
  description: string,
  whyInteresting: string,
  difficulty: Difficulty,
  estimatedTime: number,
  activityType: ActivityType,
  prompts: string[],
  instructions: string[],
  extra: Pick<Activity, 'challenge' | 'explanation'> = {},
): Activity => ({ id, title, category, description, whyInteresting, difficulty, estimatedTime, activityType, prompts, instructions, ...extra })

export const activities: Activity[] = [
  makeActivity('invent-a-robot', 'Invent a Robot', 'Art & Design', 'Dream up a robot with a surprising purpose and personality.', 'You can mix drawing, design and imagination to make technology feel alive.', 'Beginner', 12, 'design', ['What unusual job does it do?', 'How does it move?', 'Give it one funny feature.'], ['Choose a job for your robot.', 'Describe its shape, controls and materials.', 'Explain what makes it different from robots that already exist.']),
  makeActivity('future-city', 'Design a Future City', 'Art & Design', 'Imagine what a city could look like 100 years from now.', 'Cities combine people, nature, buildings and systems, so every choice creates a new possibility.', 'Explorer', 15, 'design', ['How will people travel?', 'Where does clean energy come from?', 'How does nature fit into the city?'], ['Give your city a name.', 'Plan its transport, buildings, parks and energy.', 'Describe one invention that makes life better.']),
  makeActivity('fictional-character', 'Create a Fictional Character', 'Art & Design', 'Create an original character with goals, strengths and quirks.', 'Characters help us explore different points of view and tell stronger stories.', 'Beginner', 15, 'design', ['What do they care about?', 'What are they learning?', 'What is always in their pocket?'], ['Choose a name and appearance.', 'Give your character a goal and a challenge.', 'Add a surprising habit or talent.']),
  makeActivity('redesign-object', 'Redesign an Everyday Object', 'Art & Design', 'Choose an ordinary object and make it easier or more fun to use.', 'Designers notice small frustrations and turn them into useful improvements.', 'Explorer', 18, 'design', ['Who finds the object difficult to use?', 'Could it use less material?', 'What feature would delight someone?'], ['Pick an object you use safely every day.', 'List what works and what could improve.', 'Describe your redesigned version and why it helps.']),
  makeActivity('helpful-robot', 'Invent a Helpful Robot', 'Idea Lab', 'Invent a robot that helps people, animals or the planet.', 'Helpful inventions begin by understanding a real need.', 'Beginner', 15, 'idea', ['Could it help at home?', 'Could it protect wildlife?', 'How will people control it?'], ['Choose a safe problem to solve.', 'Explain the robot’s main job.', 'Describe how it knows what to do.']),
  makeActivity('future-school', 'Design a Future School', 'Idea Lab', 'Imagine a welcoming school built for curiosity and creativity.', 'Rethinking familiar places reveals what helps people learn and belong.', 'Explorer', 20, 'idea', ['What spaces replace ordinary classrooms?', 'How can everyone take part?', 'What would a creative break look like?'], ['Decide what learners need most.', 'Plan spaces, tools and a typical day.', 'Explain how your school includes different learners.']),
  makeActivity('new-app', 'Invent a New App', 'Idea Lab', 'Plan an app that solves a useful problem without collecting private information.', 'Great digital products balance helpful ideas, simple design and privacy.', 'Creator', 25, 'idea', ['What can users make or do?', 'What data does it really need?', 'How does it avoid endless scrolling?'], ['Name one problem your app solves.', 'Describe its three most important screens.', 'Explain how it stays simple and private.']),
  makeActivity('everyday-problem', 'Solve an Everyday Problem', 'Idea Lab', 'Spot a small daily frustration and design a practical solution.', 'Problem solving starts with noticing, asking why and trying different answers.', 'Explorer', 20, 'idea', ['Who experiences this problem?', 'Can you solve it with fewer parts?', 'What would you test first?'], ['Describe a safe everyday problem.', 'Think of at least two possible solutions.', 'Choose one and explain how you would test it.']),
  makeActivity('logic-challenge', 'Logic Challenge', 'Brain Challenges', 'Use clues to work out which creative club meets on each day.', 'Logic helps you organize clues and explain how you reached an answer.', 'Explorer', 10, 'brain', ['Write down what each clue rules out.', 'Try making a small table.', 'Explain your steps, not just the answer.'], ['Read every clue.', 'Test possibilities one at a time.', 'Submit your answer, then reveal the explanation.'], { challenge: 'Art, Code and Story clubs meet on Monday, Tuesday and Wednesday, one per day. Art is not Monday. Code meets before Story. Story is not Tuesday. Which club meets each day?', explanation: 'Code is Monday, Art is Tuesday and Story is Wednesday. Story cannot be Tuesday, and Code must come before Story, so Story is Wednesday. Art is not Monday, leaving Tuesday for Art and Monday for Code.' }),
  makeActivity('pattern-challenge', 'Pattern Challenge', 'Brain Challenges', 'Find the rule in a growing picture-number pattern.', 'Patterns help us make predictions and notice structure in surprising places.', 'Beginner', 8, 'brain', ['Look at the difference between numbers.', 'Say the pattern aloud.', 'Create the next two steps.'], ['Study the sequence.', 'Describe the rule in your own words.', 'Submit the next two numbers and check the explanation.'], { challenge: 'A tile design grows like this: 2, 5, 8, 11, __, __. What are the next two numbers, and what is the rule?', explanation: 'The next numbers are 14 and 17. Each new design uses 3 more tiles than the one before it.' }),
  makeActivity('lateral-thinking', 'Lateral Thinking Challenge', 'Brain Challenges', 'Find several imaginative uses for a familiar object.', 'Flexible thinking shows that one object or question can have many valid answers.', 'Creator', 15, 'brain', ['Change its size.', 'Use it somewhere unexpected.', 'Combine it with another harmless object.'], ['Read the open-ended challenge.', 'Think beyond the object’s usual purpose.', 'Share at least three safe ideas.'], { challenge: 'Imagine you have a large, clean cardboard box. Besides storing things, what are three completely different things you could safely turn it into?', explanation: 'There is no single correct answer. A puppet theatre, reading nook, marble maze model, costume or miniature town are all examples of flexible thinking.' }),
  makeActivity('mystery-story', 'Create a Mystery Story', 'Story Studio', 'Write a curious mystery where clues lead to a satisfying answer.', 'Mysteries develop planning, attention to detail and surprising storytelling.', 'Explorer', 25, 'story', ['What harmless thing has gone missing?', 'Which clue seems unimportant at first?', 'How does your detective notice the truth?'], ['Choose a safe, puzzling mystery.', 'Introduce characters and plant three clues.', 'Reveal a clever, non-violent solution.']),
  makeActivity('new-planet', 'Build a New Planet', 'Story Studio', 'Create a planet with its own places, weather and way of life.', 'World-building connects science questions with limitless imagination.', 'Explorer', 20, 'story', ['What color is the sky?', 'How do living things adapt?', 'What do visitors misunderstand?'], ['Name your planet and describe its environment.', 'Invent its inhabitants or life forms.', 'Tell what happens when someone arrives there.']),
  makeActivity('adventure', 'Create an Adventure', 'Story Studio', 'Send a character on a journey full of choices and discovery.', 'Adventures help you explore courage, teamwork and change.', 'Beginner', 20, 'story', ['What map starts the journey?', 'Who offers unexpected help?', 'What does the hero learn?'], ['Choose a main character and goal.', 'Add three obstacles that can be solved safely.', 'End with a discovery or change.']),
  makeActivity('fictional-world', 'Invent a Fictional World', 'Story Studio', 'Build an original world with its own rules, communities and wonders.', 'Inventing connected details strengthens imagination and systems thinking.', 'Creator', 30, 'story', ['What rule of nature is different?', 'How do people communicate?', 'Which place does everyone want to visit?'], ['Decide what makes the world unique.', 'Describe places, customs and daily life.', 'Write a scene that could only happen there.']),
  makeActivity('simple-website', 'Design a Simple Website', 'Code Lab', 'Plan a useful website and the pages people can visit.', 'Planning first helps developers build technology that is clear and purposeful.', 'Beginner', 20, 'code', ['Who will use it?', 'What belongs on the home page?', 'How will someone know where to click?'], ['Choose one clear purpose.', 'Plan the main page and navigation.', 'List the HTML and CSS ideas you might use.']),
  makeActivity('mini-game', 'Plan a Mini Game', 'Code Lab', 'Design the rules and logic for a small, friendly game.', 'Games are systems made from goals, choices, feedback and code.', 'Explorer', 25, 'code', ['What does the player control?', 'How can they learn the rules?', 'Can players succeed in different ways?'], ['Choose a goal without violent content.', 'Describe controls, rules and feedback.', 'Break the game into programming steps.']),
  makeActivity('space-station', 'Design a Space Station', 'Discovery Lab', 'Plan a safe home and research base for space explorers.', 'Space design combines human needs, engineering and scientific curiosity.', 'Creator', 30, 'design', ['How do people eat and sleep?', 'What gets reused?', 'Which experiments happen there?'], ['Choose where the station travels.', 'Plan living, working and growing spaces.', 'Explain how air, water and energy are managed.']),
  makeActivity('eco-machine', 'Invent an Eco-Friendly Machine', 'Discovery Lab', 'Design a machine that helps nature without creating a new problem.', 'Sustainable design considers materials, energy and long-term effects.', 'Explorer', 25, 'idea', ['Can it run on renewable energy?', 'What happens at the end of its life?', 'How does it avoid disturbing animals?'], ['Choose an environmental need.', 'Describe the machine and its energy source.', 'Consider benefits and possible drawbacks.']),
  makeActivity('future-transport', 'Design Future Transportation', 'Discovery Lab', 'Invent a cleaner, more accessible way to move around.', 'Transportation design connects engineering with community and environmental needs.', 'Explorer', 20, 'design', ['Can everyone use it?', 'Where does its energy come from?', 'How does it fit into towns?'], ['Choose who or what it transports.', 'Describe how it moves and stays safe.', 'Explain why it improves on current transport.']),
]

export const promptLibrary: Record<Difficulty, string[]> = {
  Beginner: ['Invent a backpack with one surprising feature.', 'Create a friendly creature that lives in a library.', 'Design a tiny park for insects.', 'Imagine a new holiday about kindness.'],
  Explorer: ['Invent a machine that cleans oceans without disturbing wildlife.', 'Design a city where cars are unnecessary.', 'Create a game that teaches teamwork.', 'Imagine school in the year 2100.'],
  Creator: ['Design a fair way for a town to share renewable energy.', 'Invent something that helps astronauts reuse every resource.', 'Create a world where sound changes the weather.', 'Plan an app that helps neighbors share skills while protecting privacy.'],
}

export const achievements: AchievementDefinition[] = [
  { id: 'first-creation', icon: '🏆', title: 'First Creation', description: 'Saved your first original creation.' },
  { id: 'idea-explorer', icon: '💡', title: 'Idea Explorer', description: 'Completed an Idea Lab activity.' },
  { id: 'creative-artist', icon: '🎨', title: 'Creative Artist', description: 'Completed an Art & Design activity.' },
  { id: 'problem-solver', icon: '🧩', title: 'Problem Solver', description: 'Completed a Brain Challenge.' },
  { id: 'story-builder', icon: '✍️', title: 'Story Builder', description: 'Completed a Story Studio activity.' },
  { id: 'code-explorer', icon: '💻', title: 'Code Explorer', description: 'Completed a Code Lab activity.' },
  { id: 'curious-mind', icon: '🔬', title: 'Curious Mind', description: 'Completed a Discovery Lab activity.' },
  { id: 'innovation-starter', icon: '🚀', title: 'Innovation Starter', description: 'Explored three different creative categories.' },
]

export const workspaceFields: Record<ActivityType, { key: string; label: string; hint: string; multiline?: boolean }[]> = {
  idea: [
    { key: 'problem', label: 'Problem', hint: 'What would you like to make better?', multiline: true },
    { key: 'idea', label: 'My idea', hint: 'Describe your idea in your own words.', multiline: true },
    { key: 'how', label: 'How it works', hint: 'What happens step by step?', multiline: true },
    { key: 'helps', label: 'Who it helps', hint: 'Who could find this useful?' },
    { key: 'improve', label: 'How I could improve it', hint: 'What could you test or change next?', multiline: true },
  ],
  story: [
    { key: 'characters', label: 'Characters', hint: 'Who is part of your story?', multiline: true },
    { key: 'setting', label: 'Setting', hint: 'Where and when does it happen?', multiline: true },
    { key: 'story', label: 'Story', hint: 'Tell the story in your own way.', multiline: true },
    { key: 'next', label: 'What happens next?', hint: 'Leave a clue for another chapter.', multiline: true },
  ],
  design: [
    { key: 'created', label: 'What I created', hint: 'Describe how your design looks and feels.', multiline: true },
    { key: 'how', label: 'How it works', hint: 'Explain the important parts.', multiline: true },
    { key: 'why', label: 'Why I designed it', hint: 'What inspired your choices?', multiline: true },
    { key: 'improvements', label: 'Improvements', hint: 'What would you change in version two?', multiline: true },
  ],
  brain: [
    { key: 'answer', label: 'My answer', hint: 'Write your answer and explain your thinking.', multiline: true },
    { key: 'reflection', label: 'What I noticed', hint: 'Was there a useful clue or new way to think?', multiline: true },
  ],
  code: [
    { key: 'purpose', label: 'What will it do?', hint: 'What can someone make, learn or accomplish?', multiline: true },
    { key: 'how', label: 'How will it work?', hint: 'Describe pages, controls or steps.', multiline: true },
    { key: 'concepts', label: 'Programming concepts I would use', hint: 'For example: variables, choices, loops, events or HTML.', multiline: true },
    { key: 'improve', label: 'What I would add next', hint: 'What could version two include?', multiline: true },
  ],
}
