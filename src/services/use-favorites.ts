import * as valibot from "valibot";
import jokeSchema, { type Joke } from "./joke-schema";
import { create } from "zustand";
import { toast } from "sonner";
import { useEffect } from "react";

const schema = valibot.array(jokeSchema);
const favoriteLimit = 10;

interface State {
  ready: boolean;
  jokes: Joke[];
}
interface Actions {
  init: () => void;
  toggle: (joke: Joke) => boolean;
}
const useFavoritesStore = create<State & Actions>((set, get) => {
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
    toggle: (joke: Joke) => {
      const state = get();
      if (!state.ready) {
        throw new Error("Not ready");
      }
      if (
        !state.jokes.some((entry) => entry.id === joke.id) &&
        state.jokes.length >= favoriteLimit
      ) {
        toast("Favorites limit reached", {
          description: `Maxed out at ${favoriteLimit} Chuck Norris jokes. Adding more would melt your PC`,
        });
        return false;
      }
      const jokes = state.jokes.some((entry) => entry.id === joke.id)
        ? state.jokes.filter((entry) => entry.id !== joke.id)
        : [...state.jokes, joke];
      localStorage.setItem("favorites", JSON.stringify(jokes));
      set({ jokes });
      return true;
    },
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
