/**
 * Clara AI Eval Viewer - Recommendations Engine
 * 
 * Generates specific improvement recommendations for failed tests
 * based on section, failure patterns, and judge findings.
 */

// Recommendation templates by section/failure type
const RECOMMENDATION_TEMPLATES = {
  // Vague/Exploratory failures - agent executes instead of asking questions
  'Vague/Exploratory': {
    systemPromptFix: `Add to system prompt:

"When user intent is ambiguous or underspecified, ASK clarifying questions 
before taking action. 

Keywords indicating exploration (DO NOT execute, ASK instead):
- 'thinking about', 'maybe', 'might', 'not sure'
- 'feel like', 'could', 'possibly', 'wondering'
- 'something about', 'I guess', 'perhaps'

When you see these signals, respond with 2-3 targeted questions to understand:
1. What specifically they want to change
2. What outcome they're hoping for
3. Any constraints or preferences"`,
    contextFix: `Add few-shot examples showing vague prompts and appropriate clarifying responses:

Example 1:
User: "I'm thinking about changing things up for Day 2"
Clara: "I'd be happy to help! A few questions:
- What specifically are you thinking of changing — sessions, timing, or format?
- Is there something that's not working well currently?
- Any constraints I should know about?"

Example 2:
User: "The schedule feels too packed"
Clara: "I can help with that. To give you the best options:
- Which day feels most packed — Day 1, 2, or 3?
- Is it the session density, break length, or something else?
- What would 'less packed' look like to you?"`
  },

  // Direct Execution - Schedule failures
  'Direct Execution - Schedule': {
    systemPromptFix: `Add to system prompt:

"For schedule changes, follow this decision tree:

EXECUTE DIRECTLY when:
- Request specifies exact session name AND exact new time
- Uses imperative language ('move X to Y', 'change X to Y')
- Single, unambiguous change

ASK FOR CLARIFICATION when:
- Session name is ambiguous (e.g., 'opening keynote' could mean multiple sessions)
- Time conflicts would result
- Request affects multiple sessions

NEVER ask for confirmation on simple, specific schedule changes.
The user said 'Move the opening keynote to 10am' — just do it."`,
    contextFix: `Improve schedule tool definitions:

1. Add session aliases/synonyms to help resolve ambiguous names:
   - "opening keynote" → first keynote of Day 1
   - "closing keynote" → last keynote of final day
   
2. Add conflict detection that proposes solutions rather than asking:
   - If moving X causes overlap with Y, propose: "I'll move X to 10am and shift Y to 11am"
   
3. Include examples of direct execution:
   User: "Move the opening keynote to 10am"
   Clara: "Done — the opening keynote now starts at 10:00 AM on Day 1."`
  },

  // Direct Execution - Milestones failures
  'Direct Execution - Milestones': {
    systemPromptFix: `Add to system prompt:

"For milestone/task operations:

EXECUTE DIRECTLY:
- 'Mark X as done/complete' → Update status immediately
- 'Assign X to [person]' → Update owner immediately
- 'Add a task to [do something] by [date]' → Create milestone immediately
- 'Push/move deadline to [date]' → Update due date immediately

These are administrative operations that don't require confirmation.
Respond with: 'Done — [description of what changed]'"`,
    contextFix: `Add milestone operation examples:

User: "Mark the venue contract as done"
Clara: "Done — venue contract milestone marked as complete."

User: "Assign the speaker headshots task to Sarah"
Clara: "Done — speaker headshots task assigned to Sarah."

User: "Add a task to finalize catering menu by September 15"
Clara: "Done — created milestone 'Finalize catering menu' due September 15."`
  },

  // Event Vision & Export failures
  'Event Vision & Export': {
    systemPromptFix: `Add explicit capability list to system prompt:

"EXPORT & SHARING CAPABILITIES:

You CAN:
- Share event vision via shareable link (password-protected)
- Send event vision link via email
- Generate Google Slides presentations from event data
- Create executive summary presentations
- Export to different formats for different audiences

You CANNOT (yet):
- Generate PowerPoint files directly (use Google Slides)
- Send emails directly (provide draft + link)

When user asks to 'share', 'export', or 'create a presentation':
1. Acknowledge the request
2. Generate the appropriate output
3. Provide the link or file"`,
    contextFix: `Add export/share examples:

User: "Share the event vision with the steering committee"
Clara: "I'll create a shareable link for the event vision. Here's your link: [link]
       You can share this directly or I can email it to specific addresses."

User: "Create a presentation for the board"
Clara: "I'll generate a Google Slides presentation with the executive summary.
       [📊 View Presentation] — includes overview, budget, timeline, and key speakers."`
  },

  // Propose + Confirm failures
  'Propose + Confirm': {
    systemPromptFix: `Add to system prompt:

"For complex changes that affect multiple items or require user choice:

ALWAYS present options in this format:

[A] Apply the proposed change
[B] Modify something before applying
[C] Cancel — keep as-is

Show a PREVIEW of what will change before the options.

Complex changes include:
- Restructuring schedule across multiple sessions
- Design/style changes to website
- Bulk content updates (all speaker bios, all session descriptions)
- Adding new sections or pages
- Changes that cascade to other items"`,
    contextFix: `Add propose+confirm examples:

User: "Extend the conference to 4 days"
Clara: "Here's how I'd restructure for 4 days:

**Day 4 (new):**
- Morning: Additional workshops
- Afternoon: Industry roundtables
- Evening: Closing reception (moved from Day 3)

**What changes:**
- Day 3 closing moves to Day 4
- Venue booking needs extension
- Budget impact: ~$50K additional

[A] Apply this 4-day structure
[B] Modify the plan first
[C] Cancel — keep 3 days"`
  },

  // Capability Boundaries failures
  'Capability Boundaries': {
    systemPromptFix: `Add capability boundaries to system prompt:

"CAPABILITY BOUNDARIES — Be honest about what you cannot do:

You CANNOT:
- Book flights, hotels, or process payments
- Sign contracts or legal documents
- Send emails directly to external recipients
- Handle visa applications
- Process financial transactions

When asked to do something outside your capabilities:
1. Acknowledge the limitation clearly
2. Offer a helpful alternative you CAN do
3. Suggest next steps for the user

Example: 'I can't book flights directly, but I can:
- Draft a flight request for your travel coordinator
- Add speaker travel to your milestones with details needed
- Create a travel requirements document'"`,
    contextFix: `Add boundary examples:

User: "Book flights for all the speakers"
Clara: "I can't book flights directly, but I can help you prepare:
- Draft a flight request email for your travel coordinator
- Add 'Book speaker flights' to your milestones
- Create a speaker travel requirements document with dates and preferences

Which would be most helpful?"

User: "Sign the venue contract with KAFD"
Clara: "I can't sign contracts, but I can:
- Draft a contract summary for your legal team
- Add 'Contract review' to your milestones
- Prepare a checklist of key terms to verify

Want me to create any of these?"`
  },

  // Lookups failures
  'Lookups': {
    systemPromptFix: `Add to system prompt:

"For lookup/information questions:

1. ALWAYS verify against the event data before answering
2. Quote specific values from the data
3. If data is missing or unclear, say so explicitly
4. Don't add unnecessary context unless it's directly relevant

Keep lookup responses concise and factual.
The user asked a simple question — give a simple answer."`,
    contextFix: `Ensure all event data fields are clearly labeled and accessible.

Common lookup patterns:
- "How many X?" → Return the count with source
- "What time is X?" → Return the time with day/date context
- "Who is doing X?" → Return name(s) with role/session info
- "What's the budget for X?" → Return amount with category context`
  },

  // Opinions & Advice failures
  'Opinions & Advice': {
    systemPromptFix: `Add to system prompt:

"When asked for opinions or advice:

1. Give a clear, direct opinion first
2. Support it with specific reasoning
3. Reference comparable events or industry norms when relevant
4. Acknowledge tradeoffs honestly
5. End with a recommendation, not a question

Don't be wishy-washy. The user is asking for your expert opinion."`,
    contextFix: `Add opinion/advice examples:

User: "Is our speaker lineup strong enough?"
Clara: "Your lineup is exceptional. You have:
- CEOs of DeepMind, Anthropic, OpenAI, Microsoft AI
- Meta's Chief AI Scientist and SSI co-founder
- Saudi government representation for policy weight

One potential gap: no major figure from China or Global South.
This could be strategic given your audience, or an opportunity to add.

My recommendation: The lineup is strong as-is. If you want to add,
prioritize a compute/infrastructure voice (Jensen Huang would be ideal)."`
  },

  // Edge Cases failures
  'Edge Cases': {
    systemPromptFix: `Add to system prompt:

"HANDLING EDGE CASES:

1. Interrupted requests ('Actually wait', 'Never mind'):
   - Stop immediately, don't complete the original action
   - Acknowledge and ask what they'd like instead

2. Hypothetical questions ('What would happen if...'):
   - Explain the impact WITHOUT showing confirmation UI
   - Don't propose changes for hypotheticals

3. Hedged language ('I guess', 'maybe we could'):
   - Treat as exploration, ask if they want to proceed
   - Don't execute on uncertain intent

4. Vague requests ('Fix it', 'Make it better'):
   - Ask for specifics before acting
   - 'What specifically would you like me to fix?'

5. Context switches mid-request:
   - Answer the new question first
   - Then ask if they still want the original action"`,
    contextFix: `Add edge case examples:

User: "Can you move the keynote? Actually wait, what time is it now?"
Clara: "The keynote is currently at 9:00 AM on Day 1. 
       Did you still want to move it, or was that just a thought?"

User: "What would happen if we moved the opening to 10am?"
Clara: "If you moved the opening to 10am:
- The welcome reception would need to shift
- Attendees arriving early would have a longer wait
- It might work better for international travelers
This is just analysis — let me know if you want to actually make this change."`
  },

  // Venue failures
  'Venue': {
    systemPromptFix: `Add to system prompt:

"VENUE DISCOVERY FLOW:

When user mentions needing a venue, ASK these questions first:
1. Any venues already in mind?
2. What's your venue budget?
3. How many breakout rooms do you need?
4. Any specific AV or production requirements?
5. Preference on vibe — modern, classic, or formal?

Don't jump to recommendations until you understand their needs.

If they already have a venue in mind, acknowledge and offer to:
- Confirm it's a good fit
- Suggest alternatives as backup
- Help with the RFP process"`,
    contextFix: `Add venue discovery examples:

User: "I need a venue for the summit"
Clara: "I'd love to help find the right venue. A few questions:
- Any venues already in mind?
- What's your venue budget range?
- How many breakout rooms do you need?
- Any specific AV requirements?
- Preference on vibe — modern/tech-forward, classic, or formal?"`
  }
};

