"use client";

import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
import { ImSpinner2 } from "react-icons/im";
import { useState, useEffect } from "react";
import { usePuterStore } from "@/lib/puter";
import Ats from "./Ats";
import Summary from "./Summary";
import Details from "./Details";
import SignOutButton from "./SignOutButton";

const ResumePage = () => {
  const router = useRouter();

  const { auth, kv, fs, isLoading } = usePuterStore();

  const { id } = useParams();

  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      router.push(`/auth?next=/resume/${id}`);
    }
  }, [auth.isAuthenticated, isLoading, id, router]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
      console.log({ resumeUrl, imageUrl, feedback: data.Feedback });
    };

    loadResume();
  }, [id]);

  return (
    <main className="!pt-0">
      <nav className="resume-nav bg-white/60 backdrop-blur-md shadow-sm">
        <Link
          href="/"
          className="back-button bg-white/60 backdrop-blur-md shadow-sm"
        >
          <IoMdArrowRoundBack className="text-2xl text-gray-800" />
          <span className="text-gray-800 text-sm font-semibold">
            Back to Home Page
          </span>
        </Link>
        <SignOutButton variant="secondary" size="sm" className="ml-auto" />
      </nav>
      <div className="flex flex-row max-lg:flex-col-reverse w-full ">
        <section className="feedback-section bg-gradient bg-cover h-[100vh] sticky top-0 items-center justify-center">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit ">
              <a href={resumeUrl} target="_blank">
                <Image
                  src={imageUrl}
                  alt="Resume Preview"
                  title="Resume Preview"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-contain rounded-2xl"
                />
              </a>
            </div>
          )}
        </section>

        <section className="feedback-section bg-white/60 backdrop-blur-md shadow-sm">
          <h2 className="text-center text-4xl text-gray-800 font-bold">
            Resume Review
          </h2>
          {feedback ? (
            <div className="flex flex-col animate-in fade-in duration-1000 gap-8  ">
              <Summary feedback={feedback} />
              <Ats
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips}
              />
              <Details feedback={feedback} />
            </div>
          ) : (
            <div className="flex justify-center items-center py-16">
              <ImSpinner2 className="w-20 h-20 text-blue-600 animate-spin" />
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ResumePage;
