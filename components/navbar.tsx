"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import Wrapper from "./wrapper";
import { ChevronRight, GanttChart } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";

const items = [
  {
    name: "Home",
    url: "/bookings",
  },
  {
    name: "About",
    url: "/about",
  },
];

const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  return (
    <div className="w-full fixed top-0 left-0 right-0 z-50 p-4">
      <Wrapper>
        <div className="flex justify-between items-center gap-4 rounded-xl p-4 border bg-background border-input">
          <aside className="flex gap-2 items-center">
            <Image
              src={"/logo.svg"}
              draggable={false}
              alt="logo"
              width={30}
              height={30}
            />
            <Link href={"/"} className="font-bold text-xl">
              Taxiku
            </Link>
          </aside>
          <nav className="gap-4 hidden lg:flex flex-grow justify-center items-center">
            {items.map((nav) => (
              <Link
                href={nav.url}
                key={nav.name}
                className={clsx("hover:text-blue-600 transition-all", {
                  "text-blue-600 font-semibold": pathname === nav.url,
                })}
              >
                {nav.name}
              </Link>
            ))}
          </nav>
          <aside>
            <div className="hidden lg:flex lg:gap-2 lg:items-center">
              <Link
                href={"/bookings"}
                className="border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-4 py-2 flex justify-center items-center"
              >
                Book Now
                <ChevronRight />
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    userButtonPopoverActionButton__manageAccount: {
                      display: "none",
                    },
                  },
                }}
              />
            </div>
            <div className="block lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <GanttChart />
                  </Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col justify-between">
                  <SheetHeader>
                    <div className="grid grid-cols-2 justify-center items-center gap-4 mt-10">
                      {user ? (
                        <>
                          <div className="flex gap-2 items-center">
                            <UserButton
                              appearance={{
                                elements: {
                                  userButtonPopoverActionButton__manageAccount:
                                    {
                                      display: "none",
                                    },
                                },
                              }}
                            />
                          </div>

                          <SheetTitle>| {user?.firstName}</SheetTitle>
                        </>
                      ) : (
                        <Link
                          href={"/users"}
                          className="border border-input text-primary bg-background hover:bg-accent rounded-md px-4 py-2 flex justify-center items-center"
                        >
                          Login
                          <ChevronRight />
                        </Link>
                      )}
                    </div>
                  </SheetHeader>
                  <nav
                    className={`gap-4 flex flex-col flex-grow ${
                      user ? "pt-10" : "pt-3"
                    }`}
                  >
                    {items.map((nav) => (
                      <Link
                        href={nav.url}
                        key={nav.name}
                        className={clsx(
                          "hover:text-blue-600 hover:bg-blue-600/10 transition-all border border-input p-4 rounded-md",
                          {
                            "text-blue-600 bg-blue-600/10":
                              pathname === nav.url,
                          }
                        )}
                      >
                        {nav.name}
                      </Link>
                    ))}
                  </nav>
                  <SheetFooter>
                    <SheetDescription>
                      &copy; 2024 Taxiku | All rights reserved
                    </SheetDescription>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </aside>
        </div>
      </Wrapper>
    </div>
  );
};

export default Navbar;
