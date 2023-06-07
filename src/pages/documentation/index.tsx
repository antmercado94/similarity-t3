import { type NextPage } from "next";
import Head from "next/head";
import DocumentationTabs from "~/components/DocumentationTabs";
import { PageLayout } from "~/components/layout";
import LargeHeading from "~/components/ui/LargeHeading";
import Paragraph from "~/components/ui/Paragraph";
import "simplebar-react/dist/simplebar.min.css";

const Documentation: NextPage = () => {
  return (
    <>
      <Head>
        <title>Similarity API | Documentation</title>
        <meta
          name="description"
          content="Free & open-source text similarity API"
        />
      </Head>
      <PageLayout>
        <section className="pt-20">
          <div className="container mx-auto mt-12 max-w-7xl">
            <div className="flex flex-col items-center gap-6">
              <LargeHeading>Making a request</LargeHeading>
              <Paragraph>api/v1/similarity</Paragraph>
              <DocumentationTabs />
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default Documentation;
