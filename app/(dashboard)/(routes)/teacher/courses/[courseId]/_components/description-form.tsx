"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
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

interface DescriptionFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
});
export const DescriptionForm = ({
  initialData,
  courseId,
}: DescriptionFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
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
          {isEditing && (
            <>
              <p
                className={cn(
                  " text-sm mt-2",
                  !initialData.description && " text-slate-500 italic"
                )}
              >
                {initialData.description || "No description"}
              </p>
            </>
          )}
          {!isEditing && (
            <>
              <Pencil className=" h-4 w-4 mr-2" />
              Edit description
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className=" text-sm mt-2">{initialData.description}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-4 mt-4"
          >
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="e.g 'This course is about...' "
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className=" flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting}>Save</Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
