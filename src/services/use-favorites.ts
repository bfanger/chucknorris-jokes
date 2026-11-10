import * as valibot from "valibot";
import jokeSchema, { type Joke } from "./joke-schema";
import { create } from "zustand";
import { useEffect } from "react";

const schema = valibot.array(jokeSchema);

interface State {
  ready: boolean;
  jokes: Joke[];
}
interface Actions {
  init: () => void;
  toggle: (joke: Joke) => void;
}
const useFavoritesStore = create<State & Actions>((set) => {
  const state: State = {
    jokes: [],
    ready: false,
  };
  const actions: Actions = {
    init: () =>
      set((state) => {
        if (state.ready) {
          return {};
        }
        try {
          const jokes = valibot.parse(schema, JSON.parse(localStorage.getItem("favorites") ?? ""));
          return { jokes, ready: true };
        } catch {
          return { jokes: [], ready: true };
        }
      }),
    toggle: (joke: Joke) =>
      set((state) => {
        if (!state.ready) {
          throw new Error("Not ready");
        }
        const jokes = state.jokes.some((entry) => entry.id === joke.id)
          ? state.jokes.filter((entry) => entry.id !== joke.id)
          : [...state.jokes, joke];
        localStorage.setItem("favorites", JSON.stringify(jokes));
        return { jokes };
      }),
  };
  return { ...state, ...actions };
});

/**
 * UseFavorites is backed by localStorage and retrieved its data after initial render to prevent hydration issues
 */
export default function useFavorites() {
  const { init, ...store } = useFavoritesStore();
  useEffect(() => init(), [init]);
  return store;
}
