import AuthRedirect from "@/components/HomeAuth";
import Navbar from "@/components/Navebar";
import ResumeCard from "@/components/ResumeCard";
import { resumes } from "@/constants/index";

export default function Home() {
  return (
    <main className="bg-gradient bg-cover">
      <AuthRedirect />

      <Navbar />

      <section className="main-section">
        <div className="page-heading py-12">
          <h1>Track Your Resume Ratings</h1>
          <h2>
            AI-powered ATS analysis with instant feedback to improve your CV
          </h2>
        </div>
        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
