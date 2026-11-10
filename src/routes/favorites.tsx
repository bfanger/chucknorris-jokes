import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import JokeCard from "#/components/joke-card";
import Loading from "#/components/loading";
import useFavorites from "#/services/use-favorites";

export const Route = createFileRoute("/favorites")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Favorites",
      },
    ],
  }),
});

function RouteComponent() {
  const { ready, jokes } = useFavorites();
  return (
    <div>
      <LayoutGroup id="favorites">
        <ul className="my-10">
          <AnimatePresence initial={false} mode="popLayout">
            {jokes.map((joke) => (
              <motion.li
                key={joke.id}
                layout
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, marginBottom: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-2 overflow-hidden"
              >
                <JokeCard joke={joke} />
              </motion.li>
            ))}
          </AnimatePresence>
          {ready && !jokes.length && (
            <li className="pt-2 text-center font-bold">
              No favorites yet. Star a joke on the{" "}
              <Link className="text-slate-500 hover:underline" to="/">
                Jokes page
              </Link>
              !
            </li>
          )}
          {!ready && <Loading />}
        </ul>
      </LayoutGroup>
    </div>
  );
}
