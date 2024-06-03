'use client'

import { useRouter } from "next/navigation";

import SignIn from "@/components/pages/auth/sign-in/SignIn";

const SignInPage = () => {
  const router = useRouter();

  if (localStorage.getItem('token')) {
    router.push('/home')
  }

  return <SignIn />;
};

export default SignInPage;
