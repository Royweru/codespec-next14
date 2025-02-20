"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const onSubmit = async (vals: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", vals);
      router.push(`/teacher/courses/${response.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const { isSubmitting, isValid } = form.formState;
  return (
    <div className=" max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className=" text-2xl">Name your course</h1>
        <p>
          What would you like to name your course? Don&#39;t worry ,you can
          change later
        </p>
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-8 mt-8"
          >
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder=" e.g 'Advanced development'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" flex items-center gap-x-2">
              <Link href={"/"}>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
