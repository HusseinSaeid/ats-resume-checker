"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "@/lib/utils";
import { FaFileUpload } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
}

export default function FileUploader({ onFileSelect }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
      const file = acceptedFiles[0] || null;
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 20 * 1024 * 1024, // 20MB
  });

  const file = files[0] || null;

  return (
    <div className="w-full gradient-border backdrop-blur-md shadow-sm text-black">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer ">
          {file ? (
            <div
              className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-md shadow-sm rounded-lg "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-4">
                <FaFilePdf className="text-4xl text-gray-400" />
                <div>
                  <p className="text-sm font-semibold truncate max-w-xs text-gray-800">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                className="p-2 cursor-pointer hover:bg-gray-100 bg-white/60 backdrop-blur-md shadow-sm rounded-full transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setFiles([]);
                  onFileSelect?.(null);
                }}
              >
                <RxCross2 className="text-gray-400 text-2xl" />
              </button>
            </div>
          ) : (
            <div className="text-center p-8 ">
              <div className="mx-auto flex items-center justify-center mb-4 ">
                <FaFileUpload className="text-6xl text-gray-400" />
              </div>
              <p className="text-lg text-gray-700 mb-2">
                <span className="font-semibold">Click to Upload</span> or Drag &
                Drop
              </p>
              <p className="text-sm text-gray-600">PDF Max Size: 20MB</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
