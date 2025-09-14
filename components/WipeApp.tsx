"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // بديل useNavigate
import { usePuterStore } from "@/lib/puter"; // مسار على حسب عندك

type FSItem = {
  id: string;
  name: string;
  path: string;
};

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
  const router = useRouter();
  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      router.push("/auth?next=/wipe");
    }
  }, [isLoading, auth.isAuthenticated, router]);

  const handleDelete = async () => {
    for (const file of files) {
      await fs.delete(file.path);
    }
    await kv.flush();
    loadFiles();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error {String(error)}</div>;
  }

  return (
    <div>
      <div>Authenticated as: {auth.user?.username}</div>
      <div>Existing files:</div>
      <div className="flex flex-col gap-4">
        {files.map((file) => (
          <div key={file.id} className="flex flex-row gap-4">
            <p>{file.name}</p>
          </div>
        ))}
      </div>
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={handleDelete}
        >
          Wipe App Data
        </button>
      </div>
    </div>
  );
};

export default WipeApp;
