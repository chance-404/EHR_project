# Project Overview
My first fullstack project. Working on an EHR (Electronic Health Record) that includes an operating room management system. This would be a massive project to complete solo, but the real goal here is to teach myself about backend and frontend frameworks, APIs, authentication/authorization, etc.

# Updates
**11/1/25**- Migrated backend from the free tier on Render to self-hosting on a VPS. The free tier took 2+min to spin up when logging into my app. This took a lot of configuration and troubleshooting, but I learned a lot. More hands-on with SSH, nginx, DNS, CloudFlare, SSL. $5/month VPS seems worth the education.

# Tech Stack
- **Frontend**: Angular - TypeScript, HTML, CSS.
- **Backend**: Spring Boot - Java.
- **Data Storage**: PostgreSQL DB managed with pgAdmin4.

# How to use
- Go to [this site](https://ehr-app.netlify.app/login)
- Note, this is really not meant to be used on mobile.
- Login with userID: nurse12 password: password
- Play around! Click around on the dashboard, add and edit cases on the flowboard, add a new 
  patient in registration.

# Next Steps
- Add a backend and interactivity to patient info pages. It's static dummy data for now.
- Add order entry/management system.

# Contributing
Contributions are welcome! It would be great to have other new developers involved.

# License
This project is licensed under the MIT License. See [`LICENSE`](LICENSE) for details.
