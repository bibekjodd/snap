import { useSyncExternalStore } from 'react';
type Setter<State> = (newState: Partial<State> | ((newState: State) => Partial<State>)) => void;
type Getter<State> = () => State;
type Selector<State, SelectorOutput> = (state: State) => SelectorOutput;
type UseStore<State> = <SelectorOutput = State>(
  selector?: (state: State) => SelectorOutput
) => SelectorOutput;
type Subscriber<State> = (state: State) => void;
type Subscribe<State> = (callback: Subscriber<State>) => () => void;
type StoreApi<State> = {
  getInitialState: Getter<State>;
  setState: Setter<State>;
  getState: Getter<State>;
};
type Store<State> = UseStore<State> & StoreApi<State>;
type Creator<State> = (set: Setter<State>, get: Getter<State>) => State;

export function createStore<State>(creator: Creator<State>): Store<State> {
  let state = null as unknown as State;
  const subscribers = new Set<(state: State) => void>();

  const setState: Setter<State> = (newState) => {
    if (newState instanceof Function) {
      newState = newState(state);
      state = Object.assign({}, state, newState);
      subscribers.forEach((callback) => callback(state));
    } else {
      state = Object.assign({}, state, newState);
      subscribers.forEach((callback) => callback(state));
    }
  };

  const getState: Getter<State> = () => state;
  const initialState = creator(setState, getState);
  state = initialState;

  const subscribe: Subscribe<State> = (callback) => {
    subscribers.add(callback);
    return () => {
      subscribers.delete(callback);
    };
  };

  const useStore = <SelectorOutput = State>(
    selector: Selector<State, SelectorOutput> = (state) => state as unknown as SelectorOutput
  ): SelectorOutput => {
    return useSyncExternalStore(subscribe, () => selector(state));
  };
  const storeApi: StoreApi<State> = { getInitialState: () => initialState, getState, setState };
  const store: Store<State> = Object.assign(useStore, storeApi);
  return store;
}
