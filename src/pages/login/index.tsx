import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Icons from "~/components/Icons";
import { PageLayout } from "~/components/layout";
import SignInButton from "~/components/SignInButton";
import Paragraph from "~/components/ui/Paragraph";
import LargeHeading from "~/components/ui/LargeHeading";
import { buttonVariants } from "~/components/ui/Button";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Similarity API | Login</title>
        <meta
          name="description"
          content="Free & open-source text similarity API"
        />
      </Head>
      <PageLayout>
        <section className="pt-20">
          <div className="container absolute inset-0 mx-auto flex h-screen flex-col items-center justify-center">
            <div className="mx-auto flex w-full max-w-lg flex-col justify-center space-y-6">
              <div className="flex flex-col items-center gap-6 text-center">
                <Link
                  className={buttonVariants({
                    variant: "ghost",
                    className: "w-fit",
                  })}
                  href="/"
                >
                  <Icons.ChevronLeft className="mr-2 h-4 w-4" />
                  Back to home
                </Link>

                <LargeHeading>Welcome back!</LargeHeading>
                <Paragraph>
                  Please sign in using your google or github account.
                </Paragraph>

                <SignInButton />
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default Login;
