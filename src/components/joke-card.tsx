import FavoriteStar from "./favorite-star";
import type { Joke } from "../services/joke-schema";
import Timer from "./timer";
import { decode } from "he";
import useFavorite from "#/services/use-favorite";

interface Props {
  joke: Joke;
  active?: boolean;
  paused?: boolean;
  onTimeout?: () => void;
}
export default function JokeCard({ joke, active = false, paused = false, onTimeout }: Props) {
  const { ready, favorite, toggleFavorite } = useFavorite(joke);
  return (
    <div className="relative mx-auto min-h-16 w-full max-w-[60ch]">
      <div className="absolute top-0 -right-3 h-full w-3 bg-white sm:[clip-path:polygon(100%_0,0_0,0_100%)]" />
      <div className="absolute top-0 -left-3 h-full w-3 bg-white sm:[clip-path:polygon(100%_0,0_100%,100%_100%)]" />
      <div className="absolute inset-0 bg-white">
        {active && onTimeout && !paused && <Timer duration={5} onTimeout={onTimeout} />}
      </div>
      <div
        className={`relative py-2.5 pr-12 pl-4 leading-tight font-bold text-gray-900 ${active ? "text-2xl" : "text-sm"}`}
      >
        {decode(joke.value)}
      </div>
      <div className="absolute top-0 -right-2">
        <FavoriteStar ready={ready} checked={favorite} onToggle={toggleFavorite} />
      </div>
    </div>
  );
}
