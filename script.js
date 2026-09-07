const storageKey = "student_task_management";

const initialStudents = [
  {
    id: 1,
    studentId: "S-101",
    name: "Aisha Khan",
    course: "Computer Science",
    year: "3rd Year",
    taskTitle: "Database Lab",
    status: "Pending",
    dueDate: "2026-08-18"
  },
  {
    id: 2,
    studentId: "S-102",
    name: "Daniel Smith",
    course: "Information Technology",
    year: "2nd Year",
    taskTitle: "Web Design Project",
    status: "In Progress",
    dueDate: "2026-08-15"
  },
  {
    id: 3,
    studentId: "S-103",
    name: "Priya Sharma",
    course: "Business Admin",
    year: "4th Year",
    taskTitle: "Research Report",
    status: "Completed",
    dueDate: "2026-08-10"
  }
];

let students = loadStudents();
let editingId = null;

const form = typeof document !== "undefined" ? document.getElementById("studentForm") : null;
const formTitle = typeof document !== "undefined" ? document.getElementById("formTitle") : null;
const submitBtn = typeof document !== "undefined" ? document.getElementById("submitBtn") : null;
const cancelEditBtn = typeof document !== "undefined" ? document.getElementById("cancelEditBtn") : null;
const tableBody = typeof document !== "undefined" ? document.getElementById("studentTableBody") : null;
const searchInput = typeof document !== "undefined" ? document.getElementById("searchInput") : null;
const resetDataBtn = typeof document !== "undefined" ? document.getElementById("resetDataBtn") : null;

function loadStudents() {
  if (typeof localStorage === "undefined") {
    return [...initialStudents];
  }

  const saved = localStorage.getItem(storageKey);

  if (!saved) {
    localStorage.setItem(storageKey, JSON.stringify(initialStudents));
    return [...initialStudents];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : [...initialStudents];
  } catch (error) {
    return [...initialStudents];
  }
}

function saveStudents() {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(storageKey, JSON.stringify(students));
}

function renderStats() {
  if (typeof document === "undefined") return;

  document.getElementById("totalStudents").textContent = students.length;
  document.getElementById("pendingTasks").textContent = students.filter(
    (student) => student.status === "Pending"
  ).length;
  document.getElementById("completedTasks").textContent = students.filter(
    (student) => student.status === "Completed"
  ).length;
  document.getElementById("overdueTasks").textContent = students.filter(isOverdue).length;
}

function isOverdue(student) {
  if (!student.dueDate || student.status === "Completed") return false;

  const now = new Date();
  const today = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
    .map((value) => String(value).padStart(2, "0"))
    .join("-");
  return student.dueDate < today;
}

function matchSearch(student, query) {
  const text = [
    student.studentId,
    student.name,
    student.course,
    student.taskTitle,
    student.status
  ]
    .join(" ")
    .toLowerCase();

  return text.includes(query);
}

function renderTable() {
  if (!tableBody || !searchInput) return;

  const query = searchInput.value.trim().toLowerCase();
  const filteredStudents = students.filter((student) => matchSearch(student, query));

  if (!filteredStudents.length) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="empty-row">No student records match your search.</td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filteredStudents
    .map(
      (student) => `
        <tr class="${isOverdue(student) ? "overdue-row" : ""}">
          <td>${student.studentId}</td>
          <td>${student.name}</td>
          <td>${student.course}</td>
          <td>${student.year}</td>
          <td>${student.taskTitle}</td>
          <td>
            <span class="badge ${student.status === "Pending" ? "pending" : student.status === "In Progress" ? "progress" : "completed"}">
              ${student.status}
            </span>
          </td>
          <td>${student.dueDate || "-"}${isOverdue(student) ? '<span class="overdue-label">Overdue</span>' : ""}</td>
          <td>
            <div class="action-btns">
              <button class="edit-btn" type="button" data-action="edit" data-id="${student.id}">Edit</button>
              <button class="delete-btn" type="button" data-action="delete" data-id="${student.id}">Delete</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");
}

function resetForm() {
  if (!form || !formTitle || !submitBtn || !cancelEditBtn) return;

  form.reset();
  editingId = null;
  formTitle.textContent = "Add New Student";
  submitBtn.textContent = "Add Student";
  cancelEditBtn.classList.add("hidden");
}

function fillForm(student) {
  if (typeof document === "undefined") return;

  document.getElementById("studentId").value = student.studentId;
  document.getElementById("name").value = student.name;
  document.getElementById("course").value = student.course;
  document.getElementById("year").value = student.year;
  document.getElementById("taskTitle").value = student.taskTitle;
  document.getElementById("status").value = student.status;
  document.getElementById("dueDate").value = student.dueDate || "";

  editingId = student.id;
  formTitle.textContent = "Edit Student";
  submitBtn.textContent = "Save Changes";
  cancelEditBtn.classList.remove("hidden");
}

function handleSubmit(event) {
  if (typeof event !== "undefined") {
    event.preventDefault();
  }

  if (typeof document === "undefined") return;

  const studentData = {
    studentId: document.getElementById("studentId").value.trim(),
    name: document.getElementById("name").value.trim(),
    course: document.getElementById("course").value.trim(),
    year: document.getElementById("year").value,
    taskTitle: document.getElementById("taskTitle").value.trim(),
    status: document.getElementById("status").value,
    dueDate: document.getElementById("dueDate").value
  };

  if (!studentData.studentId || !studentData.name || !studentData.course || !studentData.taskTitle) {
    alert("Please fill in all required fields.");
    return;
  }

  if (editingId !== null) {
    students = students.map((student) =>
      student.id === editingId ? { ...student, ...studentData } : student
    );
  } else {
    students.unshift({
      id: Date.now(),
      ...studentData
    });
  }

  saveStudents();
  render();
  resetForm();
}

function handleTableClick(event) {
  if (typeof window === "undefined" || typeof event === "undefined") return;

  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const action = target.dataset.action;
  const id = Number(target.dataset.id);

  if (!action || Number.isNaN(id)) return;

  const selectedStudent = students.find((student) => student.id === id);
  if (!selectedStudent) return;

  if (action === "edit") {
    fillForm(selectedStudent);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (action === "delete") {
    const confirmed = window.confirm(`Delete ${selectedStudent.name}'s record?`);
    if (!confirmed) return;

    students = students.filter((student) => student.id !== id);
    saveStudents();

    if (editingId === id) {
      resetForm();
    }

    render();
  }
}

function render() {
  renderStats();
  renderTable();
}

if (form) {
  form.addEventListener("submit", handleSubmit);
}
if (searchInput) {
  searchInput.addEventListener("input", renderTable);
}
if (resetDataBtn) {
  resetDataBtn.addEventListener("click", () => {
    const confirmed = window.confirm("Reset the demo data?");
    if (!confirmed) return;

    students = [...initialStudents];
    saveStudents();
    resetForm();
    render();
  });
}
if (cancelEditBtn) {
  cancelEditBtn.addEventListener("click", resetForm);
}
if (tableBody) {
  tableBody.addEventListener("click", handleTableClick);
}

if (typeof document !== "undefined") {
  render();
}

if (typeof module !== "undefined") {
  module.exports = {
    storageKey,
    initialStudents,
    students,
    editingId,
    loadStudents,
    saveStudents,
    renderStats,
    isOverdue,
    matchSearch,
    renderTable,
    resetForm,
    fillForm,
    handleSubmit,
    handleTableClick,
    render
  };
}
