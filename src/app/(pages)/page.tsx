import { env } from "@/lib/env/client.mjs";

export default function Home() {
    return (
        <>
            <section className="mx-auto w-full max-w-screen-lg p-4">
                <div className="my-8 space-y-8">
                    <h1 className="text-center text-3xl font-bold lg:text-5xl">
                        Github Readme Contributions
                    </h1>
                    <p className="text-center text-lg">
                        Dynamically generate your github contribution charts for github readmes
                    </p>
                </div>
            </section>
            <section className="mx-auto mt-8 w-full max-w-screen-lg p-4">
                <div className="flex flex-col gap-2">
                    <h2 className="pb-4 text-2xl font-bold">Getting Started</h2>
                    <p className="pb-4 text-lg">
                        Generated images are found at{" "}
                        <code className="text-nowrap rounded-md bg-accent p-2">
                            {env.NEXT_PUBLIC_SITE_URL}/api/iso?username=USERNAME
                        </code>
                    </p>
                    <p className="text-lg">Add the following to your Readme file </p>
                    <code className="rounded-md bg-accent p-2">
                        [![GitHub contributions]({env.NEXT_PUBLIC_SITE_URL}
                        /api/iso?username=USERNAME)]({env.NEXT_PUBLIC_SITE_URL})
                    </code>
                </div>
            </section>
        </>
    );
}
