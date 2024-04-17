import { createStore } from '../store';

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
  name: '',
  age: 30,
  active: false,
  lastScores: [77, 83, 113],
  data: null,

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

  async fetchData() {
    const data = await fetch('https://fakestoreapi.com/products/1', { method: 'GET' }).then((res) =>
      res.json()
    );
    set({ data });
  }
  //
}));
