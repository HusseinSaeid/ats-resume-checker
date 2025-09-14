import ScoreHalfCircle from "./ScoreHalfCircle";
import ScoreFeedBack from "./ScoreFeedBack";
const Category = ({ title, score }: { title: string; score: number }) => {
  const hue = (score / 100) * 120;
  const Color = `hsl(${hue}, 100%, 40%)`;

  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="text-2xl font-semibold text-gray-800">{title}</p>
          <ScoreFeedBack score={score} />
        </div>
        <p className="text-2xl font-bold">
          <span style={{ color: Color }}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};
const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className=" bg-white/60 b rounded-2xl shadow-md w-full ">
      <div className="flex flex-row items-center p-4 gap-8">
        <ScoreHalfCircle score={feedback.overallScore} />
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-gray-800">
            Your Resume Score
          </h2>
          <p className="text-sm text-gray-600">
            This Score Is Calculated Based on The Variables Listed Below
          </p>
        </div>
      </div>
      <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
      <Category title="Content" score={feedback.content.score} />
      <Category title="Structure" score={feedback.structure.score} />
      <Category title="Skills" score={feedback.skills.score} />
    </div>
  );
};
export default Summary;
