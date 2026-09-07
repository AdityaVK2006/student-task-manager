const test = require('node:test');
const assert = require('node:assert/strict');

const mockForm = {
  reset() {},
  addEventListener() {}
};

const makeElement = () => ({
  value: '',
  textContent: '',
  innerHTML: '',
  classList: {
    add() {},
    remove() {}
  },
  addEventListener() {}
});

global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] ?? null;
  },
  setItem(key, value) {
    this.store[key] = value;
  }
};

global.document = {
  getElementById(id) {
    const base = {
      id,
      value: '',
      textContent: '',
      innerHTML: '',
      classList: {
        add() {},
        remove() {}
      },
      addEventListener() {}
    };

    if (id === 'studentForm') return mockForm;
    return base;
  }
};

const app = require('./script.js');

test('loadStudents returns the default dataset when storage is empty', () => {
  assert.equal(Array.isArray(app.loadStudents()), true);
  assert.equal(app.loadStudents().length > 0, true);
});

test('isOverdue marks past-due tasks correctly', () => {
  assert.equal(app.isOverdue({ dueDate: '2020-01-01', status: 'Pending' }), true);
  assert.equal(app.isOverdue({ dueDate: '2099-01-01', status: 'Pending' }), false);
  assert.equal(app.isOverdue({ dueDate: '2020-01-01', status: 'Completed' }), false);
});

test('matchSearch matches relevant student information', () => {
  const student = {
    studentId: 'S-101',
    name: 'Aisha Khan',
    course: 'Computer Science',
    taskTitle: 'Database Lab',
    status: 'Pending'
  };

  assert.equal(app.matchSearch(student, 'aisha'), true);
  assert.equal(app.matchSearch(student, 'database'), true);
  assert.equal(app.matchSearch(student, 'zzz'), false);
});
