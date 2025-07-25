"use client";
import { Fragment, useState } from "react";
import { Icon } from "@iconify/react";

import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface FileWithPreview extends File {
  preview: string;
}
interface FileUploaderMultipleProps {
  onUploadSuccess?: () => void;
}

const FileUploaderMultiple = ({ onUploadSuccess }: FileUploaderMultipleProps) => {

  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const promise = () =>
    new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 1000));

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
    },
  });

  const renderFilePreview = (file: FileWithPreview) => {
    if (file.type.startsWith("image")) {
      return (
        <Image
          width={48}
          height={48}
          alt={file.name}
          src={URL.createObjectURL(file)}
          className=" rounded border p-0.5"
        />
      );
    } else {
      return <Icon icon="tabler:file-description" />;
    }
  };

  const handleRemoveFile = (file: FileWithPreview) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  const fileList = files.map((file) => (
    <div
      key={file.name}
      className=" flex justify-between border px-3.5 py-3 my-6 rounded-md"
    >
      <div className="flex gap-3 items-center">
        <div className="file-preview">{renderFilePreview(file)}</div>
        <div>
          <div className=" text-sm  text-card-foreground">{file.name}</div>
          <div className=" text-xs font-light text-muted-foreground">
            {Math.round(file.size / 100) / 10 > 1000 ? (
              <>{(Math.round(file.size / 100) / 10000).toFixed(1)}</>
            ) : (
              <>{(Math.round(file.size / 100) / 10).toFixed(1)}</>
            )}
            {" kb"}
          </div>
        </div>
      </div>

      <Button
        size="icon"
        color="destructive"
        variant="outline"
        className=" border-none rounded-full"
        onClick={() => handleRemoveFile(file)}
      >
        <Icon icon="tabler:x" className=" h-5 w-5" />
      </Button>
    </div>
  ));

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <Fragment>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className=" w-full text-center border-dashed border  rounded-md py-[52px] flex  items-center flex-col">
          <div className="h-12 w-12 inline-flex rounded-md bg-muted items-center justify-center mb-3">
            <Upload className="h-6 w-6 text-default-500" />
          </div>
          <h4 className=" text-2xl font-medium mb-1 text-card-foreground/80">
            Drop files here or click to upload.
          </h4>
          {/* <div className=" text-xs text-muted-foreground">
            ( This is just a demo drop zone. Selected files are not actually
            uploaded.)
          </div> */}
        </div>
      </div>
      {files.length ? (
        <Fragment>
          <div>{fileList}</div>
          <div className=" flex justify-end gap-2">
            <Button variant="soft" size="sm" color="destructive" onClick={handleRemoveAllFiles}>
              Remove All
            </Button>
            <Button
              size="sm"
              color="primary"
              onClick={async () => {
                const toastId = toast.loading("Menyimpan...", {
                  position: "top-right",
                });

                try {
                  await promise(); // proses upload

                  toast.success("File berhasil disimpan.", {
                    id: toastId,
                    position: "top-right",
                  });

                  onUploadSuccess?.(); // ✅ panggil setelah sukses
                } catch (err) {
                  toast.error("Terjadi kesalahan saat menyimpan.", {
                    id: toastId,
                    position: "top-right",
                  });

                  console.error("Upload error:", err);
                }
              }}
            >
              Upload Files
            </Button>

          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default FileUploaderMultiple;
