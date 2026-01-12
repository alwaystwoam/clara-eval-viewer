# Clara Eval Test Suite — AGI Summit Riyadh 2026

> **Event:** AGI Summit Riyadh 2026 — The Future of AGI
> **Purpose:** Exhaustive prompt + expected response eval for Clara
> **Usage:** Run sequentially to simulate a real event planning workflow

---

## Event Context

All tests assume this event exists (unless marked as Discovery):

| Attribute | Value |
|-----------|-------|
| **Event Name** | AGI Summit Riyadh 2026 |
| **Theme** | The Future of AGI |
| **Dates** | October 15-17, 2026 (3 days) |
| **Location** | Riyadh, Saudi Arabia |
| **Venue** | King Abdullah Financial District Conference Center (KAFD) |
| **Attendees** | 500 expected |
| **Budget** | $750,000 USD |
| **Tracks** | Technical AI, Ethics & Safety, Business & Investment, Government & Policy |

**Confirmed Speakers:**
- Dr. Demis Hassabis (CEO, Google DeepMind)
- Dario Amodei (CEO, Anthropic)
- Dr. Fei-Fei Li (Stanford HAI)
- Sam Altman (CEO, OpenAI)
- Dr. Aisha Al-Rashid (Saudi Data & AI Authority)
- Mustafa Suleyman (CEO, Microsoft AI)
- Dr. Yann LeCun (Chief AI Scientist, Meta)
- Dr. Ilya Sutskever (Co-founder, SSI)

**Schedule Overview:**
- Day 1: Opening + Technical Track (9am-6pm, reception 6-9pm)
- Day 2: Ethics/Policy + Business Track (9am-6pm)
- Day 3: Workshops + Closing Keynote (9am-3pm)

---

## Test Format

Each test includes:
- **ID:** Unique identifier
- **Prompt:** What the user says
- **Expected Response:** What Clara should do/say
- **Expected Artifacts:** UI chips returned (if any)
- **Mode:** Discovery / Chat / Planning

---

## Section 1: Discovery Phase (New Event)

*These tests simulate starting fresh before the event exists.*

### 1.1 Opening Prompts — Clara Asks Questions

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| D-001 | "I need to plan an AI summit" | Ask: What's the focus area? Approximate size? Timeframe? Location preferences? | None | Discovery |
| D-002 | "We're organizing a major conference on AGI in Saudi Arabia" | Ask: How many attendees? What's the goal — technical, business, policy? Duration? | None | Discovery |
| D-003 | "Help me plan AGI Summit Riyadh" | Ask: When are you thinking? Who's the target audience? What's the format — keynotes, workshops, expo? | None | Discovery |
| D-004 | "I want to bring together the world's top AI researchers" | Ask: How many attendees? When? Where are you thinking of hosting this? | None | Discovery |
| D-005 | "Let's plan something big for the AI community" | Ask: What kind of event — conference, summit, hackathon? What's the scale you're envisioning? | None | Discovery |

### 1.2 Early Discovery — Partial Information

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| D-010 | "It's an AGI summit, maybe 500 people" | Acknowledge, ask: What's the primary goal? When are you thinking? Do you have a location in mind? | None | Discovery |
| D-011 | "We're thinking October 2026, flexible on exact dates" | Acknowledge, ask: Any date constraints (Eid, other conferences)? What city/country? | None | Discovery |
| D-012 | "Riyadh, Saudi Arabia — we have government support" | Acknowledge, ask: Any specific venue requirements? Budget range? What level of production? | None | Discovery |
| D-013 | "Budget is around $750K USD all-in" | Acknowledge, ask: What's most important — venue, speakers, production, catering? | None | Discovery |
| D-014 | "It's for AI researchers, executives, and government officials" | Acknowledge, ask: What's the mix? Any specific outcomes you're hoping for? Networking, announcements, policy discussions? | None | Discovery |
| D-015 | "We want it to feel like Davos meets NeurIPS" | Acknowledge, ask: What aspects of each — the exclusivity of Davos or the technical depth of NeurIPS? | None | Discovery |

### 1.3 Vague/Ambiguous Discovery

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| D-020 | "Something that positions Saudi Arabia as an AI leader" | Ask: What does that look like — major announcements, international speakers, media coverage, partnerships? | None | Discovery |
| D-021 | "We want to make history" | Ask: History how? First-of-its-kind format? Unprecedented speaker lineup? Policy announcements? | None | Discovery |
| D-022 | "Make it the most important AI event of 2026" | Ask: Most important for whom — researchers, business leaders, policymakers? What would make it feel essential? | None | Discovery |
| D-023 | "The Crown Prince wants something impressive" | Ask: What does 'impressive' mean here — scale, speaker caliber, production quality, media attention? | None | Discovery |
| D-024 | "It needs to attract the top names in AI" | Ask: Who specifically are you hoping to attract? What would make them want to attend? | None | Discovery |

### 1.4 Ready to Commit — Transition to Planning

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| D-030 | "Okay, let's do it — create AGI Summit Riyadh 2026" | Summarize what Clara heard, propose initial event brief, show confirmation UI | None until confirmed | Discovery→Planning |
| D-031 | "That sounds perfect, set it up" | Summarize, propose initial setup with dates/location/capacity, show confirmation UI | None until confirmed | Discovery→Planning |
| D-032 | "Let's lock in October 15-17 in Riyadh" | Propose specific dates + location + initial structure, show confirmation UI | After confirm: `[✨ View Event]` | Discovery→Planning |
| D-033 | "Create the event and start building out the plan" | Summarize key details, propose event creation, show confirmation UI | After confirm: `[✨ View Event]` | Discovery→Planning |

