# OrbitGather — Event Discovery & Registration Website

A responsive event discovery and registration website built with HTML, CSS and vanilla JavaScript.

## File structure

```text
OrbitGather/
├── index.html
├── style.css
├── app.js
└── README.md
```

All files are in the repository root. There are no separate CSS or JavaScript folders.

## Features

- Single-page navigation with Home, Discover, Event Details, Registration, My Registrations and About sections
- Search events by title, category, venue and description
- Filter by category and free events
- Sort by date, name or price
- Event detail view
- Registration form with name, email, phone and consent validation
- Duplicate registration prevention
- Registration confirmation
- View and remove registrations
- Save and unsave favourite events
- Light/dark theme
- Newsletter demo subscription
- Responsive mobile navigation

## Run locally

Keep all four files in the same folder and open `index.html` in a browser. You can also use VS Code Live Server.

## Deploy on Vercel

1. Upload all four files to the root of a GitHub repository.
2. Import the repository into Vercel.
3. Select **Other** as the framework preset.
4. Keep Root Directory as `./`.
5. Leave build commands empty and deploy.

## Note

This is a front-end demonstration. Sample event information is illustrative. Registrations, favourites and newsletter subscriptions are stored in browser `localStorage`; there is no backend database or official ticket issuance. Event photos and fonts load from external services and require internet access.