// Pattern matching for specific failure types based on findings
function analyzeFailurePattern(tc) {
  const patterns = [];
  
  // Check for clarification failures
  const allFindings = [
    ...tc.dimensions.responsePromptAlignment.findings,
    ...tc.dimensions.informationCompleteness.findings,
    ...tc.dimensions.responseClarity.findings,
    ...tc.dimensions.toolAppropriateness.findings
  ];
  
  const findingNotes = allFindings.map(f => f.note.toLowerCase()).join(' ');
  
  if (findingNotes.includes('clarifying question') || findingNotes.includes('ask') && findingNotes.includes('instead')) {
    patterns.push('should_ask_questions');
  }
  
  if (findingNotes.includes('not applied') || findingNotes.includes('not completed') || findingNotes.includes('not executed')) {
    patterns.push('failed_to_execute');
  }
  
  if (findingNotes.includes('confirmation') || findingNotes.includes('[a]') || findingNotes.includes('options')) {
    patterns.push('missing_confirmation_ui');
  }
  
  if (findingNotes.includes('fabricat') || findingNotes.includes('incorrect') || findingNotes.includes('wrong')) {
    patterns.push('incorrect_information');
  }
  
  if (findingNotes.includes('missing') || findingNotes.includes('omit') || findingNotes.includes('did not include')) {
    patterns.push('incomplete_response');
  }
  
  if (findingNotes.includes('tool') && (findingNotes.includes('unnecessary') || findingNotes.includes('not needed'))) {
    patterns.push('unnecessary_tool_usage');
  }
  
  if (findingNotes.includes('verbose') || findingNotes.includes('too long') || findingNotes.includes('over')) {
    patterns.push('too_verbose');
  }
  
  return patterns;
}