---

## Section 2: Lookups (Chat Mode — No Changes)

*Event exists. Clara answers questions without making changes.*

### 2.1 Event Details

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| L-001 | "How many speakers do we have confirmed?" | "You have 8 confirmed speakers for the AGI Summit." | None | Chat |
| L-002 | "What are the dates for the summit?" | "The AGI Summit runs October 15-17, 2026 in Riyadh." | None | Chat |
| L-003 | "What's the venue address?" | "King Abdullah Financial District Conference Center, KAFD, Riyadh, Saudi Arabia." | None | Chat |
| L-004 | "How many attendees are we expecting?" | "You're expecting 500 attendees for the summit." | None | Chat |
| L-005 | "What's our total budget?" | "$750,000 USD all-in for the AGI Summit." | None | Chat |
| L-006 | "What's the theme of the event?" | "The Future of AGI — exploring the path to artificial general intelligence." | None | Chat |

### 2.2 Schedule Lookups

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| L-010 | "What time does the opening keynote start?" | "The opening keynote starts at 9:00 AM on Day 1 (October 15)." | None | Chat |
| L-011 | "What time is lunch on Day 2?" | "Lunch is from 12:30 PM to 2:00 PM on Day 2." | None | Chat |
| L-012 | "How many sessions do we have?" | "You have 24 sessions across 3 days, plus the opening and closing keynotes." | None | Chat |
| L-013 | "What's happening on Day 3?" | Lists Day 3 schedule: Workshops in morning, closing keynote at 2pm | None | Chat |
| L-014 | "When does the welcome reception end?" | "The welcome reception runs from 6:00 PM to 9:00 PM on Day 1." | None | Chat |
| L-015 | "What sessions are in the Ethics track?" | Lists all Ethics & Safety track sessions with times | None | Chat |

### 2.3 Speaker Lookups

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| L-020 | "Who's speaking on Day 1?" | Lists Day 1 speakers: Demis Hassabis (keynote), Dario Amodei, Dr. Fei-Fei Li, etc. | None | Chat |
| L-021 | "Is Sam Altman confirmed?" | "Yes, Sam Altman is confirmed for a fireside chat on Day 2." | None | Chat |
| L-022 | "Who's doing the closing keynote?" | "Dr. Ilya Sutskever is delivering the closing keynote on Day 3." | None | Chat |
| L-023 | "What session is Yann LeCun doing?" | "Dr. Yann LeCun is on the 'Scaling Laws & Beyond' panel on Day 1 at 2:30 PM." | None | Chat |
| L-024 | "Who's moderating the policy panel?" | "Dr. Aisha Al-Rashid from SDAIA is moderating the Government & Policy panel." | None | Chat |
| L-025 | "What's Dario Amodei's session about?" | "Dario Amodei is speaking about 'Constitutional AI and the Path to Safe AGI' on Day 1 at 11:00 AM." | None | Chat |

### 2.4 Budget Lookups

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| L-030 | "What's our budget for catering?" | "$120,000 is allocated for catering across all 3 days." | None | Chat |
| L-031 | "How much have we spent so far?" | "$285,000 spent (38%), $465,000 remaining." | None | Chat |
| L-032 | "What's the biggest expense?" | "The venue is the largest expense at $180,000." | None | Chat |
| L-033 | "How much are we spending on speakers?" | "$150,000 allocated for speaker travel, accommodations, and honoraria." | None | Chat |

### 2.5 Registration Lookups

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| L-040 | "How many people have registered?" | "347 people have registered for the AGI Summit so far." | None | Chat |
| L-041 | "Who registered today?" | Lists registrations from today with names/companies | None | Chat |
| L-042 | "What's our registration deadline?" | "Registration closes September 30, 2026." | None | Chat |
| L-043 | "How many VIP registrations do we have?" | "42 VIP registrations confirmed, including 12 government officials." | None | Chat |
| L-044 | "What companies are sending the most attendees?" | Lists top companies by registration count | None | Chat |

### 2.6 Milestone Lookups

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| L-050 | "What milestones are overdue?" | Lists overdue items: "Speaker headshots (due Oct 1) and sponsor deck finalization (due Sept 28)" | None | Chat |
| L-051 | "What's Ahmed working on?" | Lists milestones assigned to Ahmed | None | Chat |
| L-052 | "When is the venue contract due?" | "Venue contract signing is due August 15, 2026." | None | Chat |
| L-053 | "Show me the project status" | Summary: "18 of 32 milestones complete (56%), 3 at risk, 2 overdue" | None | Chat |

---

