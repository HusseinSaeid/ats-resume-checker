"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FileUploader from "./FileUploader";
import { usePuterStore } from "@/lib/puter";
import { convertPdfToImage } from "@/lib/pdf2img";
import { generateUUID } from "@/lib/utils";
import { prepareInstructions, AIResponseFormat } from "@/constants/index";
type ChatMessageContent = {
  type: "file" | "text";
  puter_path?: string;
  text?: string;
};
type AIResponse = {
  message: {
    content: string | ChatMessageContent[];
  };
};
export default function UploadComponent() {
  const router = useRouter();
  const { fs, ai, kv } = usePuterStore();
  const [file, setFile] = useState<File | null>(null);
  const [statusText, setStatusText] = useState<string>("");
  const [scanning, setScanning] = useState(false);
  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };
  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    try {
      setScanning(true);
      setStatusText("Uploading resume...");
      const uploadFile = await fs.upload([file]);
      if (!uploadFile) {
        setStatusText("Failed to upload resume.");
        setScanning(false);
        return;
      }
      setStatusText("converting to Image...");
      const imageFile = await convertPdfToImage(file);
      if (!imageFile.file)
        return setStatusText("Failed to convert PDF to image.");
      setStatusText("Uploading the Image...");
      const uploadImage = await fs.upload([imageFile.file]);
      if (!uploadImage) {
        setStatusText("Failed to upload image.");
        setScanning(false);
        return;
      }
      setStatusText("Working on data...");
      const uuid = generateUUID();
      interface StoredResume {
        id: string;
        resumePath: string;
        imagePath: string;
        companyName: string;
        jobTitle: string;
        jobDescription: string;
        feedback: unknown;
      }
      const data: StoredResume = {
        id: uuid,
        resumePath: uploadFile.path,
        imagePath: uploadImage.path,
        companyName,
        jobTitle,
        jobDescription,
        feedback: "",
      };
      await kv.set(`resume:${uuid}`, JSON.stringify(data));
      setStatusText("Analyzing resume...");
      const feedBack = (await ai.feedback(
        uploadFile.path,
        prepareInstructions({
          jobTitle: jobTitle as string,
          jobDescription: jobDescription as string,
          AIResponseFormat,
        })
      )) as AIResponse | undefined;
      if (!feedBack) return setStatusText("Failed to analyze resume.");
      const feedbackContent = feedBack.message.content;
      let feedbackText = "";
      if (typeof feedbackContent === "string") {
        feedbackText = feedbackContent;
      } else {
        const textItem = (feedbackContent as ChatMessageContent[]).find(
          (c) => c.type === "text"
        );
        feedbackText = textItem?.text ?? "";
      }
      try {
        data.feedback = JSON.parse(feedbackText) as unknown;
      } catch {
        data.feedback = feedbackText as unknown;
      }
      setStatusText("Saving feedback...");

      // حفظ البيانات المحدثة
      await kv.set(`resume:${uuid}`, JSON.stringify(data));

      setStatusText("Redirecting...");
      console.log("Resume analysis completed:", data);

      // إعادة التوجيه إلى صفحة النتائج
      router.push(`/resume/${uuid}`);

      // إعادة تعيين حالة المسح
      setScanning(false);
    } catch (error) {
      console.error("Error during resume analysis:", error);
      setStatusText("Analysis failed. Please try again.");
      setScanning(false);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;
    if (!file) return;
    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };
  return (
    <div className="scanning-indicator">
      {scanning ? (
        <>
          <h2>{statusText}</h2>
          <Image
            src="/images/resume-scan.gif"
            alt="Loading..."
            width={500}
            height={500}
          />
        </>
      ) : (
        <h2>Get instant feedback powered by AI to improve your CV</h2>
      )}
      {!scanning && (
        <form
          id="upload-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-12 bg-white/60 backdrop-blur-md shadow-sm rounded-2xl p-8"
        >
          <div className="form-div">
            <label htmlFor="company-name" className="pl-4">
              Company Name
            </label>
            <input
              type="text"
              id="company-name"
              name="company-name"
              placeholder="Enter company name"
              className="text-black"
            />
          </div>
          <div className="form-div">
            <label htmlFor="job-title" className="pl-4">
              Job Title
            </label>
            <input
              type="text"
              id="job-title"
              name="job-title"
              placeholder="Enter job title"
              className="text-black"
            />
          </div>
          <div className="form-div">
            <label htmlFor="job-description" className="pl-4">
              Job Description
            </label>
            <textarea
              rows={5}
              id="job-description"
              name="job-description"
              placeholder="Enter job description"
              className="text-black resize-none overflow-auto"
            />
          </div>
          <div className="form-div">
            <label htmlFor="uploader" className="pl-4">
              Upload Resume{" "}
            </label>{" "}
            <FileUploader onFileSelect={handleFileSelect} />
          </div>
          <button type="submit" className="primary-button mt-4">
            Scan Resume
          </button>
        </form>
      )}
    </div>
  );
}
