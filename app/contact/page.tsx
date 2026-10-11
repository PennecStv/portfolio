// app/contact/page.tsx
import LoadingScreen from "@/components/LoadingScreen";
import Image from "next/image";

export default function Contact() {
  return (
      <>
        <LoadingScreen />
        <div className="flex flex-col flex-1 items-center justify-center font-sans bg-background">
          <main>
            <h1>Contact</h1>
            <p>Get in touch with me!</p>
          </main>
        </div>
      </>
  );
}