## Section 3: Vague/Exploratory (Chat Mode — Ask Clarifying Questions)

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| V-001 | "I'm thinking about changing things up for Day 2" | Ask: What specifically are you thinking of changing — the sessions, the timing, the format? | None | Chat |
| V-002 | "The schedule feels too packed" | Ask: What's feeling too packed — session density, break length, or a specific time block? Then show current schedule breakdown | None | Chat |
| V-003 | "Can we do something about the speakers?" | Ask: What specifically — add more, change sessions, update bios, rearrange order? | None | Chat |
| V-004 | "The morning sessions feel brutal" | Ask: Which day's morning? What's feeling brutal — too many sessions, too early start, not enough breaks? | None | Chat |
| V-005 | "I'm not sure about the Ethics track" | Ask: What's concerning you — the topics, the speakers, the timing, the placement in the schedule? | None | Chat |
| V-006 | "We need to cut costs" | Ask: Where would you like to cut — venue, catering, production, speakers, swag? What's the target reduction? | None | Chat |
| V-007 | "Can you help with the agenda?" | Ask: What kind of help — restructuring, adding sessions, balancing tracks, timing adjustments? | None | Chat |
| V-008 | "The venue might not work" | Ask: What's not working — capacity, location, amenities, cost? Want me to find alternatives? | None | Chat |
| V-009 | "We should probably rethink the workshop day" | Ask: Rethink how — different topics, different format, different timing, more or fewer workshops? | None | Chat |
| V-010 | "Something's off about the event flow" | Ask: Can you tell me more about what feels off? Is it the pacing, the transitions, the content balance? | None | Chat |

---

## Section 4: Opinions & Advice (Chat Mode — Discussion)

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| A-001 | "Do you think the schedule is too packed?" | Give opinion based on schedule density, compare to similar events, offer observations | None | Chat |
| A-002 | "Is 30 minutes enough for breaks?" | Give advice: "For a 500-person event, 30 minutes is tight — I'd recommend 45 minutes for networking..." | None | Chat |
| A-003 | "Should we have more networking time?" | Give recommendation based on event goals and audience type | None | Chat |
| A-004 | "What do other AI conferences do for speaker panels?" | Provide information about typical formats at NeurIPS, ICML, AI Summit, etc. | None | Chat |
| A-005 | "Is 3 days too long for this kind of event?" | Give opinion: "For 500 attendees and this depth of content, 3 days is appropriate..." | None | Chat |
| A-006 | "Should we invite more government officials?" | Give recommendation based on event positioning and current speaker mix | None | Chat |
| A-007 | "What's the best time for the closing keynote?" | Give advice: "For Day 3, I'd suggest 2pm — gives attendees time for flights..." | None | Chat |
| A-008 | "Is our speaker lineup strong enough?" | Give honest assessment of lineup strength and gaps | None | Chat |

---

## Section 5: Direct Execution (Clear, Unambiguous Requests)

*These execute immediately without confirmation UI.*

### 5.1 Event Details

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| E-001 | "Change the event tagline to 'Shaping Tomorrow's Intelligence'" | "Done — the tagline is now 'Shaping Tomorrow's Intelligence'." | `[🌐 View Website]` | Planning |
| E-002 | "Update the attendee capacity to 600" | "Done — capacity updated to 600 attendees." | None | Planning |
| E-003 | "Change the event dates to October 20-22" | "Done — the AGI Summit now runs October 20-22, 2026." | `[✨ View Event]` | Planning |

### 5.2 Schedule Changes

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| E-010 | "Move the opening keynote to 10am" | "Done — the opening keynote now starts at 10:00 AM on Day 1." | `[📅 View Schedule]` | Planning |
| E-011 | "Cancel the workshop on AI Governance" | "Done — the AI Governance workshop has been removed from Day 3." | `[📅 View Schedule]` | Planning |
| E-012 | "Add a networking lunch on Day 2 at noon" | "Done — added a networking lunch from 12:00 PM to 1:30 PM on Day 2." | `[📅 View Schedule]` | Planning |
| E-013 | "Extend the welcome reception to 10pm" | "Done — the welcome reception now runs until 10:00 PM." | `[📅 View Schedule]` | Planning |
| E-014 | "Add a coffee break at 3pm on Day 1" | "Done — added a 30-minute coffee break at 3:00 PM on Day 1." | `[📅 View Schedule]` | Planning |
| E-015 | "Move Yann LeCun's panel to Day 2" | "Done — 'Scaling Laws & Beyond' panel moved to Day 2 at 2:30 PM." | `[📅 View Schedule]` | Planning |

### 5.3 Speaker Changes

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| E-020 | "Add a speaker: Dr. Geoffrey Hinton, Professor Emeritus, University of Toronto" | "Done — Dr. Geoffrey Hinton added to the speaker lineup. What session should he be part of?" | `[👤 View Speakers]` | Planning |
| E-021 | "Remove Sam Altman from the speaker list" | "Done — Sam Altman has been removed from the speaker lineup." | `[👤 View Speakers]` | Planning |
| E-022 | "Update Dario Amodei's title to Co-founder & CEO, Anthropic" | "Done — updated Dario Amodei's title." | `[👤 View Speakers]` | Planning |
| E-023 | "Move Dr. Fei-Fei Li to the top of the speaker list" | "Done — Dr. Fei-Fei Li is now first in the speaker lineup." | `[👤 View Speakers]` | Planning |
| E-024 | "Reorder speakers by session time" | "Done — speakers are now ordered chronologically by their session times." | `[👤 View Speakers]` | Planning |

### 5.4 Budget Changes

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| E-030 | "Add $25,000 to the catering budget" | "Done — catering budget increased to $145,000." | `[💰 View Budget]` | Planning |
| E-031 | "Create a new budget line for VIP gifts at $15,000" | "Done — added 'VIP Gifts' line item for $15,000." | `[💰 View Budget]` | Planning |
| E-032 | "Reduce the production budget by $10,000" | "Done — production budget reduced to $90,000." | `[💰 View Budget]` | Planning |

