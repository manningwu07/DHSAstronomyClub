import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";

export default function JoinSection() {
  return (
    <div className="container mx-auto px-4 text-center">
      <h2 className="mb-8 text-3xl font-bold">Ready to Join?</h2>
      <p className="mb-8 text-xl">
        Embark on your astronomy journey with AstroGaels today!
      </p>
      <div className="mx-auto max-w-md px-6">
        <Link href="https://forms.gle/4inuefrN1Nvyrw4z5" target="_blank">
          <Button className="w-full bg-gold text-darkPurple hover:bg-gold/90">
            Sign Up Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
