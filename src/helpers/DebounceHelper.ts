export default class DebounceHelper {
  static debounce = (
    timer: ReturnType<typeof setTimeout> | undefined,
    action: () => void,
    timeout: number = 300,
  ) => {
    clearTimeout(timer);

    return setTimeout(() => {
      action();
    }, timeout);
  };
}
