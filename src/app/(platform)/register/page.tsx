"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "usehooks-ts";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import AnimatedContent from "@/components/blocks/Animations/AnimatedContent/AnimatedContent";
import { AppBackButton } from "@/components/common/AppBackButton";

import { trpc } from "@/app/_trpc/client";

const formSchema = z.object({
  username: z.string().min(2, "Username must be more than 2").max(50),
});

const RegisterPage = () => {
  const router = useRouter();
  const [_, setUsername] = useLocalStorage("wd_ar_workshop", "");

  const [formError, setFormError] = useState<string>();

  const workshopRegistration = trpc.activities.registerUser.useMutation({
    onSuccess: ({ response_code, response_message }) => {
      setFormError(undefined);

      if (response_code !== "0000") {
        setFormError(response_message);
        return;
      }

      setUsername(form.getValues().username);
      router.push("/collection");
    },
    onError: ({ message }) => console.log("Error" + message),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await workshopRegistration.mutateAsync({
      userName: values.username,
    });
  }

  return (
    <div className="p-4 h-screen overflow-hidden flex flex-col">
      <AppBackButton />
      <div className="w-full h-full mt-6">
        <AnimatedContent
          distance={150}
          direction="horizontal"
          reverse={false}
          duration={0.5}
          ease="power3.out"
          animateOpacity
          scale={1}
          threshold={0.2}
          delay={0.4}
        >
          <div className="p-4 border rounded-lg bg-secondary/50">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-2xl font-bold">
                        Username
                      </FormLabel>
                      <FormDescription>
                        Please enter your username to continue.
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="Enter username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      {formError && (
                        <div className="text-sm p-1 px-2 bg-destructive/30 border border-destructive rounded-sm text-destructive">
                          {formError}
                        </div>
                      )}
                    </FormItem>
                  )}
                />
                <div className="w-full flex justify-end">
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </Form>
          </div>
        </AnimatedContent>
      </div>
    </div>
  );
};

export default RegisterPage;
