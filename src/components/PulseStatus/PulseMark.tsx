
interface PulseMarkProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  muted?: boolean;
  animated?: boolean;
  className?: string;
}

const PulseMark = ({
  size = "md",
  muted = false,
  animated = false,
  className = "",
}: PulseMarkProps) => {
  return (
    <span
      className={[
        "pulse-mark",
        `pulse-mark--${size}`,
        muted ? "pulse-mark--muted" : "",
        animated ? "pulse-mark--animated" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <svg
        className="pulse-mark__icon"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M13.25 2.5L5.5 13h5.65L10.5 21.5 18.5 10.5h-5.7l.45-8Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
};

export default PulseMark;