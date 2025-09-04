const ScoreCircle = ({ score = 75 }: { score: number }) => {
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);

  // لون واحد صافي أحمر → أصفر → أخضر
  const hue = (score / 100) * 120;
  const Color = `hsl(${hue}, 100%, 40%)`;

  return (
    <div className="relative w-[100px] h-[100px]">
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {/* الخلفية */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="transparent"
        />

        {/* الدايرة الملونة */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke={Color}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      {/* النص */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-semibold text-sm" style={{ color: Color }}>
          {`${score}/100`}
        </span>
      </div>
    </div>
  );
};

export default ScoreCircle;
