# TabSplitter

<!-- [Heroku link][heroku] -->

<!-- [heroku]: http://flux-capacitr.herokuapp.com -->

## Minimum Viable Product
TabSplitter is a variant clone of Bill-Splitter built on Rails and Backbone. Users can:

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create tabs (bills)
- [ ] View all tabs (tab history)
- [ ] View account (display balance)
- [ ] Search for friends by email/name
- [ ] Email notifications/reminders
- [ ] Add connections/friends

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Basic Tabs, Heroku (~1 day)
I will implement user authentication using Rails. By the end of this phase users will be able to sign up, log in, and create tabs using simple text forms in Rails views. I will also ensure that the application can be properly pushed to Heroku.

[Details][phase-one]

### Phase 2: Backbone Views & Bill Splitting Logic (~2-3 days)
I will add Backbone models and collections that fetch data from the tab routes. By the end of this phase the existing Rails views will have been ported over to Backbone. I plan to offer two main ways of splitting tabs amongst friends, even split and custom split. Each option will require its own views with the associated options available to fill in.

[Details][phase-two]

### Phase 3: Add Friends to Tab with User Search (~1 day)
Allow users to add friends to tabs with a user search text field. Each subsequent participant added will generate a new text field to enter another participant.

[Details][phase-three]

### Phase 4: Email Notifications/Reminders (~1-2 days)
Set-up automatic email notifications using Sendgrid when a new tab is created. Allow for manual notifications to be sent to all users of a single tab, or a single user.

[Details][phase-four]

### Phase 5: CSS Bells & Whistles (~2-3 days)
Add user feedback to buttons and views via hover states and loading animation. By the end of this phase the website should feel responsive, fluid, and interactive.

[Details][phase-five]

### Bonus Features:
- [ ] Implement smart search (higher freq friends at top)
- [ ] Search for bills by date, participants, and tag/description
- [ ] View friends' profiles (displays balance w/ option to send reminder)
- [ ] View a feed of recent activity in network
- [ ] Split tab based on itemization
- [ ] Penny pass (handles fractions of a cent)

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
