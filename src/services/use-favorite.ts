import type { Joke } from "./joke-schema";
import { useCallback } from "react";
import useFavorites from "./use-favorites";

export default function useFavorite(joke: Joke) {
  const { ready, jokes, toggle } = useFavorites();
  const toggleFavorite = useCallback(() => toggle(joke), [toggle, joke]);
  return { favorite: jokes.some((entry) => entry.id === joke.id), ready, toggleFavorite };
}
