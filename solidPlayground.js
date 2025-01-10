// ! ----------------
// ! 1. h1
// ! ----------------
import { createSignal, createEffect } from './reactive';

const [count, setCount] = createSignal(0);

const h1 = document.createElement('h1');
createEffect(() => {
  h1.textContent = `The ninjas are ${count()}`;
});
// setCount(count() + 3)

document.body.textContent = ''; // just bc of this env
document.body.append(h1);

// ! ----------------
// ! 2. Button
// ! ----------------
import { createSignal, createEffect } from './reactive';
// import { createSignal, createEffect } from "solid-js";

const [count, setCount] = createSignal(0);

const h1 = document.createElement('h1');
createEffect(() => {
  h1.textContent = `The ninjas are ${count()}`;
});
// setCount(count() + 3)

const button = document.createElement('button');
button.textContent = 'Click me';
// button.onclick = () => setCount(() => count() + 1); // from solid-js
button.onclick = () => setCount(count() + 1); // from reactive

document.body.textContent = ''; // just bc of this env
document.body.append(h1, button);

// ! ----------------------------------------------------------------
// ! 3. compiler from solid-js to translate h1 + button
// ! ----------------------------------------------------------------
import { createSignal, createEffect } from 'solid-js';

const [count, setCount] = createSignal(0);

const h1 = document.createElement('h1');
createEffect(() => {
  h1.textContent = `The ninjas are ${count()}`;
});
// const h1 = <h1>The count is {count()}</h1>; // compiler sees if it is property access or a function call

// setCount(count() + 3)

const button = document.createElement('button');
button.textContent = 'Click me';
button.onclick = () => setCount(() => count() + 1); // from solid-js

// compiler to create translate jsx into vanilla
// const button = (
//   <button onClick={() => setCount(() => count() + 1)}>Click me</button>
// );

document.body.textContent = ''; // just bc of this env
document.body.append(h1, button);

// ! -------------------------
// ! 4. refactor to Counter()
// ! -------------------------

// refactor to then return <><h1>... <button>...</>
// use render

import { createSignal } from 'solid-js';
import { render } from 'solid-js/web';

const [count, setCount] = createSignal(0);

const h1 = <h1>The count is {count()}</h1>;

const button = (
  <button onClick={() => setCount(() => count() + 1)}>Click me</button>
);

// function Counter(){
//   const [count, setCount] = createSignal(0);
//   console.log('Counter');

//   const h1 = <h1>The count is {count()}</h1>;

//   const button = (
//     <button onClick={() => setCount(() => count() + 1)}>Click me</button>
//   );
//   return [h1, button];
// }

document.body.textContent = '';
document.body.append(h1, button);
// document.body.append(...Counter());

// render(Counter, document.body);

// things to mention
// 1. counter is nothing special.
// it wont re-render with console.log('Counter'). or setInterval(() => setCount(() => count() + 1), 1000); just the text node updates.
// our component is just a fn that runs once - our compiler literally created just one effect around that count - that is all that is changing

// ! -------------------------
// ! 4. refactor to App()
// ! -------------------------

import { createSignal } from 'solid-js';
import { render } from 'solid-js/web';

function Counter() {
  const [count, setCount] = createSignal(0);
  console.log('Counter');

  return (
    <>
      <h1>The count is {count()}</h1>
      <button onClick={() => setCount(() => count() + 1)}>Click me</button>
    </>
  );
}

function App() {
  return (
    <>
      <Counter />
      <Counter />
      <Counter />
    </>
  );
}

render(App, document.body);

// things to mention:
// move createSignal out - shared state or individual state super easy

// maybe if time allows:

// function Counter(props) {
//   const [count, setCount] = createSignal(0);
//   console.log("Counter");

//   return (
//     <>
//       <h1>The count is {props.children}</h1>
//       <button onClick={props.onClick}>Click me</button>
//     </>
//   );
// }

// <Counter onClick={() => setCount(() => count() + 1)}>{count()}</Counter>
// <Counter onClick={() => setCount(() => count() + 2)}>{count() * 2}</Counter>
