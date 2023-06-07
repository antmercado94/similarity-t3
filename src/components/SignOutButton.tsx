import { type FC, useState } from "react";
import { SignOutButton as ClerkSignOutButton } from "@clerk/nextjs";
import Button from "./ui/Button";

const SignOutButton: FC = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ClerkSignOutButton>
      <Button onClick={() => setIsLoading(true)} isLoading={isLoading}>
        Sign out
      </Button>
    </ClerkSignOutButton>
  );
};

export default SignOutButton;
