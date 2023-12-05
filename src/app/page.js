"use client";
import Image from "next/image";
import AuthButton from "./components/Login";
import SideNavBar from "./components/SideNavBar";
import { app } from "../../firebase/FirebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useLayoutEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();

  useLayoutEffect(() => {
    if (session) {
      console.log(session.user.email);
    } else {
      redirect("/api/auth/signin");
    }
  }, [session]);

  return (
    <div className="md:col-span-2 rounded-l-[1.75rem] p-5">
      <div className="hero md:min-h-screen">
        <div className="hero-content text-center bg-[#041B24] rounded-2xl md:p-10 shadow shadow-lg shadow-cyan-500/10 ">
          <div className="max-w-md">
            <p className="py-3 text-lg mb-4">{`Welcome, ${session?.user.name}`}</p>
            <h1 className="text-xl md:text-4xl font-bold">
              Unleash Your Potential with Our Resource Kit
            </h1>
            <p className="text-sm py-6 tracking-wide">
              Our user-friendly resource kit empowers you to organize and manage
              your resources effectively, enhance your productivity, and reduce
              stress and anxiety. With its comprehensive features, including
              link and file storage, time management tools, and a personalized
              workspace, you can streamline your workflow and achieve greater
              focus. Join thousands of users who have discovered the power of
              our resource kit and experience a surge in organization and
              success.
            </p>
            <h1 className="text-lg md:text-2xl font-bold">
              Make a Resource now!
            </h1>
          </div>
        </div>
      </div>

      {/* <SideNavBar resourceKits={resourceKits} /> */}
    </div>
  );
}
