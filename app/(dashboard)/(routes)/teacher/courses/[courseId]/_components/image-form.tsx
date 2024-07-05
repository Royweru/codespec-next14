"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, { message: "imageUrl is required" }),
});
export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData?.imageUrl || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const toggleEdit = () => setIsEditing((current) => !current);
  const onSubmit = async (vals: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, vals),
        toast.success("Title edited successfully!", {
          style: { backgroundColor: "green" },
        });
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" mt-6 border bg-slate-100 rounded-md p-4">
      <div className=" font-medium flex items-center justify-between ">
        Course description
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className=" h-4 w-4 mr-2 " />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit Image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className=" flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className=" w-10 h-10 text-slate-500" />
          </div>
        ) : (
          <div className=" relative aspect-video mt-2">
            <Image
              alt=""
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endPoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className=" text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recomended
          </div>
        </div>
      )}
    </div>
  );
};
