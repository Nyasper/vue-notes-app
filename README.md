# Vue Notes App

A Vue.js notes application with user authentication, CRUD operations for notes, and an admin mode. Connects to a separate Hono backend deployed on Cloudflare Workers.

## Live Demo

[https://vue-notes-app-rose.vercel.app](https://vue-notes-app-rose.vercel.app)

## Features

- User registration and login
- Create, read, update, and delete notes (title + description)
- Admin mode to view and delete other users
- Responsive UI

## Tech Stack

- **Vue.js** - Frontend framework
- **TypeScript** - Type safety
- **Hono** - Backend API (separate repo)

## Backend

This is the frontend only. The backend API lives in a separate repository:

**Backend repo:** [Nyasper/notes_app_hono_CFworkers](https://github.com/Nyasper/notes_app_hono_CFworkers)

The backend is built with Hono, deployed on Cloudflare Workers, and uses Drizzle ORM for database access.

## Related Projects

- [Notes App Backend (Hono + Cloudflare Workers)](https://github.com/Nyasper/notes_app_hono_CFworkers) -- the API this frontend connects to

## Screenshots

Page Home (All notes)  
![all-notes](/screenshots/home.png)

Create a Note  
![create-note](/screenshots/create_note.png)

Update and Delete a Note  
![update-delete-notes](/screenshots/edit_note.png)

Admin Mode  
![admin-mode](/screenshots/admin_view.png)

