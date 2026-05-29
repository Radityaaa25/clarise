export function WaveDivider({
  fromColor,
  toColor,
  flip = false,
}: {
  fromColor: string;
  toColor: string;
  flip?: boolean;
}) {
  return (
    <div
      className={`relative h-16 w-full overflow-hidden ${flip ? "rotate-180" : ""}`}
      style={{ background: fromColor }}
    >
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}
