"use client";

// import ExampleAI from "@/components/ExampleAI";
import UploadFile from "@/components/UploadFile";

export default function Home() {

  return (
    <div className="w-full h-screen flex flex-col justify-beetween " >
      {/* <div className="py-5">
        <ExampleAI />
      </div> */}
      <div className="flex-1">
        <UploadFile />
      </div>

      <footer className="flex items-end w-full ">
        <div className="container mx-auto flex justify-center items-center py-4 ">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} All rights reserved by <a href="https://github.com/Mochrks" className="hover:underline text-white">@mochrks</a>
          </p>
        </div>
      </footer>
    </div>
  );
}


