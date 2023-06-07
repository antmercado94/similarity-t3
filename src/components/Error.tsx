import { type FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LargeHeading from "./ui/LargeHeading";
import Button, { buttonVariants } from "./ui/Button";

const Error: FC = () => {
  const router = useRouter();

  return (
    <div className="relative top-[15vh] flex flex-col items-center justify-center gap-8">
      <LargeHeading>Something went wrong...</LargeHeading>
      <div className="flex gap-4">
        <Button onClick={() => router.refresh()}>Reload</Button>
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default Error;
