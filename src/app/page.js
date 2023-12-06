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
      redirect("/Login");
    }
  }, [session]);

  return (
    <div className="md:grid md:grid-cols-3 w-full h-full md:gap-0">
      <div className="md:col-span-2 rounded-l-[1.75rem] p-5 md:order-last">
        <div className="hero md:min-h-screen">
          <div className="hero-content text-center rounded-2xl md:p-10 ">
            <div className="max-w-md">
              <p className="py-3 text-lg mb-4">{`Welcome, ${session?.user.name}`}</p>

              <h1 className="text-lg md:text-2xl font-bold mt-2">
                Make a Resource now!
              </h1>
            </div>
          </div>
        </div>

        {/* <SideNavBar resourceKits={resourceKits} /> */}
      </div>
      <SideNavBar />
    </div>
  );
}
