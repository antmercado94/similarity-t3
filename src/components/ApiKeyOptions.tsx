import { type FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Inter } from "next/font/google";
import { api } from "~/utils/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/DropDownMenu";
import Button from "./ui/Button";
import { toast } from "./ui/Toast";

const inter = Inter({ subsets: ["latin"] });

interface ApiKeyOptionsProps {
  apiKeyKey: string;
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ apiKeyKey }) => {
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [isRevoking, setIsRevoking] = useState<boolean>(false);

  const router = useRouter();

  const { mutate: revokeKey } = api.genKeys.revoke.useMutation({
    onSuccess: () => {
      // revoking only
      if (isRevoking) {
        setIsRevoking(false);
        return router.refresh();
      }
      // create (after revoke)
      createKey();
    },
    onError: () => {
      toast({
        title: "Error revoking API key",
        message: " Please try again later",
        type: "error",
      });
      setIsRevoking(false);
    },
  });

  const { mutate: createKey } = api.genKeys.create.useMutation({
    onSuccess: () => {
      if (isCreatingNew) {
        setIsCreatingNew(false);
        return router.refresh();
      }
    },
    onError: () => {
      toast({
        title: "Error creating API key",
        message: " Please try again later",
        type: "error",
      });
      setIsCreatingNew(false);
    },
  });

  const createNewApiKey = () => {
    setIsCreatingNew(true);
    revokeKey();
  };

  const revokeCurrentApiKey = () => {
    setIsRevoking(true);
    revokeKey();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isCreatingNew || isRevoking} asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <p>
            {isCreatingNew
              ? "Creating new key"
              : isRevoking
              ? "Revoking key"
              : "Options"}
          </p>
          {isCreatingNew || isRevoking ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : null}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={inter.className}>
        <DropdownMenuItem
          onClick={() => {
            void navigator.clipboard.writeText(apiKeyKey);

            toast({
              title: "Copied",
              message: "API key copied to clipboard",
              type: "success",
            });
          }}
        >
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={createNewApiKey}>
          Create new key
        </DropdownMenuItem>
        <DropdownMenuItem onClick={revokeCurrentApiKey}>
          Revoke key
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApiKeyOptions;
