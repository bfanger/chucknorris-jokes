import { createFileRoute } from "@tanstack/react-router";
import useJokes from "#/services/use-jokes";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const jokes = useJokes();
  return (
    <div>
      <ul>
        {jokes.data.map((joke) => (
          <li key={joke.id} className="p-2">
            {joke.value}
          </li>
        ))}
        {jokes.loading && <li className="pt-2 animate-pulse">Loading...</li>}
      </ul>
    </div>
  );
}
