import { JokeCard } from "#/components/joke-card";
import { createFileRoute } from "@tanstack/react-router";
import { useFavorites } from "#/services/use-favorites";

export const Route = createFileRoute("/favorites")({
  component: RouteComponent,
});

function RouteComponent() {
  const { ready, jokes } = useFavorites();
  return (
    <div>
      <ul className="my-10">
        {ready &&
          jokes.map((joke) => (
            <li key={joke.id} className="mb-2">
              <JokeCard joke={joke} />
            </li>
          ))}
        {ready && !jokes.length && (
          <li className="pt-2 text-center font-bold">
            No favorites yet. Star a joke on the home page!
          </li>
        )}
        {!ready && <li className="animate-pulse pt-2 text-center font-bold">Loading...</li>}
      </ul>
    </div>
  );
}