### 5.5 Website Changes

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| E-040 | "Update the website background to white" | "Done — the site background is now white." | `[🌐 View Website]` | Planning |
| E-041 | "Change the hero tagline to 'The Future of Intelligence Starts Here'" | "Done — hero tagline updated." | `[🌐 View Homepage]` | Planning |
| E-042 | "Add a countdown timer to the homepage" | "Done — countdown timer added showing days until October 15." | `[🌐 View Homepage]` | Planning |
| E-043 | "Remove the early bird registration banner" | "Done — early bird banner removed from the homepage." | `[🌐 View Homepage]` | Planning |
| E-044 | "Update the FAQ with information about the dress code" | "Done — added dress code information to the FAQ: 'Business professional is recommended.'" | `[🌐 View FAQ]` | Planning |
| E-045 | "Add the SDAIA logo to the sponsors section" | "Done — SDAIA logo added to the sponsors section." | `[🌐 View Sponsors]` | Planning |

### 5.6 Registration Changes

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| E-050 | "Add a dietary restrictions field to registration" | "Done — added dietary restrictions field to the registration form." | None | Planning |
| E-051 | "Make the phone number field required" | "Done — phone number is now a required field." | None | Planning |
| E-052 | "Set the registration deadline to September 30" | "Done — registration closes September 30, 2026." | None | Planning |
| E-053 | "Cap registration at 500 attendees" | "Done — registration capped at 500. Waitlist will activate after that." | None | Planning |
| E-054 | "Close registration" | "Done — registration is now closed for the AGI Summit." | None | Planning |
| E-055 | "Add a field asking which tracks attendees are most interested in" | "Done — added track preference field with options for all 4 tracks." | None | Planning |

### 5.7 Milestone Changes

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| E-060 | "Mark the venue contract as done" | "Done — venue contract milestone marked as complete." | `[📋 View Project Plan]` | Planning |
| E-061 | "Assign the speaker headshots task to Sarah" | "Done — speaker headshots task assigned to Sarah." | `[📋 View Project Plan]` | Planning |
| E-062 | "Push the sponsor deck deadline to October 5" | "Done — sponsor deck deadline updated to October 5." | `[📋 View Project Plan]` | Planning |
| E-063 | "Add a task to finalize catering menu by September 15" | "Done — created milestone 'Finalize catering menu' due September 15." | `[📋 View Project Plan]` | Planning |

---

## Section 6: Propose + Confirm (Complex/Ambiguous Requests)

*These show confirmation UI before executing.*

### 6.1 Schedule Restructuring

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| P-001 | "Extend the conference to 4 days" | Propose restructure: how to add Day 4, what content moves, implications for venue/budget. Show [A] Apply / [B] Modify / [C] Cancel | After confirm: `[📅 View Schedule]` | Chat→Planning |
| P-002 | "The morning of Day 1 feels too packed — three sessions before lunch is brutal" | Propose options: extend breaks, move a session to Day 2, start later. Show options A/B/C | After confirm: `[📅 View Schedule]` | Chat→Planning |
| P-003 | "Reorganize the schedule to feel less packed" | Propose restructure with specific changes to session density, break length. Show confirmation UI | After confirm: `[📅 View Schedule]` | Chat→Planning |
| P-004 | "Move the Dario Amodei session to the opening slot on Day 2" | Propose change with implications (who moves, cascade effects). Show [A] Apply / [B] Modify / [C] Cancel | After confirm: `[📅 View Schedule]` | Chat→Planning |
| P-005 | "Combine the Ethics and Policy tracks into one" | Propose how to merge tracks, which sessions consolidate, new schedule. Show confirmation UI | After confirm: `[📅 View Schedule]` | Chat→Planning |

### 6.2 Website/Design Changes

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| P-010 | "Make the website feel more premium and futuristic" | Propose design direction: darker palette, tech fonts, AI imagery. Show preview + confirmation UI | After confirm: `[🌐 View Website]` | Chat→Planning |
| P-011 | "Redesign the homepage to be more impactful" | Propose approach: new hero layout, content restructure. Show preview + confirmation UI | After confirm: `[🌐 View Homepage]` | Chat→Planning |
| P-012 | "The site should feel like something from Saudi Arabia's Vision 2030" | Propose design direction: Saudi brand colors, geometric patterns, Vision 2030 alignment. Show confirmation UI | After confirm: `[🌐 View Website]` | Chat→Planning |
| P-013 | "Create a hero image that shows Riyadh's skyline with AI elements" | Generate/propose hero image concept, show preview, confirmation UI | After confirm: `[🌐 View Homepage]` | Chat→Planning |
| P-014 | "Use a more technical font that feels like AI" | Propose font options (IBM Plex Mono, Space Grotesk, JetBrains Mono), show preview, confirmation UI | After confirm: `[🌐 View Website]` | Chat→Planning |

