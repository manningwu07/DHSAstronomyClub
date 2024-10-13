import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function JoinSection() {
  return (
    <div className="container mx-auto px-4 text-center">
      <h2 className="mb-8 text-3xl font-bold">Ready to Join?</h2>
      <p className="mb-8 text-xl">
        Embark on your astronomy journey with AstroGaels today!
      </p>
      <form className="mx-auto max-w-md">
        <Input type="email" placeholder="Enter your email" className="mb-4" />
        <Button className="w-full bg-gold text-darkPurple hover:bg-gold/90">
          Sign Up Now
        </Button>
      </form>
    </div>
  );
}
