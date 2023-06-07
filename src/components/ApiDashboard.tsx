import { type FC } from "react";
import { type ApiKey } from "@prisma/client";
import { formatDistance } from "date-fns";
import { Loader2 } from "lucide-react";
import { api } from "~/utils/api";
import ApiKeyOptions from "./ApiKeyOptions";
import Table from "./Table";
import LargeHeading from "./ui/LargeHeading";
import Paragraph from "./ui/Paragraph";
import { Input } from "./ui/Input";
import Error from "./Error";

const TableView = ({ apiKeys }: { apiKeys: ApiKey[] }) => {
  // get api requests made with api keys
  const { data: userRequests, isLoading } = api.apiRequest.getAll.useQuery({
    apiKeys,
  });

  if (isLoading)
    return (
      <div className="relative top-[15vh] flex items-center justify-center">
        <Loader2 className="mr-2 h-8 w-8 animate-spin text-white" />
      </div>
    );

  if (!userRequests) return <Error />;

  // serialize unix date
  const serializableRequests = userRequests.map((req) => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date()),
  }));

  return <Table userRequests={serializableRequests} />;
};

interface ApiDashboardProps {
  user: {
    id: string;
    firstName: string | null;
  };
}

const ApiDashboard: FC<ApiDashboardProps> = ({ user }) => {
  const { data: apiKeys, isLoading } = api.genKeys.getAll.useQuery({
    userId: user.id,
  });

  if (isLoading)
    return (
      <div className="relative top-[15vh] flex items-center justify-center">
        <Loader2 className="mr-2 h-8 w-8 animate-spin text-white" />
      </div>
    );

  if (!apiKeys) return <Error />;

  const activeApiKey = apiKeys.find((apiKey) => apiKey.enabled);

  if (!activeApiKey) return <Error />;

  return (
    <div className="container flex flex-col gap-6">
      <LargeHeading>Welcome back, {user.firstName ?? "User"}</LargeHeading>
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-start">
        <Paragraph>Your API key:</Paragraph>
        <Input className="w-fit truncate" readOnly value={activeApiKey.key} />
        <ApiKeyOptions apiKeyKey={activeApiKey.key} />
      </div>

      <Paragraph className="-mb-4 mt-4 text-center md:text-left">
        Your API history:
      </Paragraph>

      <TableView apiKeys={apiKeys} />
    </div>
  );
};

export default ApiDashboard;