### 6.3 Content/Copy Changes

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| P-020 | "Rewrite all the speaker bios to be shorter — 2 sentences max" | Propose new bios with before/after for each. Show [A] Apply all / [B] Review individually / [C] Cancel | After confirm: `[👤 View Speakers]` | Chat→Planning |
| P-021 | "Make the event description more exciting and visionary" | Generate new copy, show before/after. Show confirmation UI | After confirm: `[🌐 View Homepage]` | Chat→Planning |
| P-022 | "The agenda descriptions are too technical — simplify them for executives" | Rewrite descriptions, show before/after. Show confirmation UI | After confirm: `[📅 View Schedule]` | Chat→Planning |
| P-023 | "Write a more compelling 'Why Attend' section" | Generate new copy focused on value proposition. Show preview + confirmation UI | After confirm: `[🌐 View Why Attend]` | Chat→Planning |
| P-024 | "Create an 'About Saudi Arabia' section for international attendees" | Generate content about Riyadh, travel tips, cultural notes. Show confirmation UI | After confirm: `[🌐 View About]` | Chat→Planning |

### 6.4 Speaker Photo Editing

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| P-030 | "Make all speaker photos black and white with backgrounds removed" | Show before/after grid for all 8 speakers. Show [A] Apply to all / [B] Review individually / [C] Cancel | After confirm: `[👤 View Speakers]` | Chat→Planning |
| P-031 | "Make all speaker photos look consistent" | Propose style options (B&W, color-corrected, same background). Show preview grid + confirmation | After confirm: `[👤 View Speakers]` | Chat→Planning |
| P-032 | "Add a gradient background to Demis Hassabis's photo" | Open Nano Banana, show preview. Show confirmation UI | After confirm: `[👤 View Speakers]` | Chat→Planning |

### 6.5 Structural Changes

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| P-040 | "Move the speakers section above the agenda on the website" | Propose reorder with preview. Show confirmation UI | After confirm: `[🌐 View Website]` | Chat→Planning |
| P-041 | "Create a dedicated page for the venue" | Generate venue page structure + content. Show preview + confirmation UI | After confirm: `[📍 View Venue]` | Chat→Planning |
| P-042 | "Add a sponsors section with Diamond, Gold, and Silver tiers" | Ask about sponsors for each tier, then generate section. Show confirmation UI | After confirm: `[🌐 View Sponsors]` | Chat→Planning |
| P-043 | "Split the agenda into separate pages for each track" | Propose page structure for 4 track pages. Show confirmation UI | After confirm: `[📅 View Schedule]` | Chat→Planning |

---

## Section 7: Venue RFP Workflow

### 7.1 Discovery & Venue Needs

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| R-001 | "I need a venue for the summit" | Ask: Any venues in mind? What's your venue budget? Need breakout rooms? AV requirements? | None | Chat |
| R-002 | "We're thinking about KAFD Conference Center" | Acknowledge preference, confirm you'll look into it, offer to suggest alternatives | None | Chat |
| R-003 | "Find me venue options in Riyadh for 500 people" | Ask about budget, style preference, breakout needs, then present comparison grid | `[📍 View Venue Comparison]` | Chat |
| R-004 | "What venues would work for a major AI conference in Riyadh?" | Ask clarifying questions, then present comparison with KAFD, Four Seasons, Ritz-Carlton Riyadh, etc. | `[📍 View Venue Comparison]` | Chat |
| R-005 | "We already have KAFD booked" | Acknowledge, ask for details to add to event, skip venue recommendation flow | None | Chat |

### 7.2 Comparison & Selection

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| R-010 | "Show me the venue comparison" | Open comparison grid with Clara's Take section | `[📍 View Venue Comparison]` | Chat |
| R-011 | "Tell me more about the Four Seasons Riyadh" | Open venue profile with photos, capacity, amenities | `[📍 View Venue Profile]` | Chat |
| R-012 | "Why did you recommend KAFD Conference Center?" | Explain pros (500+ capacity, modern AV, central location) and cons (less intimate, corporate feel) | None | Chat |
| R-013 | "What are the downsides of the Ritz-Carlton?" | Give honest drawbacks: higher cost, smaller breakout capacity, premium pricing on F&B | None | Chat |
| R-014 | "I'm not interested in the Four Seasons" | Remove from list, ask if user wants a replacement suggestion | `[📍 View Venue Comparison]` | Chat |
| R-015 | "Find me something more modern than these" | Ask for specific preferences, then suggest alternatives | `[📍 View Venue Comparison]` | Chat |
| R-016 | "Which venue do you recommend?" | Give opinion based on event needs with honest tradeoffs, present as suggestion not decision | None | Chat |
| R-017 | "Add the Crowne Plaza Riyadh to the list" | Add to comparison, note you'll research and populate details | `[📍 View Venue Comparison]` | Chat |

### 7.3 RFP Review & Editing

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| R-020 | "Show me the RFP" | Open RFP view with full details | `[📄 View RFP]` | Chat |
| R-021 | "What will venues receive?" | Open RFP view showing all sections venues will see | `[📄 View RFP]` | Chat |
| R-022 | "Add a note about needing Arabic-English interpretation" | Update RFP, confirm change | `[📄 View Updated RFP]` | Planning |
| R-023 | "Make the catering section specify halal requirements" | Update RFP with halal catering requirements | `[📄 View Updated RFP]` | Planning |
| R-024 | "Change the dates to October 20-22" | Update RFP, note this affects all venues | `[📄 View Updated RFP]` | Planning |
| R-025 | "Add a requirement for prayer room facilities" | Update RFP with prayer room requirement | `[📄 View Updated RFP]` | Planning |

