# LoomForge

A B2B marketplace that connects fashion designers with garment manufacturers. Designers post a manufacturing project, find suitable manufacturers, request quotations, accept one, and track production through delivery, with real-time chat throughout.

## The Problem

Designers who want something manufactured usually search for factories, email them one by one, and compare answers on MOQ, price, and timelines by hand. LoomForge puts that whole process in one workflow.

## Features

**Designer**
- Create manufacturing projects (manually, or by describing the project in one sentence and letting the requirement analyzer fill in the form)
- Browse and search the manufacturer directory
- See a ranked shortlist of best-fit manufacturers for each project
- Send RFQs, compare quotations, and accept one
- Track orders through production stages
- Real-time chat with manufacturers

**Manufacturer**
- Company profile (MOQ, capacity, specializations, certifications)
- Inbox for incoming RFQs
- Submit quotations (price and production time)
- Advance orders through production stages
- Real-time chat with designers

**Smart features**
- **Requirement Analyzer:** uses the Google Gemini API to convert a freeform project description into structured fields (category, quantity, deadline, budget). The designer reviews and edits the result before submitting.
- **Manufacturer Match Scoring:** a weighted scoring algorithm (category match, MOQ fit, verification, rating) that ranks manufacturers per project with a match percentage and the reasons behind it.

## Workflow

Project → Manufacturer discovery and matching → RFQ → Quotation → Accept → Order (auto-created) → Production tracking (8 stages) → Delivered

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, React Router, Tailwind CSS, Axios, GSAP, Lenis |
| Backend | Node.js, Express |
| Database | MongoDB with Mongoose |
| Auth | JWT (access token plus httpOnly refresh cookie) |
| Real-time | Socket.IO |
| AI | Google Gemini API (requirement analyzer) |

## Architecture Highlights

- Two-token auth: short-lived access token kept in memory, refresh token in an httpOnly cookie, with an Axios interceptor that refreshes automatically
- Role-based access control on both frontend routes and backend endpoints
- Layered backend: routes → validators → controllers → models, with centralized error handling
- Chat is scoped to an RFQ relationship, so only connected users can message each other
- Accepting a quotation automatically rejects competing quotes and creates the order

