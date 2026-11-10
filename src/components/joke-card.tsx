import FavoriteStar from "./favorite-star";
import type { Joke } from "../services/joke-schema";
import useFavorite from "#/services/use-favorite";

interface Props {
  joke: Joke;
}
export function JokeCard({ joke }: Props) {
  const { ready, favorite, toggleFavorite } = useFavorite(joke);
  return (
    <div className="relative mx-auto min-h-16 w-full max-w-[60ch]">
      <div className="absolute inset-0 bg-white sm:transform-[skewX(-10deg)]" />
      <div className="relative py-2.5 pr-12 pl-4 leading-tight font-bold text-gray-900">
        {joke.value}
      </div>
      <FavoriteStar ready={ready} checked={favorite} onToggle={toggleFavorite} />
    </div>
  );
}