### 7.4 Sending & Tracking

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| R-030 | "Send the RFP to my top 3 venues" | Show venue selection UI, then "Sit back, relax" confirmation | `[📍 View Venue Tracker]` | Planning |
| R-031 | "Send it to KAFD and the Ritz-Carlton" | Show venue selection with those pre-selected, confirm, show handoff message | `[📍 View Venue Tracker]` | Planning |
| R-032 | "Any responses yet?" | Show tracker status, highlight any updates | `[📍 View Venue Tracker]` | Chat |
| R-033 | "What did KAFD say?" | Show their response details / quote in Quote Comparison view | `[📍 View Quote Comparison]` | Chat |
| R-034 | "Show me the quotes" | Open Quote Comparison view | `[📍 View Quote Comparison]` | Chat |
| R-035 | "Follow up with the ones who haven't responded" | Offer to send follow-up, confirmation UI | None | Chat→Planning |

### 7.5 Selection

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| R-040 | "I want to go with KAFD" | Confirm selection, ask if they want to send confirmation to venue | None | Chat→Planning |
| R-041 | "Let's book the KAFD Conference Center" | Mark as confirmed, transform dashboard tile, populate event details | Dashboard transforms | Planning |
| R-042 | "KAFD is our venue" | Same as above — confirm selection | Dashboard transforms | Planning |

---

## Section 8: Clara's Diary

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| Y-001 | "What did you change?" | Summarize recent actions, offer to open diary | `[📓 View Diary]` | Chat |
| Y-002 | "Show me Clara's Diary" | Open diary view | `[📓 View Diary]` | Chat |
| Y-003 | "Why did you move Dario's session?" | Explain reasoning, provide chips | `[📅 View Schedule]` `[📓 View in Diary]` | Chat |
| Y-004 | "Show me your thinking" | Open diary or show recent reasoning entries | `[📓 View Diary]` | Chat |
| Y-005 | "What were you thinking when you updated the budget?" | Find relevant entry, explain reasoning | `[📓 View in Diary]` | Chat |
| Y-006 | "What happened yesterday?" | Filter diary to yesterday's entries | `[📓 View Diary]` | Chat |
| Y-007 | "Show me all schedule changes" | Filter diary to schedule-related entries | `[📓 View Diary]` | Chat |
| Y-008 | "When did we confirm the venue?" | Find venue confirmation entry, show timestamp + reasoning | `[📓 View in Diary]` | Chat |
| Y-009 | "Walk me through your reasoning for the speaker lineup" | Show relevant diary entries with reasoning | `[📓 View Diary]` | Chat |

---

## Section 9: Milestones & Project Plan

### 9.1 Basic Operations

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| M-001 | "Show me the project plan" | Open Project Plan in Table view | `[📋 View Project Plan]` | Chat |
| M-002 | "What milestones are overdue?" | List overdue items with details | `[📋 View Project Plan]` (filtered) | Chat |
| M-003 | "Add a task to confirm all speaker travel by September 20" | Create milestone with due date | `[📋 View Project Plan]` | Planning |
| M-004 | "Assign the sponsor outreach task to Ahmed" | Update owner field | `[📋 View Project Plan]` | Planning |
| M-005 | "What's Fatima working on?" | Filter/show milestones assigned to Fatima | None | Chat |
| M-006 | "Mark the visa coordination as done" | Update status to Done | `[📋 View Project Plan]` | Planning |
| M-007 | "Show me the Gantt view" | Switch to Gantt view | `[📋 View Gantt]` | Chat |
| M-008 | "Group by person" | Change grouping from Phase to Person | `[📋 View Project Plan]` | Planning |
| M-009 | "The A/V setup is blocked by venue contract" | Create dependency relationship | `[📋 View Project Plan]` | Planning |
| M-010 | "Export this to Excel" | Generate .xlsx export file | `[📄 Download Excel]` | Planning |

### 9.2 With Milestone Context (✨ Button)

| ID | Context | Prompt | Expected Response | Artifacts | Mode |
|----|---------|--------|-------------------|-----------|------|
| M-020 | ✨ on "Finalize speaker travel" | "Draft an email to the speakers about travel arrangements" | Create email draft as .md file using milestone context | `[📄 Speaker_Travel_Email.md]` | Planning |
| M-021 | ✨ on "Venue contract" | "What should be included in this contract?" | Provide guidance on venue contract elements for Saudi Arabia | None | Chat |
| M-022 | ✨ on "Sponsor deck" | "Create a draft sponsor prospectus" | Generate sponsor prospectus document | `[📄 AGI_Summit_Sponsor_Deck.md]` | Planning |
| M-023 | ✨ on "Catering menu" | "Assign this to Sarah" | Update owner to Sarah | `[📋 View Project Plan]` | Planning |
| M-024 | ✨ on multiple milestones | "Bundle these into a weekly status report" | Create combined status document | `[📄 Weekly_Status_Report.md]` | Planning |

---

