# 🎵 Song Rating App (Full Stack React + Express)

This app lets a group of users rate songs from a specific album by a band.  
It features:

- 💬 Autocomplete for band and album names (via Deezer API)
- 🎧 Multiple users rating the **same album**
- 📊 Automatic calculation of stats (total, average, min, max)
- 🎨 Stylish animated UI using Bootstrap + Framer Motion
- 🌐 Backend proxy for Deezer API (to avoid CORS issues)

---

## 📁 Project Structure

```
song-comparing-app/
├── song-compare/             # Frontend React app
├── song-compare-backend/     # Backend Express server
├── Tests/                    # Local experiments / dev tests
```

---

## 🔷 Frontend (React + TypeScript)

📍 `song-compare/`

Built with:

- React + TypeScript
- Bootstrap 5 (via CDN or package)
- framer-motion for animations
- Custom form and results logic
- Data flow via props and steps: `UserForm → Rating → Results`

### 🌟 Key Components

| Component | Role |
|----------|------|
| `UserForm.tsx` | Gathers user name, band, album (first user only) |
| `SongRatingScreen.tsx` | Rates songs one-by-one |
| `AddAnotherUserScreen.tsx` | Lets another user join |
| `GroupResultsSummary.tsx` | Shows per-user stats |
| `SongComparisonTable.tsx` | Compares ratings per song across users |

---

## 🔶 Backend (Node + Express)

📍 `song-compare-backend/`

- Acts as a **proxy** between React and Deezer’s API
- Solves CORS issues so the frontend can fetch music info safely
- Will support future **caching and logging**

### ✨ API Endpoints

| Route | Description |
|-------|-------------|
| `/` | Test route (returns HTML response) |
| `/api/search-album?q=...` | Searches Deezer for albums |
| `/api/album/:id` | Gets tracks for a Deezer album ID |

### 💡 Why is the backend needed?

Deezer's public API **doesn't support CORS**, which means React apps **can’t call it directly** in the browser.  
So instead:

```
React App → Express Backend → Deezer API → Express → React
```

This proxy approach is common in full stack apps.

---

## 🧪 Sample Flow

1. User enters `"Radiohead"` and `"OK Computer"` in the form
2. React calls:
   - `/api/search-album?q=OK Computer Radiohead`
3. Backend contacts Deezer → gets album ID
4. React calls:
   - `/api/album/12345`
5. Backend returns track list
6. React shows one song at a time for rating

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/song-comparing-app.git
cd song-comparing-app
```

---

### 2. Start the backend server

```bash
cd song-compare-backend
npm install
npm start
```

Runs on [http://localhost:4000](http://localhost:4000)

---

### 3. Start the frontend React app

```bash
cd ../song-compare
npm install
npm start
```

Runs on [http://localhost:3000](http://localhost:3000)

---

## 📦 Tech Stack

| Layer     | Tools |
|-----------|-------|
| Frontend  | React, TypeScript, Bootstrap, Framer Motion |
| Backend   | Node.js, Express, node-fetch, cors |
| API       | Deezer public API |
| State     | useState + props (no Redux needed) |
| Styling   | CSS + Bootstrap classes |

---

## 🔄 Planned Features

- [x] Fetch songs from Deezer using a custom proxy
- [x] Support multiple users rating the same album
- [x] Generate a song-by-song rating table
- [x] Handle skipped songs and input validation
- [x] Add animated transitions and Bootstrap UI
- [ ] Add **autocomplete** suggestions (in progress)
- [ ] Add **backend caching** of API results
- [ ] Add **request logging** on backend
- [ ] Optional login (username only or session-based)
- [ ] Deployment via Railway (backend) + Vercel (frontend)

---

## 👨‍🎤 About the Author

Made with ❤️ by **Nadav Hacham**  
Musician 🎸 | Developer 💻 | CS Student 🧠

- GitHub: [github.com/nadavh19](https://github.com/nadavh19)

---

## 📜 License

MIT License — use it freely and build cool stuff.