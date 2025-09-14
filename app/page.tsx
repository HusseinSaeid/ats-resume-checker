"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AuthGuard from "@/components/HomeAuth";
import Navbar from "@/components/Navebar";
import ResumeCard from "@/components/ResumeCard";
import { usePuterStore } from "@/lib/puter";
import { ImSpinner2 } from "react-icons/im";

export default function Home() {
  const { kv, fs, auth, isLoading } = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserResumes = async () => {
      if (!auth.isAuthenticated || isLoading) return;

      try {
        setLoading(true);
        // Get all resume keys for the current user
        const resumeKeys = await kv.list("resume:*");

        if (!resumeKeys || resumeKeys.length === 0) {
          setResumes([]);
          setLoading(false);
          return;
        }

        // Load all resume data
        const resumePromises = resumeKeys.map(async (key) => {
          const resumeData = await kv.get(key);
          if (!resumeData) return null;

          const resume = JSON.parse(resumeData);

          // Convert file paths to blob URLs for display
          try {
            const imageBlob = await fs.read(resume.imagePath);
            if (imageBlob) {
              resume.imageUrl = URL.createObjectURL(imageBlob);
            }
          } catch (error) {
            console.error("Failed to load image for resume:", resume.id, error);
            // Fallback to a placeholder or default image
            resume.imageUrl = "/images/resume_01.png";
          }

          return resume;
        });

        const loadedResumes = (await Promise.all(resumePromises)).filter(
          Boolean
        );
        setResumes(loadedResumes);
      } catch (error) {
        console.error("Failed to load resumes:", error);
        setResumes([]);
      } finally {
        setLoading(false);
      }
    };

    loadUserResumes();
  }, [auth.isAuthenticated, isLoading, kv, fs]);

  return (
    <main className="bg-gradient bg-cover">
      <AuthGuard />

      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Resume Ratings</h1>
          <h2>
            AI-powered ATS analysis with instant feedback to improve your CV
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <ImSpinner2 className="w-16 h-16 text-blue-600 animate-spin" />
          </div>
        ) : resumes.length > 0 ? (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl text-gray-600 mb-8">No resumes found</h3>
            <Link href="/upload" className="primary-button py-4 px-8 w-full">
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
