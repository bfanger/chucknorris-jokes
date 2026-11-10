import JokeCard from "#/components/joke-card";
import { createFileRoute } from "@tanstack/react-router";
import useJokes from "#/services/use-jokes";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const jokes = useJokes();

  return (
    <div className="my-10">
      {jokes.data[0] && <div className="mx-auto mb-1 w-20" key={jokes.data[0].id}></div>}
      <ul>
        {jokes.data.map((joke, index) => (
          <li key={joke.id} className="mb-2">
            <JokeCard joke={joke} active={index === 0} onTimeout={() => jokes.rotateJoke()} />
          </li>
        ))}
        {jokes.loading && <li className="animate-pulse pt-2 text-center font-bold">Loading...</li>}
        {jokes.failed && (
          <li className="pt-2 text-center font-bold text-red-600">Failed to load jokes</li>
        )}
      </ul>
    </div>
  );
}
