# 🎓 Student Task Manager

A simple and intuitive **Student Task Management Web Application** designed to help colleges and students organize student records, academic tasks, deadlines, and task progress from a centralized dashboard.

The application provides a clean dashboard for managing student information and their associated academic tasks, while automatically tracking pending, completed, and overdue work.

---

## 📌 Overview

Managing academic tasks across multiple students can become difficult when information is scattered across different platforms or maintained manually.

**Student Task Manager** provides a centralized interface where student records and their assigned tasks can be created, viewed, updated, searched, and deleted.

The application also provides real-time dashboard statistics such as:

* 👨‍🎓 Total number of students
* ⏳ Pending tasks
* ✅ Completed tasks
* ⚠️ Overdue tasks

All application data is stored locally in the browser using **Local Storage**, allowing the application to retain data even after the browser is refreshed.

---

## ✨ Features

### 👨‍🎓 Student Management

Create and maintain student records containing:

* Student ID
* Full Name
* Course
* Academic Year
* Assigned Task
* Task Status
* Due Date

---

### ➕ Add Student

Users can add a new student record through the dashboard form.

Required information includes:

* Student ID
* Full Name
* Course
* Task Title

Additional information such as academic year, task status, and due date can also be provided.

---

### ✏️ Edit Student Records

Existing student records can be edited directly from the student table.

Selecting **Edit** automatically populates the form with the student's existing information, allowing individual fields to be modified before saving.

---

### 🗑️ Delete Student Records

Student records can be permanently removed using the **Delete** action.

A confirmation prompt is displayed before deletion to help prevent accidental removal of records.

---

### 🔎 Search

The application includes a real-time search feature.

Users can search student records using:

* Student ID
* Student Name
* Course
* Task Title
* Task Status

Search results are updated dynamically as the user types.

---

### 📊 Dashboard Statistics

The dashboard provides an overview of the current student/task data.

| Statistic            | Description                                |
| -------------------- | ------------------------------------------ |
| 👨‍🎓 Total Students | Total number of student records            |
| ⏳ Pending Tasks      | Tasks currently marked as Pending          |
| ✅ Completed          | Tasks marked as Completed                  |
| ⚠️ Overdue           | Incomplete tasks whose due date has passed |

These statistics are recalculated whenever the underlying student data changes.

---

### 📅 Due Date & Overdue Detection

Each task can have an associated due date.

The application automatically determines whether an incomplete task is overdue by comparing its due date with the current date.

Completed tasks are not considered overdue, even if their original due date has passed.

Overdue records are visually highlighted in the student table.

---

### 🔄 Task Status

Every task can have one of three statuses:

* **Pending**
* **In Progress**
* **Completed**

The status is displayed using visual badges in the student records table.

---

### 💾 Local Data Persistence

Student records are stored using the browser's `localStorage`.

This means:

* Data survives browser refreshes
* No backend server is required
* No external database is required
* The application can work completely on the client side

The application uses the storage key:

```text
student_task_management
```

If no saved data is found, the application initializes itself with demo student records.

---

### 🔁 Reset Demo Data

A **Reset Demo Data** option is available on the dashboard.

This restores the application to its initial sample dataset and is useful when demonstrating or testing the application.

---

## 🛠️ Tech Stack

### Frontend

* **HTML5** — Application structure and semantic markup
* **CSS3** — Styling, layout, responsive interface, and visual states
* **JavaScript (ES6+)** — Application logic, DOM manipulation, event handling, search, CRUD operations, and state management
* **Web Storage API** — Client-side persistence through `localStorage`

### Development Tools

* Git
* GitHub
* Any modern web browser
* VS Code or another code editor

---

## 🏗️ Project Architecture

This is a **client-side web application** with no dedicated backend or database server.

```text
┌─────────────────────────────────────┐
│          Student Task Manager       │
└─────────────────────────────────────┘
                  │
                  ▼
        ┌───────────────────┐
        │     index.html    │
        │   User Interface  │
        └─────────┬─────────┘
                  │
                  ▼
        ┌───────────────────┐
        │     script.js     │
        │ Application Logic │
        └─────────┬─────────┘
                  │
          ┌───────┴────────┐
          ▼                ▼
   ┌─────────────┐  ┌──────────────┐
   │ DOM / UI    │  │ localStorage │
   │ Updates     │  │ Persistence  │
   └─────────────┘  └──────────────┘
                  │
                  ▼
          Student Records
```

---

## 📂 Project Structure

```text
student-task-manager/
│
├── index.html
├── style.css
├── script.js
└── readme.md
```

### `index.html`

Contains the main application interface, including:

* Dashboard header
* Statistics cards
* Student entry form
* Student records table
* Search field
* Edit/Delete controls
* Reset functionality

The HTML defines fields for student ID, name, course, year, task title, status, and due date.

---

### `style.css`

Contains the visual design of the application, including:

* Dashboard layout
* Form styling
* Table styling
* Buttons
* Status badges
* Overdue indicators
* Responsive layout
* Hover and interaction states

---

### `script.js`

Contains the main application logic.

