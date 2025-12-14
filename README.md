# Project Overview
An Electronic Health Record (EHR) web application that includes an operating room management system. I have spent a lot of time using clinical software that is unintuitive and cumbersome. The goal of this project is to build a user-friendly, secure app that does not get in the way of healthcare workers and teach myself full-stack development along the way.

## Live Demo
**Deployed App:** [Click here](https://ehr.chance404.cc).

**Login with:** userID: nurse12 | password: password

> ⚠️ This project is under development. There are improvements to be made, feautures to add, bugs to squash, etc.
>    This is meant for desktop use only. Mobile just doesn't make a lot of sense for this application.

# Updates
**12/14/25**- Moved front-end to my VPS.

**11/1/25**- Migrated backend from the free tier on Render to self-hosting on a VPS. The free tier took 2+min to spin up when logging into my app. This took a lot of configuration and troubleshooting, but I learned a lot. More hands-on with SSH, nginx, DNS, CloudFlare, SSL. $5/month for a VPS seems worth the education.

# Tech Stack
- **Frontend**: Angular - TypeScript, HTML, CSS.
- **Backend**: Spring Boot - Java.
- **Database**: PostgreSQL DB managed with pgAdmin4.

## Current Features
- User authentication (Login)
- Patient record creation (Registration)
- Operating room scheduling - can create, update, delete surgery cases (Flow Board)
- Searchable, sortable patient list (Dashboard)

# Next Steps
- Add a back-end and interactivity to patient info pages. It's static dummy data for now.
- Add order entry/management system.

# License
This project is licensed under the MIT License. See [`LICENSE`](LICENSE) for details.
