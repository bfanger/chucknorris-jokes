import * as valibot from "valibot";
import jokeSchema, { type Joke } from "./joke-schema";
import { create } from "zustand";
import fetchRandomJoke from "./fetch-random-joke";
import { useEffect } from "react";

const jokeLimit = 10;

interface State {
  data: Joke[];
  failed: boolean;
  loading: boolean;
}
interface Actions {
  init: () => void;
  rotateJoke: () => Promise<void>;
}
const useJokesStore = create<State & Actions>((set, get) => {
  const state: State = {
    data: [],
    failed: false,
    loading: false,
  };
  const actions: Actions = {
    init: () => {
      if (get().loading || get().data.length > 0) {
        return;
      }
      set({ loading: true });
      Promise.all(Array.from({ length: jokeLimit }).map(() => actions.rotateJoke()))
        .catch((error) => {
          console.warn(error);
          set({ failed: true });
        })
        .finally(() => {
          set({ loading: false });
        });
    },
    rotateJoke: () =>
      fetchRandomJoke().then((joke) => {
        if (get().data.some((entry) => entry.id === joke.id)) {
          return new Promise((resolve) =>
            setTimeout(() => {
              void actions.rotateJoke().then(resolve);
            }, 3000),
          );
        }
        set((state) => {
          const from = state.data.length < jokeLimit ? 0 : 1;
          return { data: [...state.data.slice(from), valibot.parse(jokeSchema, joke)] };
        });
      }),
  };
  return { ...state, ...actions };
});

/**
 * UseJokes fetches a batch of random jokes after initial render to prevent hydration issues
 */
export default function useJokes() {
  const { init, ...store } = useJokesStore();
  useEffect(() => init(), [init]);
  return store;
}

export const _testing = { useJokesStore };
