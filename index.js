const btn = document.querySelector('button');
const box = document.getElementById('box');
const p1 = document.getElementById('p-1');
const boxWithMemo = document.getElementById('box-with-memo');

// STEP 1 - CREATE SIGNAL
// import { createSignal } from './workingSignals.js';
// const [count, setCount] = createSignal(10);

// btn.addEventListener('click', () => {
//   setCount(count() + 1);
//   box.innerText = count();
// });

// STEP 2 - CREATE EFFECT
// import { createSignal, createEffect } from './workingSignals.js';
// const [count, setCount] = createSignal(0);

// btn.addEventListener('click', () => {
//   setCount(count() + 1);
//   box.innerText = count();
// });

// const updateP1 = () =>
//   (p1.innerText = `I am just a paragraph that has the same value of the box: { ${count()} }`);

// createEffect(updateP1);

// createEffect(() =>
//   console.log('well anything can be here based on the count', count()),
// ); // - reactive vs. createEffect(() => console.log('well anything can be here based on the count')); not bc no count()

// STEP 3 - Create Memo
import { createSignal, createEffect, createMemo } from './workingSignals.js';
const [count, setCount] = createSignal(0);

const double = createMemo(() => count() * 2);

btn.addEventListener('click', () => {
  setCount(count() + 1);
  box.innerText = count();
});

const updateP1 = () =>
  (p1.innerText = `I am just a paragraph that has the same value of the box: { ${count()} }`);
const updateBoxWithMemo = () => (boxWithMemo.innerText = double());
createEffect(updateP1);

createEffect(updateBoxWithMemo);

createEffect(() =>
  console.log('well anything can be here based on the count:', count()),
); // - reactive vs. createEffect(() => console.log('well anything can be here based on the count')); not bc no count()
createEffect(() =>
  console.log('well anything can be here based on the double count:', double()),
); // - reactive vs. createEffect(() => console.log('well anything can be here based on the count')); not bc no count()
