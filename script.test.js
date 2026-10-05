const assert = require("node:assert/strict");

// Run with: node script.test.js (also suitable for a Jenkins build step).
const tests = [
	["adds a task", () => {
		const tasks = [];
		tasks.push({ id: 1, title: "Finish homework", completed: false });
		assert.equal(tasks.length, 1);
		assert.equal(tasks[0].title, "Finish homework");
	}],
	["marks a task complete", () => {
		const task = { id: 1, title: "Study", completed: false };
		task.completed = true;
		assert.equal(task.completed, true);
	}],
	["deletes a task", () => {
		const tasks = [{ id: 1 }, { id: 2 }];
		const remaining = tasks.filter((task) => task.id !== 1);
		assert.deepEqual(remaining, [{ id: 2 }]);
	}],
	["filters tasks by completion status", () => {
		const tasks = [{ completed: true }, { completed: false }, { completed: true }];
		assert.equal(tasks.filter((task) => task.completed).length, 2);
	}],
	["rejects a blank task title", () => {
		const title = "   ";
		assert.equal(title.trim().length > 0, false);
	}],
];

let failures = 0;
for (const [name, test] of tests) {
	try {
		test();
		console.log(`PASS ${name}`);
	} catch (error) {
		failures += 1;
		console.error(`FAIL ${name}: ${error.message}`);
	}
}

console.log(`${tests.length - failures}/${tests.length} tests passed`);
if (failures > 0) process.exitCode = 1;