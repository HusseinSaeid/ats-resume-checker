import { cn } from "@/lib/utils";
import { MdCheckCircle, MdWarning, MdError } from "react-icons/md";
import { IoCheckmark, IoWarning } from "react-icons/io5";

const ATS = ({
  score,
  suggestions,
}: {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl shadow-md w-full bg-gradient-to-b to-light-white p-8 flex flex-col gap-4",
        score > 69
          ? "from-green-100"
          : score > 49
          ? "from-yellow-100"
          : "from-red-100"
      )}
    >
      <div className="flex flex-row gap-4 items-center">
        {score > 69 ? (
          <MdCheckCircle className="w-10 h-10 text-green-600" />
        ) : score > 49 ? (
          <MdWarning className="w-10 h-10 text-yellow-600" />
        ) : (
          <MdError className="w-10 h-10 text-red-600" />
        )}
        <p className="text-2xl font-bold text-gray-800">
          ATS Score - {score}/100
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-xl text-gray-800">
          How well does your resume pass through Applicant Tracking Systems?
        </p>
        <p className="text-lg text-gray-600">
          Your resume was scanned like an employer would. Here&apos;s how it
          performed:
        </p>
        {suggestions.map((suggestion, index) => (
          <div className="flex flex-row gap-2 items-center" key={index}>
            {suggestion.type === "good" ? (
              <IoCheckmark className="w-4 h-4 text-green-600" />
            ) : (
              <IoWarning className="w-4 h-4 text-yellow-600" />
            )}
            <p className="text-lg text-gray-700">{suggestion.tip}</p>
          </div>
        ))}
        <p className="text-lg text-gray-600">
          Want a better score? Improve your resume by applying the suggestions
          listed below.
        </p>
      </div>
    </div>
  );
};

export default ATS;
