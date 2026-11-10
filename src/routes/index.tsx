import { JokeCard } from "#/components/joke-card";
import { createFileRoute } from "@tanstack/react-router";
import useJokes from "#/services/use-jokes";

export const Route = createFileRoute("/")({ component: Home });

const jokeLimit = 10;

function Home() {
  const jokes = useJokes(jokeLimit);
  return (
    <div>
      <ul className="my-10">
        {jokes.data.map((joke) => (
          <li key={joke.id} className="mb-2">
            <JokeCard joke={joke.value} />
          </li>
        ))}
        {jokes.loading && <li className="animate-pulse pt-2 text-center font-bold">Loading...</li>}
      </ul>
    </div>
  );
}
