# Snap

State manager & query tool for react apps

## Info

- #### 🚧 Query tool available soon

[Npm Package Link](https://www.npmjs.com/package/@jodd/snap)

## Usage

### Create a store

```tsx
import { createStore } from '@jodd/snap';

type State = {
  name: string;
  age: number;
  active: boolean;
  lastScores: number[];
  data: unknown;
};

type Actions = {
  updateName: (name: string) => void;
  updateAge: (age: number) => void;
  toggleActive: () => void;
  updateScore: (score: number) => void;
  fetchData: () => Promise<void>;
};

export const usePlayerStore = createStore<State & Actions>((set, get) => ({
  // provide an initial state to the store
  name: '',
  age: 30,
  active: false,
  lastScores: [77, 83, 113],
  data: null,

  // use actions
  updateName(name) {
    set({ name });
  },

  updateAge(age) {
    set({ age });
  },

  toggleActive() {
    set({ active: !get().active });
  },

  updateScore(score) {
    set({ lastScores: [...get().lastScores, score] });
  },

  // use asynchronous actions
  async fetchData() {
    const data = await fetch('https://fakestoreapi.com/products/1', { method: 'GET' }).then((res) =>
      res.json()
    );
    set({ data });
  }
  //
}));
```

### Use store state

```tsx
import { usePlayerStore } from './store';
// Pick entire state

function Component() {
  // rerenders on each state change
  const player = usePlayerStore();
}
```

### Pick an atomic state

```tsx
import { usePlayerStore } from './store';

function Component() {
  // rerenders only when player.name changes
  const name = usePlayerStore((state) => state.name);
}
```

### Pick multiple slices from state

```tsx
import { usePlayerStore } from './store';
import { useShallow } from '@jodd/snap';

function Component() {
  // rerenders only when state.active or state.data changes
  const [active, data] = usePlayerStore(useShallow((state) => [state.active, state.data]));
  // or
  const { active, data } = usePlayerStore(
    useShallow((state) => ({ active: state.active, data: state.data }))
  );
}
```

## Credits

- Inspired by [Zustand](https://github.com/pmndrs/zustand) for client state management
- Inspired by [Tanstack Query](https://github.com/TanStack/query) for server state management
