import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import JokeCard from "#/components/joke-card";
import Loading from "#/components/loading";
import { createFileRoute } from "@tanstack/react-router";
import useJokes from "#/services/use-jokes";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const jokes = useJokes();
  const [paused, setPaused] = useState(false);

  return (
    <div className="mb-5">
      <div className="relative mx-auto my-4 w-fit text-3xl text-slate-700">
        <button
          type="button"
          onClick={() => setPaused((prev) => !prev)}
          aria-pressed={paused}
          className="block cursor-pointer hover:text-slate-900"
          title={paused ? "Resume" : "Pause"}
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
        </button>
        {paused && (
          <button
            type="button"
            className="absolute top-0 left-10 cursor-pointer hover:text-slate-900"
            title="Next joke"
            onClick={() => jokes.rotateJoke()}
          >
            <NextIcon />
          </button>
        )}
      </div>
      <LayoutGroup id="jokes">
        <ul>
          <AnimatePresence initial={false} mode="popLayout">
            {jokes.data.map((joke, index) => (
              <motion.li
                key={joke.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: index === 0 ? 1 : 0.6 }}
                exit={{ height: 0, marginBottom: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-2 overflow-hidden"
              >
                <JokeCard
                  joke={joke}
                  active={index === 0}
                  paused={paused}
                  onTimeout={() => jokes.rotateJoke()}
                />
              </motion.li>
            ))}
          </AnimatePresence>
          {jokes.loading && <Loading />}
          {jokes.failed && (
            <li className="pt-2 text-center font-bold text-red-600">Failed to load jokes</li>
          )}
        </ul>
      </LayoutGroup>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 5v14l10-7z" />
      <path d="M18 5h2v14h-2z" />
    </svg>
  );
}
