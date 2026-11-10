interface Props {
  joke: string;
}
export function JokeCard({ joke }: Props) {
  return (
    <div className="mx-auto w-full max-w-[60ch] rounded-xl bg-white px-5 py-2 font-bold text-gray-900">
      {joke}
    </div>
  );
}
