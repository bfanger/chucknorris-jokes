import { beforeEach, expect, test, vi } from "vite-plus/test";
import { type Joke } from "./joke-schema";
import { _testing } from "./use-jokes";
import fetchRandomJoke from "./fetch-random-joke";

const { useJokesStore } = _testing;

let mockFetched: Joke[] = [];
vi.mock("./fetch-random-joke", () => ({
  default: vi.fn(async () => {
    const next = mockFetched.shift();
    if (!next) {
      throw new Error("No more mocked jokes");
    }
    return next;
  }),
}));

function makeJoke(id: string, value: string): Joke {
  return { id, value };
}

beforeEach(() => {
  mockFetched = [];
  vi.mocked(fetchRandomJoke).mockReset();
  useJokesStore.setState({ data: [], failed: false, loading: false });
});

test("rotateJoke adds a joke to an empty list", async () => {
  mockFetched = [makeJoke("1", "joke 1")];

  await useJokesStore.getState().rotateJoke();

  const { data } = useJokesStore.getState();
  expect(data).toHaveLength(1);
  expect(data[0]).toEqual(makeJoke("1", "joke 1"));
});

test("rotateJoke appends to the end of the list", async () => {
  mockFetched = [makeJoke("1", "joke 1"), makeJoke("2", "joke 2"), makeJoke("3", "joke 3")];

  await useJokesStore.getState().rotateJoke();
  await useJokesStore.getState().rotateJoke();
  await useJokesStore.getState().rotateJoke();

  const { data } = useJokesStore.getState();
  expect(data.map((jo) => jo.id)).toEqual(["1", "2", "3"]);
});

test("rotateJoke keeps max 10 jokes, dropping the oldest", async () => {
  for (let idx = 1; idx <= 11; idx++) {
    mockFetched.push(makeJoke(String(idx), `joke ${idx}`));
  }

  for (let idx = 0; idx < 11; idx++) {
    await useJokesStore.getState().rotateJoke();
  }

  const { data } = useJokesStore.getState();
  expect(data).toHaveLength(10);
  expect(data[0].id).toBe("2");
  expect(data[9].id).toBe("11");
});

test("init loads 10 jokes in parallel", async () => {
  for (let idx = 1; idx <= 10; idx++) {
    mockFetched.push(makeJoke(String(idx), `joke ${idx}`));
  }

  useJokesStore.getState().init();

  for (let idx = 0; idx < 10; idx++) {
    await Promise.resolve();
  }

  const { data, loading, failed } = useJokesStore.getState();
  expect(data).toHaveLength(10);
  expect(loading).toBe(false);
  expect(failed).toBe(false);
});

test("init sets failed on fetch error", async () => {
  useJokesStore.getState().init();

  for (let idx = 0; idx < 10; idx++) {
    await Promise.resolve();
  }

  const { failed } = useJokesStore.getState();
  expect(failed).toBe(true);
});

test("rotateJoke retries when duplicate id is fetched", async () => {
  vi.useFakeTimers();
  useJokesStore.setState({ data: [makeJoke("1", "existing")], failed: false, loading: false });
  mockFetched = [makeJoke("1", "duplicate"), makeJoke("2", "new")];

  const promise = useJokesStore.getState().rotateJoke();
  await vi.runAllTimersAsync();
  await promise;
  vi.useRealTimers();

  const { data } = useJokesStore.getState();
  expect(data.map((joke) => joke.id)).toEqual(["1", "2"]);
});