## Section 10: Event Vision & Export

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| X-001 | "Share the event vision with the steering committee" | Open share menu with link/email/export options | Share menu | Chat |
| X-002 | "Send the event vision to minister@sdaia.gov.sa" | Email the password-protected link | Confirmation | Planning |
| X-003 | "Create a presentation for the board" | Generate Google Slides with executive summary | `[📊 View Presentation]` + Google Slides link | Planning |
| X-004 | "Export this to slides" | Generate Google Slides | `[📊 View Presentation]` + Google Slides link | Planning |
| X-005 | "Make a deck for the Crown Prince's office" | Generate Google Slides formatted for VIP review | `[📊 View Presentation]` + Google Slides link | Planning |
| X-006 | "I need a deck to send to potential sponsors" | Generate Google Slides highlighting Reach & Impact slide | `[📊 View Presentation]` + Google Slides link | Planning |
| X-007 | "Create a media kit presentation" | Generate Google Slides with emphasis on reach and speakers | `[📊 View Presentation]` + Google Slides link | Planning |
| X-008 | "The budget changed, update the presentation" | Offer to generate new version, note previous is preserved | `[📊 View Presentation]` + Google Slides link | Planning |
| X-009 | "Can I get a PowerPoint?" | Explain Google Slides available now, PowerPoint coming later | None | Chat |

---

## Section 11: Capability Boundaries (Unsupported Requests)

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| B-001 | "Book flights for all the speakers" | "I can't book flights directly, but I can draft a flight request for your travel coordinator, or add this to your milestones with visa/travel details needed." | None | Chat |
| B-002 | "Process the VIP registration payments" | "I can't process payments, but I can set up your registration form and help you integrate with a payment provider." | None | Chat |
| B-003 | "Sign the venue contract with KAFD" | "I can't sign contracts, but I can draft a contract summary for your legal team and add contract review to your milestones." | None | Chat |
| B-004 | "Send invitation emails to all the registered attendees" | "I can't send emails directly yet, but I can draft the invitation copy and export your attendee list for your email tool." | None | Chat |
| B-005 | "Create a VIP ticket at 5000 SAR" | "Ticketing and pricing aren't supported yet. I can help you set up registration to collect attendee info — would you like to create a VIP registration track instead?" | None | Chat |
| B-006 | "Add an early bird discount of 20%" | "Pricing and discounts aren't available yet. I can help you create different registration deadlines and track early vs. late registrations." | None | Chat |
| B-007 | "How much revenue have we made from ticket sales?" | "I don't support payment processing or revenue tracking yet. I can show you registration counts and attendee data." | None | Chat |
| B-008 | "Arrange hotel blocks at the Four Seasons for speakers" | "I can't book hotels directly, but I can add this to your milestones and draft a room block request you can send to the hotel." | None | Chat |
| B-009 | "Get quotes from AV vendors in Riyadh" | "I can't reach out to vendors directly yet, but I can create an RFP document and add vendor outreach to your milestones." | None | Chat |
| B-010 | "Apply for visas for international speakers" | "I can't handle visa applications, but I can create a visa tracking milestone and draft information packages for each speaker." | None | Chat |

---

## Section 12: Edge Cases

| ID | Prompt | Expected Response | Artifacts | Mode |
|----|--------|-------------------|-----------|------|
| X-001 | "Can you move the keynote? Actually wait, what time is it now?" | Answer the question ("The keynote is at 9am"), do NOT move anything | None | Chat |
| X-002 | "Move the keynote. No wait, never mind." | Acknowledge and don't propose any change | None | Chat |
| X-003 | "What would happen if we moved the opening to 10am?" | Explain impact (speaker schedules, attendee travel, reception timing) — do NOT show confirmation UI (hypothetical) | None | Chat |
| X-004 | "Let's definitely move the opening keynote to 10am" | Execute directly — "definitely" signals commitment | `[📅 View Schedule]` | Planning |
| X-005 | "I guess we could move Demis's keynote?" | Treat as exploration, ask if they want to proceed | None | Chat |
| X-006 | "Just move everything earlier" | Too vague — ask: Which sessions? By how much? All days or just one? | None | Chat |
| X-007 | "Fix the schedule" | Too vague — ask: What needs fixing? | None | Chat |
| X-008 | "Update the website" | Too vague — ask: What specifically would you like to update? | None | Chat |
| X-009 | "Make it better" | Too vague — ask: What specifically? The schedule, website, speakers, something else? | None | Chat |
| X-010 | "Do the thing we talked about" | Ask for clarification — don't assume | None | Chat |
| X-011 | "What's the status?" | Ask: Status of what — the project plan, registrations, speaker confirmations, something specific? | None | Chat |
| X-012 | "Handle the Saudi stuff" | Ask for clarification — what specifically? Venue, catering, protocol, visas? | None | Chat |

---

## Section 13: Multi-Turn Conversation Tests

### Test 13.1: Schedule Discussion → Change

**Turn 1:**
> **User:** I'm worried the schedule is too packed.
> 
> **Clara:** I can see Day 1 has 6 sessions and Day 2 has 5 sessions, with 30-minute breaks between each. What's feeling too packed — is it the session density, the break length, or something about a specific time block?

**Turn 2:**
> **User:** The morning of Day 1 feels brutal — the keynote, then straight into Dario's talk, then the panel. No time to breathe.
> 
> **Clara:** That makes sense. Day 1 morning currently runs:
> - 9:00 AM — Opening Keynote: Dr. Demis Hassabis (60 min)
> - 10:15 AM — Constitutional AI: Dario Amodei (45 min)
> - 11:15 AM — Panel: Scaling Laws & Beyond (45 min)
> - 12:00 PM — Lunch
> 
> A few options:
> 1. **Extend breaks** — Make morning breaks 45 min instead of 15 min
> 2. **Move a session** — Shift the panel to Day 2 morning
> 3. **Start later** — Begin keynote at 10am instead of 9am
> 
> Which direction feels right?

