import fetchRandomJoke, { type Joke } from "./fetch-random-joke";
import { useEffect, useState } from "react";

/**
 * Load 10 jokes in parallel, populate the jokes array as they arrive
 */
export default function useJokes() {
  const [loading, setLoading] = useState(true),
    [failed, setFailed] = useState(false),
    [data, setData] = useState([] as Joke[]);

  useEffect(() => {
    Promise.all(
      Array.from({ length: 10 }).map(() =>
        fetchRandomJoke().then((joke: Joke) => {
          setData((current) => [...current, joke]);
        }),
      ),
    )
      .catch((error) => {
        console.warn(error);
        setFailed(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { data, failed, loading };
}
