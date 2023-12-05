"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
// session.user.image

const HeaderNav = () => {
  const { data: session, status } = useSession();

  return (
    <div className="navbar flex justify-between min-w-screen w-full lg:px-32 items-center p-[1rem] lg:p-[2rem] min-h-[60px] text-center bg-[#1D232A]">
      <h2 className="text-[1rem] md:text-2xl tracking-widest text-white">
        <a href="/">The Resource Kit</a>
      </h2>

      <div className="flex-none gap-2  ">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search Resource (coming soon) "
            className="input input-bordered w-24 md:w-auto"
            onKeyDown={(e) => e.key == "Enter" && console.log(e.target.value)}
          />
        </div>
        <div className="dropdown dropdown-end z-20">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={`${session?.user?.image}`}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li className="hover:text-red-100">
              <button onClick={() => signOut()}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
