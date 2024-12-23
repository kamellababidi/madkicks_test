import { useCallback, DependencyList } from 'react';
import { debounce, DebouncedFunc, DebounceSettings } from 'lodash';

const wait: number = 500;
const options: DebounceSettings = {leading: true, trailing: false};
// ---------------------

export const useDebouncedCallback = <T extends (...args: any) => any>(callback: T, deps: DependencyList): DebouncedFunc<T> | T => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(debounce(callback, wait, options), deps);
};