Responsibilities include:

* Loading saved records
* Saving records to `localStorage`
* Adding students
* Editing students
* Deleting students
* Searching records
* Calculating dashboard statistics
* Detecting overdue tasks
* Rendering the student table
* Resetting demo data

The current implementation maintains student records in a JavaScript array and synchronizes that state with browser `localStorage`.

---

## 🧩 Data Model

Each student record follows this structure:

```javascript
{
    id: 1,
    studentId: "S-101",
    name: "Aisha Khan",
    course: "Computer Science",
    year: "3rd Year",
    taskTitle: "Database Lab",
    status: "Pending",
    dueDate: "2026-08-18"
}
```

### Field Description

| Field       | Description                           |
| ----------- | ------------------------------------- |
| `id`        | Internal unique identifier            |
| `studentId` | College/student identification number |
| `name`      | Student's full name                   |
| `course`    | Student's course or department        |
| `year`      | Current academic year                 |
| `taskTitle` | Assigned academic task                |
| `status`    | Current task status                   |
| `dueDate`   | Task deadline                         |

---

## 🔄 Application Workflow

### 1. Application Startup

When the application loads:

```text
Start Application
       ↓
Check localStorage
       ↓
Data Available?
   ↙           ↘
 Yes            No
 ↓              ↓
Load Data    Load Demo Data
   ↘           ↙
     Render UI
```

The application checks the `student_task_management` storage key. If no valid data exists, the predefined demo dataset is loaded.

---

### 2. Adding a Student

```text
User fills form
       ↓
Form validation
       ↓
Create student object
       ↓
Add to students array
       ↓
Save to localStorage
       ↓
Update dashboard
       ↓
Update student table
```

New records receive an internal ID generated using the current timestamp.

---

### 3. Editing a Student

```text
Click Edit
    ↓
Find selected student
    ↓
Populate form
    ↓
User modifies data
    ↓
Save Changes
    ↓
Update student array
    ↓
Save to localStorage
    ↓
Re-render interface
```

---

### 4. Deleting a Student

```text
Click Delete
     ↓
Confirmation prompt
     ↓
User confirms?
   ↙       ↘
 No         Yes
 ↓           ↓
Cancel    Remove record
             ↓
        Update storage
             ↓
        Re-render UI
```

---

### 5. Searching

Search is performed dynamically whenever the user enters text.

The search system checks multiple fields:

```text
Student ID
Name
Course
Task Title
Status
```

The table is then re-rendered with only matching records.

---

## 📊 Dashboard Logic

The dashboard statistics are calculated dynamically from the current student dataset.

### Total Students

```javascript
students.length
```

### Pending Tasks

```javascript
students.filter(
    student => student.status === "Pending"
).length
```

### Completed Tasks

```javascript
students.filter(
    student => student.status === "Completed"
).length
```

### Overdue Tasks

A task is considered overdue when:

```text
Due Date < Current Date
AND
Status != Completed
```

This prevents completed tasks from appearing in the overdue count.

---

## 🚀 Getting Started

### Prerequisites

No special backend environment is required.

You only need:

* A modern web browser
* Git (optional, if cloning the repository)
* A code editor such as VS Code (optional)

---

## 📥 Installation

### Clone the Repository

```bash
git clone https://github.com/AdityaVK2006/student-task-manager.git
```

Navigate into the project:

```bash
cd student-task-manager
```

---

## ▶️ Running the Application

Because this is a client-side application, there is no dependency installation or backend server required.

### Option 1 — Open Directly

Open:

```text
index.html
```

in a modern browser.

### Option 2 — VS Code Live Server

If using VS Code, install the **Live Server** extension and open the project using Live Server.

The application will then be available through a local address such as:

```text
http://127.0.0.1:5500/
```

---

## 🖥️ How to Use

### Add a Student

1. Open the application.
2. Enter the student's ID.
3. Enter the student's full name.
4. Enter their course.
5. Select their academic year.
6. Enter the task title.
7. Select the task status.
8. Select a due date.
9. Click **Add Student**.

---

### Search for a Student

Use the search box above the student records table.

For example:

```text
Computer Science
```

or:

```text
Database
```

or:

```text
S-101
```

The table will automatically display matching records.

---

### Edit a Record

1. Locate the student.
2. Click **Edit**.
3. Modify the required fields.
4. Click **Save Changes**.

---

### Delete a Record

1. Locate the student.
2. Click **Delete**.
3. Confirm the deletion.

---

### Reset the Application

Click:

```text
Reset Demo Data
```

and confirm the action.

This restores the original demonstration dataset.

---

## 🔐 Data & Privacy

This version of the application does **not use a backend server or external database**.

Student information is stored in the browser's local storage.

Therefore:

* Data is local to the browser/device.
* Data is not automatically synchronized between devices.
* Clearing browser storage can remove application data.
* Opening the application in another browser will not provide access to the same records.

For a production deployment involving real student information, a secure backend and proper authentication/authorization should be implemented.

---

## ⚠️ Current Limitations

The current version is intentionally lightweight and client-side.

### No User Authentication

