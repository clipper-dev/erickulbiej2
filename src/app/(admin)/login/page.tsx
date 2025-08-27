/* eslint-disable @next/next/no-img-element */
import { Container, Loader } from "@/components/coolbiej";
import Content from "./(Content)";
import { Suspense } from "react";

export default function Login() {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[80vh] items-center ">
        <Suspense fallback={<Loader />}>
          <Content />
        </Suspense>
        <img src="/res/ships/ship_sm.jpg" alt="login-bg"  className="hidden md:block rounded-lg m-auto" />
      </div>
    </Container>
  );
}