**Turn 3:**
> **User:** Let's move the panel to Day 2 morning.
> 
> **Clara:** Good call. Here's the change:
> 
> **Moving:** "Scaling Laws & Beyond" panel from Day 1 at 11:15 AM → Day 2 at 9:00 AM
> 
> **Day 1 new morning:**
> - 9:00 AM — Opening Keynote (60 min)
> - 10:15 AM — Constitutional AI (45 min)
> - 11:00 AM — Extended networking break (60 min)
> - 12:00 PM — Lunch
> 
> **Day 2 new morning:**
> - 9:00 AM — Scaling Laws panel (45 min) ← moved here
> - 10:00 AM — [existing content shifts down]
> 
> **What this affects:**
> - Yann LeCun, Ilya Sutskever, and the panel moderator's schedules
> - Printed programs if already at printer
> 
> **[A]** Update the schedule with this change
> **[B]** Modify something before updating
> **[C]** Cancel — keep as-is

**Turn 4:**
> **User:** Wait, who's moderating the panel again?
> 
> **Clara:** Dr. Fei-Fei Li is moderating the "Scaling Laws & Beyond" panel with Yann LeCun and Ilya Sutskever.
> 
> **[A]** Update the schedule with this change
> **[B]** Modify something before updating
> **[C]** Cancel — keep as-is

**Turn 5:**
> **User:** A
> 
> **Clara:** Done! The Scaling Laws panel is now at 9:00 AM on Day 2. I've flagged the schedule change for Dr. Li, Dr. LeCun, and Dr. Sutskever.
> 
> `[📅 View Schedule]`
> 
> What else?

---

### Test 13.2: Venue Selection Flow

**Turn 1:**
> **User:** What venues would work for 500 people in Riyadh?
> 
> **Clara:** Let me find some options. A few questions first:
> - What's your venue budget range?
> - Do you need breakout rooms for workshops?
> - Any vibe preference — modern/tech-forward, classic/elegant, or government/formal?

**Turn 2:**
> **User:** Budget is around $180K for venue, need at least 4 breakout rooms, prefer modern and impressive
> 
> **Clara:** I found 4 venues that could work well. Here's how they compare:
> 
> `[📍 View Venue Comparison]`

**Turn 3:**
> **User:** I'm not interested in the Crowne Plaza — too generic
> 
> **Clara:** Got it — I've removed the Crowne Plaza. Would you like me to find another venue to consider, or are you good with the remaining 3?

**Turn 4:**
> **User:** Find me something more unique — maybe something that shows off modern Saudi Arabia
> 
> **Clara:** Looking for something that showcases Vision 2030 Saudi Arabia... Found it — the Ithra Center in Dhahran (about 4 hours from Riyadh) has a stunning contemporary design and world-class facilities. Alternatively, the KAFD Grand Hall has a dramatic modern aesthetic right in Riyadh's new financial district.
> 
> Want me to add either of these to your comparison?

---

### Test 13.3: Budget Discussion → Approval Request

**Turn 1:**
> **User:** We need to cut $100K from the budget
> 
> **Clara:** That's a significant cut — 13% of your $750K total. Where would you like to focus the reductions? Here's where the money currently sits:
> 
> - Venue: $180K (24%)
> - Speakers: $150K (20%)
> - Catering: $120K (16%)
> - Production/AV: $100K (13%)
> - Marketing: $80K (11%)
> - Other: $120K (16%)
> 
> What's most important to protect?

**Turn 2:**
> **User:** Don't touch speakers or venue. What else can we cut?
> 
> **Clara:** Protecting speakers ($150K) and venue ($180K) leaves $420K, and you need to cut $100K from that. Here are some options:
> 
> 1. **Catering:** Reduce from $120K to $80K — simpler menus, fewer passed apps at reception (-$40K)
> 2. **Production:** Reduce from $100K to $70K — less elaborate stage design, fewer cameras (-$30K)
> 3. **Marketing:** Reduce from $80K to $55K — less paid advertising, more organic/PR focus (-$25K)
> 4. **Swag/Gifts:** Reduce from $30K to $15K — simpler attendee gifts (-$15K)
> 
> That totals $110K in possible cuts. Want me to model a specific combination?

---

## Summary Statistics

| Category | Test Count |
|----------|------------|
| Discovery Phase | 18 |
| Lookups (Chat Mode) | 53 |
| Vague/Exploratory | 10 |
| Opinions & Advice | 8 |
| Direct Execution | 45 |
| Propose + Confirm | 30 |
| Venue RFP Workflow | 25 |
| Clara's Diary | 9 |
| Milestones | 15 |
| Event Vision & Export | 9 |
| Capability Boundaries | 10 |
| Edge Cases | 12 |
| Multi-Turn Conversations | 3 flows |
| **Total** | **~250 test cases** |

---

## Validation Checklist

For each test, verify:

- [ ] Clara's response matches expected behavior
- [ ] Correct mode used (Chat vs Planning)
- [ ] Correct artifacts returned (if any)
- [ ] No overpromising on unsupported features
- [ ] Clarifying questions asked for vague requests
- [ ] Confirmation UI shown for complex changes
- [ ] Direct execution for clear requests
- [ ] Response timing appropriate (< 2 sec for chat, longer ok for planning)
