# ✅ Todo List App

A modern Todo List web application built with **React**, **TypeScript**, **React Router**, and **IndexedDB** for persistent local storage. This app supports authenticated users, allowing them to manage their tasks with full **CRUD functionality**.

---

## ✨ Features

- 🔐 **Authentication**: Users must sign in using a user from `users.json`.
- 📝 **Create Todos**: Each user can create multiple todo lists.
- 📌 **Add Tasks**: Each todo list can contain many individual tasks.
- ✅ **Toggle Tasks**: Tasks can be marked as complete/incomplete.
- ✏️ **Edit Tasks**: Update the task text inline.
- 🗑️ **Delete Tasks & Todos**: Remove unwanted tasks or whole todos.
- 🧠 **Persistent Storage**: Uses IndexedDB to save data locally per user.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AddItem.tsx
│   ├── Header.tsx
│   ├── Layout.tsx
│   ├── ProtectedRoutes.tsx
│   ├── TaskItem.tsx
│   ├── TaskList.tsx
│   ├── TodoContainer.tsx
│   └── TodoItem.tsx
├── context/
│   ├── AuthProvider.tsx
│   └── TodoProvider.tsx
├── pages/
│   ├── Login.tsx
│   ├── task.tsx
│   └── Home.tsx
├── types/
│   ├── Task.d.ts
│   ├── Todo.d.ts
│   └── user.d.ts

├── data/
│   └── users.json
```

---

## 🛠️ Tech Stack

- **React**
- **TypeScript**
- **React Router DOM**
- **IndexedDB** (via `idb` package)
- **UUID** for unique IDs

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the app
```bash
npm run dev
```

---

## 🔐 Authentication

This app uses a basic login mechanism where you must sign in with a user listed in `users.json`. These credentials are loaded into the app and validated on login.

---

## 📌 Notes for Review

- The app uses **Context API + useReducer** to manage global todo state.
- IndexedDB was chosen to simulate persistent storage without needing a backend.
- Code is modular and broken down into reusable components.
- Clean and semantic class-based structure (no Tailwind or CSS frameworks used).
- Authentication is **mocked** using a static `users.json` file, ideal for demonstration or testing purposes.

---

## 🧑‍💻 Author

**Micheal Anwar**  
Frontend Developer | React & TypeScript Enthusiast

---

## 📬 Contact

- Email: mikelhfzy@gmail.com
- LinkedIn: [Michael Anwar](https://www.linkedin.com/in/michael-anwer-071489283/)

