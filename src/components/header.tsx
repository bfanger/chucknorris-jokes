import { Link } from "@tanstack/react-router";
import { useFavorites } from "#/services/use-favorites";

export default function Header() {
  const favorites = useFavorites();
  return (
    <header className="flex gap-2 bg-slate-800 p-3 text-slate-200 max-lg:flex-col">
      <h1 className="font-peralta basis-1/3 text-2xl font-bold tracking-wider max-lg:text-center max-sm:text-xl">
        <Link to="/">Chuck Norris jokes</Link>
      </h1>
      <nav className="flex grow justify-center gap-6">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          className="cursor-pointer border-b-2 border-transparent"
          activeProps={{ className: "cursor-pointer border-b-2 border-transparent font-bold" }}
        >
          Jokes
        </Link>
        <Link
          to="/favorites"
          className="cursor-pointer border-b-2 border-transparent"
          activeProps={{ className: "cursor-pointer border-b-2 border-transparent font-bold" }}
        >
          Favorites
          {favorites.ready && Boolean(favorites.jokes.length) && ` (${favorites.jokes.length})`}
        </Link>
      </nav>
      <div className="basis-1/3 max-sm:hidden" />
    </header>
  );
}
