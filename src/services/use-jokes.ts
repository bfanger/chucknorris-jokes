import * as valibot from "valibot";
import { type Joke, jokeSchema } from "./joke-schema";
import { useEffect, useState } from "react";
import fetchRandomJoke from "./fetch-random-joke";

/**
 * Load 10 jokes in parallel, populate the jokes array as they arrive
 */
export default function useJokes(limit: number) {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [data, setData] = useState([] as Joke[]);

  useEffect(() => {
    Promise.all(
      Array.from({ length: limit }).map(() =>
        fetchRandomJoke().then((joke) => {
          setData((current) => [...current, valibot.parse(jokeSchema, joke)]);
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
