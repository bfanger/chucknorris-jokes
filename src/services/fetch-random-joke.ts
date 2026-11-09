export interface Joke {
  categories: string[];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
}
export default async function fetchRandomJoke() {
  const response = await fetch("https://api.chucknorris.io/jokes/random");
  if (!response.ok) {
    throw new Error(`API server responded with an error (HTTP${response.status})`);
  }
  return (await response.json()) as Joke;
}
