# Scholera – AI Tutor

Scholera is a web-based learning platform designed to help students study from their lecture materials.

The main idea is to provide an AI Tutor that answers questions using lecture material and helps students revise, organize notes, and track their learning progress.

## Why We Built It

Students often have lecture slides and study material but may find it difficult to quickly find and understand specific concepts.

Scholera aims to provide a single learning interface where students can:

- Ask questions about lecture material
- Get answers with relevant lecture and slide references
- Save useful answers for revision
- Review lecture summaries
- Maintain a study streak
- Create and manage study notes
- Track learning progress

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- Framer Motion
- React Router
- React Markdown
- KaTeX
- LocalStorage
- Mock Data

## Main Features

### AI Tutor

- Ask questions about lecture material
- Display answers
- Show relevant lecture and slide references
- Open the referenced lecture slide
- Support mathematical formulas and formatted content

### Revision

- Save answers for later revision
- View saved answers
- View lecture summaries
- Review important concepts from lectures

### Notes

- Create and manage personal study notes
- Organize study information in one place

### Learning Dashboard

- Study streak
- Study activity
- Learning progress
- Topics covered
- Topics remaining

### User Interface

- Responsive interface
- Light and dark mode
- Animated interactions
- Interactive learning components

## Setup

### Prerequisites

Make sure you have Node.js and npm installed.

### 1. Clone the Repository

```bash
git clone https://github.com/Mahek1448/Scholera_tutor.git
cd scholera
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The terminal will display the local development URL, usually:

```
http://localhost:5173
```

Open the URL in your browser to run the application.

## Deployment

Scholera is deployed as a Vite-based frontend application.

### Production Build

To create a production build locally:

```bash
npm run build
```

The production files are generated inside the `dist` folder.

### Deployment

The project is deployed using Vercel.

The deployment is automatically updated whenever changes are pushed to the GitHub repository.

### Live Demo

[Scholera – Live Demo](https://scholera-tutor-7q4e.vercel.app/)

### Demo Accounts

The application currently uses mock student data for demonstration.

| Student ID | Account Type      | Password |
|------------|--------------------|----------|
| stu_0014   | Existing Student   | 123456   |
| stu_0031   | New Student        | 123456   |

The existing student account contains sample conversation history, while the new student account starts without previous conversations.

## What We Deliberately Left Out

The current version focuses on the core learning experience and frontend functionality.

The following were deliberately kept outside the current scope:

- Production-level authentication
- Production database infrastructure
- Large-scale backend infrastructure
- Advanced recommendation and personalization systems
- Production deployment infrastructure

Some parts of the application currently use mock data or browser-based storage.

## Current Limitations

- Some application data is currently based on mock data.
- Some user data and saved content are stored using LocalStorage.
- The current version is primarily a prototype rather than a production-ready system.
- The application has not been extensively tested across every browser and device.
- A production backend and database would be required for a fully scalable deployment.

## Project Status

Scholera is currently a functional prototype demonstrating the core learning workflow, including AI Tutor interaction, lecture navigation, revision, notes, and study-progress features.

## AI Usage

AI tools were used during development as development assistants.

They were mainly used for:

- Generating initial code structures
- Debugging and explaining code
- Suggesting UI improvements
- Helping with React and Tailwind CSS implementation
- Identifying and fixing implementation issues

AI-generated suggestions were reviewed, tested, and modified before being incorporated into the project.

Some AI suggestions were not suitable for the project's design or requirements and had to be changed or rejected. The final implementation decisions were made by the project team.

More details are documented in `AI_USAGE.md`.