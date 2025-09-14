const ScoreHalfCircle = ({ score = 75 }: { score: number }) => {
  const radius = 40;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = Math.PI * normalizedRadius; // Half circle circumference
  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);

  // لون واحد صافي أحمر → أصفر → أخضر
  const hue = (score / 100) * 120;
  const Color = `hsl(${hue}, 100%, 40%)`;

  return (
    <div className="relative w-[100px] h-[50px]">
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 100 50"
        className="transform"
      >
        {/* الخلفية - نصف دائرة */}
        <path
          d={`M 10 50 A ${normalizedRadius} ${normalizedRadius} 0 0 1 90 50`}
          stroke="#e5e7eb"
          strokeWidth={stroke}
          fill="transparent"
        />

        {/* النصف دائرة الملونة */}
        <path
          d={`M 10 50 A ${normalizedRadius} ${normalizedRadius} 0 0 1 90 50`}
          stroke={Color}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      {/* النص */}
      <div className="absolute inset-0 flex items-center justify-center mt-4">
        <span className="font-semibold text-sm" style={{ color: Color }}>
          {`${score}/100`}
        </span>
      </div>
    </div>
  );
};

export default ScoreHalfCircle;
