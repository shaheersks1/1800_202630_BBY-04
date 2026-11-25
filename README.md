# Schedulr


## Overview
Schedulr is a web application that generates an optimized weekly schedule tailored around a user's existing commitments and specific goals. Users can sign up and log in, upload or provide their current schedule, enter actionable goals with target completion days, view an interactive weekly schedule, and track their progress.

Developed for the BCIT COMP 1800 (Projects 1) course, this project applies User-Centred Design practices and agile sprint workflows while integrating Firebase authentication and Firestore storage with AI-assisted schedule generation.

---


## Features

- User sign-up and login with Firebase Authentication and user-scoped Firestore data
- Schedule input and AI-assisted weekly schedule generation tailored around fixed commitments and specific goals with deadlines
- Interactive schedule display with task completion tracking and progress overview
- User profile management with editable details and sign-out support
- Consistent dark-themed UI with shared web components (`site-navbar` and `site-footer`) and mobile-friendly navigation and layout

---


## Technologies Used

- **Frontend**: HTML, CSS, Bootstrap 5, Bootstrap Icons, JavaScript (ES Modules), Web Components
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Backend & Auth**: Firebase Authentication, Gemini CLI
- **Database**: Cloud Firestore

---


## Usage

To run the application locally:

1. **Clone** the repository (`1800_202630_BBY-04`).
2. **Install dependencies** by running `npm install` in the project root directory.
3. **Configure environment variables** in `.env` as needed for your local setup.
4. **Start the development server** by running: `npm run dev`.
5. Open your browser and visit the local address shown in your terminal (usually `http://localhost:5173` or similar).

Once the application is running:

1. Open the app (`index.html`) and sign up or log in (`login.html`).
2. Navigate to the home view (`main.html`) or schedule view (`ex.html`).
3. Provide your schedule file/data, enter specific goals and target day/deadline details, and generate your weekly schedule.
4. Check off completed tasks and visit `progress.html` to view your progress, or visit `profile.html` to update your profile details.

---


## Project Structure

```text
1800_202630_BBY-04/
├── images/
├── src/
│   ├── components/
│   │   ├── site-footer.js
│   │   └── site-navbar.js
│   ├── ai_scheduler.js
│   ├── app.js
│   ├── authentication.js
│   ├── firebaseConfig.js
│   ├── goal.js
│   ├── help.js
│   ├── index.js
│   ├── loginSignup.js
│   ├── main.js
│   ├── profile.js
│   └── ui_renderer.js
├── styles/
│   ├── style.css
│   ├── styleGoal.css
│   └── styleLogin.css
├── .env
├── .gitignore
├── ex.html
├── index.html
├── login.html
├── main.html
├── package.json
├── package-lock.json
├── page_goal.html
├── page_one.html
├── profile.html
├── progress.html
├── README.md
├── skeleton.html
├── skeleton_page_prompts.html
└── test.py
```
---


## Contributors
- **Shaheer Khan** - BCIT CST Student; focused on UI styling with Bootstrap, shared navigation components, user-facing page polish, user feedback and help options, and useful buttons.
- **Jordan L** - BCIT CST Student; worked on authentication flows (sign-up/login) and database setup.
- **Richard** - Richard - BCIT CST Student; worked on AI schedule generation integration, schedule/goal Firestore document handling, and progress tracking.

## Acknowledgments

- Built as part of BCIT COMP 1800 (Projects 1) coursework.
- UI icons provided by Bootstrap Icons.
- Reference documentation from MDN Web Docs, Bootstrap, and Firebase.

---


## Limitations and Future Work
### Limitations

- Vague or overly broad goals (such as open-ended long-term ambitions without clear milestones) do not translate cleanly into concrete weekly schedule blocks, so goals work best when phrased with precision and specificity.
- Some page filenames and prototype/helper files (such as ex.html, main.html, page_one.html, and skeleton.html) are still transitioning toward final naming and cleanup.

### Future Work

- Standardize page naming (such as schedule.html and home.html) and clean up unused prototype files.
- Expand schedule file parsing support (CSV, images/PNGs, and structured formats) and further refine prompt guidance for specific, achievable goals.
- Continue expanding progress analytics, profile preferences, and overall UI polish.

---


## License

This project is licensed under the MIT License. See the LICENSE file for details.
