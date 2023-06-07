import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import { clerkClient, getAuth, buildClerkProps } from "@clerk/nextjs/server";
import { prisma } from "~/server/db";
import ApiDashboard from "~/components/ApiDashboard";
import RequestApiKey from "~/components/RequestApiKey";
import { PageLayout } from "~/components/layout";
import type { ClerkSSRState } from "types/clerk";

interface DashboardProps {
  __clerk_ssr_state: ClerkSSRState;
  apiKey: string;
}

const Dashboard: NextPage<DashboardProps> = ({ __clerk_ssr_state, apiKey }) => {
  const { user } = __clerk_ssr_state;

  return (
    <>
      <Head>
        <title>Similarity API | Dashboard</title>
        <meta
          name="description"
          content="Free & open-source text similarity API"
        />
      </Head>
      <PageLayout>
        <section className="pt-20">
          <div className="mx-auto mt-16 max-w-7xl">
            {apiKey ? (
              <ApiDashboard user={{ id: user.id, firstName: user.firstName }} />
            ) : (
              <RequestApiKey />
            )}
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);

  if (!userId) {
    return {
      redirect: {
        destination: "/sign-in?redirect_url=" + ctx.resolvedUrl,
        permanent: false,
      },
    };
  }

  const user = userId ? await clerkClient.users.getUser(userId) : undefined;
  const apiKey = await prisma.apiKey.findFirst({
    where: {
      userId,
      enabled: true,
    },
  });

  return { props: { ...buildClerkProps(ctx.req, { user }), apiKey } };
};
