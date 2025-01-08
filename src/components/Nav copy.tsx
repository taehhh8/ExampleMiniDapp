"use client";

import React from "react";
// import NavBtn from "./buttons/NavBtn";
import Link from "next/link";
import Dropdown from "./buttons/Dropdown";

export interface MenuItem {
  title: string;
  route?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: "Square",
    children: [
      {
        title: "Survey",
        route: "/square/surveys",
      },
      {
        title: "Poll",
        route: "/square/polls",
      },
    ],
  },
  {
    title: "Survey",
    children: [
      {
        title: "Create",
        route: "/survey/create",
      },
      {
        title: "Manage",
        route: "/survey/manage",
      },
    ],
  },
  {
    title: "Poll",
    children: [
      {
        title: "Create",
        route: "/poll/create",
      },
      {
        title: "Manage",
        route: "/poll/manage",
      },
    ],
  },
];

export default function Nav() {
  return (
    <>
      <div className="flex justify-start w-1/3 text-4xl font-bold text-violet-300">
        <Link href="/" target="_blank">
          <h1>DESTAT</h1>
        </Link>
      </div>
      <div className="flex justify-center w-1/3 gap-8 text-white">
        {menuItems.map((item) => {
          return item.hasOwnProperty("children") ? (
            <Dropdown key={item.title} item={item} />
          ) : (
            <Link
              key={item.title}
              className="hover:text-blue-500"
              href={item?.route || ""}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
      <div className="flex justify-end w-1/3">
        <button>
          <span className="bg-lime-400 rounded-xl text-2xl font-bold px-4 py-2">
            Connect
          </span>
        </button>
      </div>
    </>
  );
}
