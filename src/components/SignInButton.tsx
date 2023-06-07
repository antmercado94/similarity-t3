import { type FC, useState } from "react";
import { SignInButton as ClerkSignInButton } from "@clerk/nextjs";
import Button from "./ui/Button";

const SignInButton: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ClerkSignInButton redirectUrl="/dashboard">
      <Button onClick={() => setIsLoading(true)} isLoading={isLoading}>
        Sign in
      </Button>
    </ClerkSignInButton>
  );
};

export default SignInButton;
