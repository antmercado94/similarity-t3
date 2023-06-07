import { type FC, type FormEvent, useState } from "react";
import { Key } from "lucide-react";
import { api } from "~/utils/api";
import { Input } from "./ui/Input";
import { toast } from "./ui/Toast";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";
import Button from "./ui/Button";
import CopyButton from "./CopyButton";

const RequestApiKey: FC = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const { mutate } = api.genKeys.create.useMutation({
    onSuccess: (data) => {
      setApiKey(data.key);
    },
    onError: (err) => {
      if (err instanceof Error) {
        toast({
          title: "Error",
          message: err.message,
          type: "error",
        });

        return;
      }
      // generic error
      toast({
        title: "Error",
        message: "Something went wrong",
        type: "error",
      });
    },
    onSettled: () => {
      setIsCreating(false);
    },
  });

  const createNewApiKey = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsCreating(true);
    mutate();
  };

  return (
    <div className="container md:max-w-2xl">
      <div className="flex flex-col items-center gap-6">
        <Key className="mx-auto h-12 w-12 text-gray-400" />
        <LargeHeading>Request your API key</LargeHeading>
        <Paragraph>You haven&apos;t requested an API key yet.</Paragraph>
      </div>

      <form
        onSubmit={createNewApiKey}
        className="mt-6 sm:flex sm:items-center"
        action="#"
      >
        <div className="relative rounded-md shadow-sm sm:min-w-0 sm:flex-1">
          {apiKey ? (
            <CopyButton
              type="button"
              valueToCopy={apiKey}
              className="absolute inset-y-0 right-0 animate-in fade-in duration-300"
            />
          ) : null}
          <Input
            readOnly
            value={apiKey ?? ""}
            placeholder="Request an API key to display it here!"
          />
        </div>
        <div className="mt-3 flex justify-center sm:ml-4 sm:mt-0 sm:flex-shrink-0">
          <Button disabled={!!apiKey} isLoading={isCreating}>
            Request key
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestApiKey;
