"use client";
import Image from "next/image";
import DrawCanvas from "@/components/drawlines";
import { useState } from "react";

export default function Home() {
  const [filepath, setFilepath] = useState("/monet_waterlilies.png");
  const triggerImageFunction = (newfilepath: string) => {
    setFilepath(newfilepath);
    console.log(filepath);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-5">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by clicking the images below
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://decidev22.github.io/andybaeck.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/transparent_prologue_1.png"
              alt="Prologue Logo"
              width={24}
              height={24}
              priority
            />
            rologue - Andy Baeck
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          src={filepath}
          alt="Image of choice"
          width={500}
          height={500}
        />
        <div className="relative w-[500px] h-[500px]">
          <DrawCanvas
            canvasId="draw"
            duration={1200}
            randomMax={500}
            filepath={filepath}
            quarter="q1"
          />
          <DrawCanvas
            canvasId="draw"
            duration={1200}
            randomMax={500}
            filepath={filepath}
            quarter="q2"
          />
          <DrawCanvas
            canvasId="draw"
            duration={1200}
            randomMax={500}
            filepath={filepath}
            quarter="q3"
          />
          <DrawCanvas
            canvasId="draw"
            duration={1200}
            randomMax={500}
            filepath={filepath}
            quarter="q4"
          />
        </div>
      </div>

      <div className="mb-20 mt-5">
        <div className="grid grid-cols-4 gap-4 justify-items-center px-20">
          <div>
            <img
              src="/monet_500.png"
              alt="Monet"
              width={150}
              onClick={() => triggerImageFunction("/monet_500.png")}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div>
            <img
              src="/purplelogo.png"
              alt="Prologue"
              width={150}
              onClick={() => triggerImageFunction("/purplelogo.png")}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div>
            <img
              src="/starrynight_500.png"
              alt="Van Gogh"
              width={150}
              onClick={() =>
                triggerImageFunction("/starrynight_500.png")
              }
              style={{ cursor: "pointer" }}
            />
          </div>
          <div>
            <img
              src="/vangogh_2_500.png"
              alt="Van Gogh 2"
              width={150}
              onClick={() =>
                triggerImageFunction("/vangogh_2_500.png")
              }
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