There is currently no login or role-based access control.

### No Backend

All operations happen within the browser.

### No Multi-User Synchronization

Multiple users cannot share the same task database.

### Browser-Dependent Storage

Data is stored using `localStorage`, meaning it is tied to the browser/device.

### Limited Task Model

Each student record currently represents one associated task. A more advanced version could allow each student to have multiple tasks.

---

## 🔮 Future Enhancements

The project can be extended into a more complete student productivity platform.

### 👤 Authentication & Authorization

Add:

* Student login
* Faculty/admin login
* Role-based access control
* Secure sessions
* Password hashing

---

### 🗄️ Backend & Database

Replace browser storage with a backend architecture such as:

```text
Frontend
   ↓
REST API
   ↓
Backend Server
   ↓
Database
```

Possible technologies:

* Node.js
* Express.js
* MongoDB / MySQL / PostgreSQL

---

### 📚 Multiple Tasks per Student

Instead of:

```text
Student → One Task
```

the system could support:

```text
Student
   │
   ├── Assignment
   ├── Project
   ├── Lab Work
   └── Examination
```

---

### 🔔 Notifications & Reminders

Introduce deadline reminders for:

* Upcoming tasks
* Due today
* Overdue tasks

---

### 📈 Analytics

Add charts showing:

* Task completion rate
* Pending vs completed tasks
* Student-wise performance
* Course-wise task distribution
* Monthly productivity

---

### 🏷️ Task Priority

Add priority levels:

```text
Low
Medium
High
Critical
```

---

### 📱 Improved Responsive Design

Further optimize the application for:

* Mobile phones
* Tablets
* Desktop screens

---

### ☁️ Cloud Deployment

The application can be deployed using platforms such as:

* GitHub Pages
* Netlify
* Vercel

For a full-stack version, the frontend and backend can be deployed separately.

---

## 🧪 Testing Checklist

Before submitting or demonstrating the application, test the following:

* [ ] Add a new student
* [ ] Edit an existing student
* [ ] Delete a student
* [ ] Search by student ID
* [ ] Search by name
* [ ] Search by course
* [ ] Search by task
* [ ] Change task status
* [ ] Add a due date
* [ ] Verify overdue detection
* [ ] Refresh the browser and verify persistence
* [ ] Reset demo data
* [ ] Test empty search results
* [ ] Test required form fields
* [ ] Test the application on different screen sizes

---

## 🤝 Contributing

Contributions and improvements are welcome.

### Recommended Workflow

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/new-feature
```

3. Make your changes.
4. Test the application.
5. Commit your changes.

```bash
git add .
git commit -m "Add new feature"
```

6. Push the branch.

```bash
git push origin feature/new-feature
```

7. Open a Pull Request.

---

## 📌 Project Goals

The main goals of this project are to:

* Build a practical student-focused web application.
* Practice frontend web development.
* Understand DOM manipulation.
* Implement CRUD operations using JavaScript.
* Learn client-side data persistence.
* Practice Git and GitHub workflows.
* Understand basic application architecture.
* Build a foundation for future full-stack development.

---

## 📄 License

This project is currently intended for **educational and academic purposes**.

If this project is later released as an open-source application, an explicit license such as the MIT License can be added.

---

## 👥 Contributors

This project is developed as a collaborative college project.

### Repository

**Student Task Manager**

[GitHub Repository](https://github.com/AdityaVK2006/student-task-manager?utm_source=chatgpt.com)

---

## ⭐ Support

If you find this project useful or interesting:

* ⭐ Star the repository
* 🍴 Fork the project
* 🐛 Report issues
* 💡 Suggest improvements
* 🤝 Contribute new features

---

## 📸 Project Preview

> Add screenshots of the application here to make the GitHub repository more attractive.

Recommended screenshots:

```text
1. Dashboard
2. Add Student Form
3. Student Records Table
4. Search Functionality
5. Edit Student
6. Overdue Task Highlighting
```

Example:

```markdown
![Dashboard](screenshots/dashboard.png)
```

---

## 📚 Learning Outcomes

Through this project, developers gain practical experience with:

* HTML5 structure
* CSS3 layouts and styling
* JavaScript ES6+
* DOM manipulation
* Event-driven programming
* Array methods such as `filter()` and `map()`
* Form validation
* CRUD operations
* Browser Local Storage
* Dynamic UI rendering
* Git version control
* GitHub collaboration

---

## 🚀 Future Vision

The current application provides a foundation for a larger **Student Productivity and Academic Management System**.

The long-term version could evolve into a full-stack platform where students, faculty, and administrators have dedicated dashboards.

```text
                    Student Task Manager
                           │
             ┌─────────────┼─────────────┐
             │             │             │
          Students       Faculty      Admin
             │             │             │
             ▼             ▼             ▼
          Tasks         Tracking      Management
             │             │             │
             └─────────────┼─────────────┘
                           ▼
                     Central Database
```

The current frontend implementation establishes the core task-management workflow, while future versions can introduce authentication, cloud storage, notifications, analytics, and multi-user collaboration.
Student task Management web App 