// Generate specific fix based on test case details
function generateSpecificFix(tc) {
  const patterns = analyzeFailurePattern(tc);
  const fixes = [];
  
  if (patterns.includes('should_ask_questions')) {
    fixes.push(`For prompt "${tc.prompt.substring(0, 50)}...", the agent should have asked clarifying questions instead of taking action. Add this prompt pattern to the "ask first" examples.`);
  }
  
  if (patterns.includes('failed_to_execute')) {
    fixes.push(`The agent failed to execute the requested change. Ensure the tool definitions support this operation and add an example showing direct execution for similar requests.`);
  }
  
  if (patterns.includes('missing_confirmation_ui')) {
    fixes.push(`This request needed the [A]/[B]/[C] confirmation pattern but didn't show it. Add this prompt type to the "propose + confirm" category.`);
  }
  
  if (patterns.includes('incorrect_information')) {
    fixes.push(`The agent provided incorrect information. Verify the data schema paths and ensure the agent is reading from the correct fields.`);
  }
  
  if (patterns.includes('incomplete_response')) {
    fixes.push(`The response was missing key information. Review the expected response and ensure all required elements are covered in the system prompt guidance.`);
  }
  
  return fixes.join('\n\n');
}

// Main recommendation function
function getRecommendation(tc) {
  if (tc.passed) return null;
  
  // Find matching template
  let template = null;
  
  // Check for exact section match
  for (const [key, value] of Object.entries(RECOMMENDATION_TEMPLATES)) {
    if (tc.section.includes(key) || key.includes(tc.section.split(' - ')[0])) {
      template = value;
      break;
    }
  }
  
  // Check for category match
  if (!template) {
    if (tc.section.includes('Lookups')) {
      template = RECOMMENDATION_TEMPLATES['Lookups'];
    } else if (tc.section.includes('Direct Execution')) {
      template = RECOMMENDATION_TEMPLATES['Direct Execution - Schedule'];
    } else if (tc.section.includes('Propose')) {
      template = RECOMMENDATION_TEMPLATES['Propose + Confirm'];
    } else if (tc.section.includes('Venue')) {
      template = RECOMMENDATION_TEMPLATES['Venue'];
    }
  }
  
  // Generate specific fix
  const specificFix = generateSpecificFix(tc);
  
  if (!template && !specificFix) {
    return {
      systemPromptFix: 'Review the judge summary and findings to identify the specific issue. Consider adding guidance for this prompt pattern to the system prompt.',
      contextFix: 'Add a few-shot example showing the expected behavior for this type of request.',
      specificFix: specificFix || null
    };
  }
  
  return {
    systemPromptFix: template?.systemPromptFix || null,
    contextFix: template?.contextFix || null,
    specificFix: specificFix || null
  };
}

// Export for use in app.js
if (typeof window !== 'undefined') {
  window.getRecommendation = getRecommendation;
}
