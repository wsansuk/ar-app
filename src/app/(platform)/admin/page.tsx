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

// password schema
const formSchema = z.object({
  username: z.string().min(2, "Username must be more than 2").max(50),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

const AdminLoginPage = () => {
  const router = useRouter();
  const [_, setAdminToken] = useLocalStorage("admin_token", ""); // token/admin session

  const [formError, setFormError] = useState<string>();

  // trpc login
  const adminLogin = trpc.admin.login.useMutation({
    onSuccess: (result) => {
      const { response_code, response_message, admin } = result;

      if (response_code !== "0000") {
        setFormError(response_message);
        return;
      }

      setAdminToken(admin.token); // token in admin object
      router.push("/leaderboard");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await adminLogin.mutateAsync({
      userName: values.username,
      password: values.password,
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
                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-bold">
                        Admin Username
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-bold">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Error message */}
                {formError && (
                  <div className="text-sm p-1 px-2 bg-destructive/30 border border-destructive rounded-sm text-destructive">
                    {formError}
                  </div>
                )}

                <div className="w-full flex justify-end">
                  <Button type="submit">Login</Button>
                </div>
              </form>
            </Form>
          </div>
        </AnimatedContent>
      </div>
    </div>
  );
};

export default AdminLoginPage;
