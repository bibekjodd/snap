import { useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
export const useShallow = <State, SelectorOutput extends Object>(
  selector: (state: State) => Readonly<SelectorOutput>
): ((state: State) => Readonly<SelectorOutput>) => {
  const prevStateRef = useRef<SelectorOutput>();
  return (state) => {
    const prevState = prevStateRef.current;
    const nextState = selector(state);

    if (!(nextState instanceof Array || nextState instanceof Object)) {
      throw new Error('useShallow() must return an Array or an Object');
    }

    if (!prevState) {
      prevStateRef.current = nextState;
      return nextState;
    }

    const keys = Object.keys(prevState);
    // @ts-expect-error expect this...
    const isEqual = keys.every((key) => prevState[key] === nextState[key]);
    if (isEqual) return prevState;
    prevStateRef.current = nextState;
    return nextState;
  };
};
