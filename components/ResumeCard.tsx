import Link from "next/link";
import Image from "next/image";
import ScoreCircle from "./ScoreCircle";
export default function ResumeCard({ resume }: { resume: Resume }) {
  return (
    <Link
      href={`/resume/${resume.id}`}
      className="resume-card bg-white/60 backdrop-blur-md shadow-sm animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-row md:flex-col gap-2">
          <h2 className="text-black font-bold break-words">
            {resume.companyName}
          </h2>
          <h3 className="text-lg text-gray-500 break-words">
            {resume.jobTitle}
          </h3>
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={resume.feedback.overallScore} />
        </div>
      </div>
      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full">
          <Image
            src={resume.imagePath}
            alt="resume"
            width={500}
            height={500}
            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
          />
        </div>
      </div>
    </Link>
  );
}
