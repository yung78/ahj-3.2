import Taskbar from './Taskbar.js';

export default function forTests(a, b) {
  return a + b;
}

const taskBar = new Taskbar();
taskBar.actionAll();
