import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="min-w-full bg-darkPurple py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center md:mb-0">
            <Image
              src="/logo.jpg"
              alt="AstroGaels Logo"
              width={40}
              height={40}
              className="mb-2 rounded-full"
            />
            <span className="px-2">
              &copy; 2024 AstroGaels. All rights reserved.
            </span>
          </div>
          <div className="flex space-x-4">
            Created by&nbsp;
            <span>
              <Link href="/admin">Manning Wu</Link>
            </span>
            &nbsp;(Class of 2025)
          </div>
        </div>
      </div>
    </footer>
  );
}
