import { useEffect, useEffectEvent, useRef } from "react";

interface Props {
  /** Duration in seconds */
  duration: number;
  onTimeout: () => void;
}
export default function Timer({ duration, onTimeout }: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const onTimeoutEvent = useEffectEvent(onTimeout);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) {
      return;
    }
    Object.assign(bar.style, { transform: "scaleX(1)", transitionDuration: "0s" });
    void bar.offsetWidth;
    Object.assign(bar.style, { transform: "scaleX(0)", transitionDuration: `${duration}s` });

    bar.addEventListener("transitionend", onTimeoutEvent);

    return () => {
      bar.removeEventListener("transitionend", onTimeoutEvent);
    };
  }, [duration]);

  return (
    <div className="h-0.5 w-full">
      <div ref={barRef} className="h-full bg-slate-400 transition-transform ease-linear" />
    </div>
  );
}
