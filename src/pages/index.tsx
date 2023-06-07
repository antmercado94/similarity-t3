import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { PageLayout } from "~/components/layout";
import Paragraph from "~/components/ui/Paragraph";
import LargeHeading from "~/components/ui/LargeHeading";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Similarity API | Home</title>
        <meta
          name="description"
          content="Free & open-source text similarity API"
        />
      </Head>
      <PageLayout>
        <div className="relative flex h-screen items-center justify-center overflow-x-hidden">
          <div className="container mx-auto h-full w-full max-w-7xl pt-32">
            <div className="flex h-full flex-col items-center justify-start gap-6 lg:items-start lg:justify-center">
              <LargeHeading
                size="lg"
                className="three-d text-black dark:text-light-gold"
              >
                Easily determine <br /> text similarity.
              </LargeHeading>

              <Paragraph className="max-w-xl lg:text-left">
                With the text similarity API, you can easily determine the
                similarity between two pieces of text with a free{" "}
                <Link
                  href="/login"
                  className="text-black underline underline-offset-2 dark:text-light-gold"
                >
                  API key
                </Link>
                .
              </Paragraph>

              <div className="relative aspect-square w-full max-w-xl lg:absolute lg:left-1/2 lg:max-w-3xl">
                <Image
                  priority
                  className="img-shadow"
                  quality={100}
                  style={{ objectFit: "contain" }}
                  fill
                  src="/typewriter.png"
                  alt="typewriter"
                />
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Home;
