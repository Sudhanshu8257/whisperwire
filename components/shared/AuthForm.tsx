"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { auth, db } from "@/lib/firebase";
import { createUser } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
interface FormProps {
  title: string;
  description: string;
  navLink: string;
}
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
const AuthForm = ({ title, description, navLink }: FormProps) => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      const checkAndCreateDocument = async () => {
        // @ts-ignore
        const docRef = doc(db, "users", user.user.email);
        const docSnapshot = await getDoc(docRef);
        if (!docSnapshot.exists()) {
          console.log("exist : false");
          // @ts-ignore
          await setDoc(doc(db, "users", user.user.email), {
            id: user.user.uid,
            email: user.user.email,
            profilePic: user.user.photoURL,
            userName: user.user.displayName,
            friends: [],
            status: "offline",
          });
        }
        router.push("/chats");
      };
      checkAndCreateDocument();
    }
  }, [user, router]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Link
        href={"/"}
        className="flex items-center justify-center -mt-5 mb-2 self-start "
      >
        <Image src={"/assets/logo.png"} alt="logo" width={40} height={40} />
        <p className="text-md text-gray-300 font-bold font-caveat ">
          Whisper Wire
        </p>
      </Link>
      <div className="flex flex-col items-center w-full h-full gap-2">
        <p className="font-black text-[34px] text-white">{title}</p>
        <p className="font-medium text-[16px] text-white">{description}</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full flex flex-col mt-8 px-4 items-center "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="  w-full rounded-lg font-bold ">
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
                      {...field}
                      className="bg-white placeholder:text-[#1e1e1e]"
                    />
                  </FormControl>
                  <FormMessage className="text-[12px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className=" w-full rounded-lg font-bold  ">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="bg-white placeholder:text-[#1e1e1e]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {title === "Login" && (
              <Link
                href={"/sign-in"}
                className="text-white font-medium text-[12px] self-end -mt-1 hover:underline transition "
              >
                Forgot password?
              </Link>
            )}

            <Button
              className="w-full bg-[#15DDFF] hover:bg-[#6ccede] font-black py-5 text-md text-black "
              type="submit"
            >
              {title}
            </Button>
          </form>
        </Form>
        <div className="flex w-full gap-2 items-center justify-center mt-8">
          <Separator className="w-[10%]" />
          <span className="text-white font-semibold text-sm">
            Or {title} with
          </span>

          <Separator className="w-[10%]" />
        </div>
        <div className="flex w-full gap-4 mt-4 px-4 text-[#1e1e1e]">
          <Button
            onClick={() => signInWithGoogle()}
            disabled={loading}
            className="w-full h-10  bg-white hover:bg-slate-200 rounded-lg flex items-center justify-center gap-4 text-md font-bold"
          >
            <Image
              src={"/assets/icons/google.svg"}
              width={24}
              height={24}
              alt="google"
            />
            Google
          </Button>
          <div className="w-full h-10 bg-white hover:bg-slate-200 rounded-lg flex items-center justify-center gap-4 text-md font-bold">
            <Image
              src={"/assets/icons/github.svg"}
              width={24}
              height={24}
              alt="github"
            />
            GitHub
          </div>
        </div>
        <p className="text-sm font-semibold text-[#f5f5f5] mt-8 mb-1">
          {title === "login"
            ? "Don't have an account? "
            : "Already have an account? "}

          <Link
            href={navLink}
            className="text-white font-bold hover:underline transition "
          >
            {title === "Login" ? "Create one" : "Login"}
          </Link>
        </p>
      </div>
    </>
  );
};

export default AuthForm;
