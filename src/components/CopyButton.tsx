import { type ButtonHTMLAttributes } from "react";
import { Copy } from "lucide-react";
import { toast } from "./ui/Toast";
import Button from "./ui/Button";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

export default function CopyButton({
  valueToCopy,
  className,
  ...props
}: CopyButtonProps) {
  return (
    <Button
      {...props}
      onClick={() => {
        // copy to clipboard
        void navigator.clipboard.writeText(valueToCopy);

        toast({
          title: "Copied!",
          message: "API key copied to clipboard",
          type: "success",
        });
      }}
      variant="ghost"
      className={className}
    >
      <Copy className="h-5 w-5" />
    </Button>
  );
}
