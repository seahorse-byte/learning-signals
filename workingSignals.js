let subscriber = null;

export function createSignal(value) {
  console.log('createSignal');

  let subscriptions = new Set();

  const read = () => {
    if (subscriber) {
      subscriptions.add(subscriber);
    }
    return value;
  };

  const write = newValue => {
    value = newValue;
    subscriptions.forEach(fn => fn());
  };

  return [read, write];
}

export function createEffect(fn) {
  subscriber = fn;
  fn();
  subscriber = null;
}

export function createMemo(fn) {
  const [signal, setSignal] = createSignal();
  createEffect(() => setSignal(fn()));
  return signal;
}
