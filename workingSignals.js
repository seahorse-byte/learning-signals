let subscriber = null;

export function createSignal(value) {
  console.log('createSignal');

  const read = () => {
    return value;
  };

  const write = newValue => {
    value = newValue;
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
