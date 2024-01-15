"use client";

import { Prisma } from "@prisma/client";
import { useState, useTransition } from "react";
import { cache } from "react";
import { getComments } from "./actions";
import { formatDate } from "@/lib/format";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type GetContentProps = {
    product: Prisma.ProductGetPayload<null>;
    title: string;
    router: AppRouterInstance;
    user: any;
};

const getContent = cache(
    async ({ product, title, router, user }: GetContentProps) => {
        let content = null;
        if (title === "comments") {
            const comments = await getComments(product.id);

            if (comments.length === 0) {
                return (content = (
                    <div className="mx-auto flex h-full items-center justify-center">
                        <button
                            className="transition-all duration-150 hover:text-primary hover:underline"
                            onClick={() => {
                                if (!user) {
                                    router.push("/login");
                                    return;
                                }

                                (
                                    document.getElementById(
                                        "create_comment_modal"
                                    ) as HTMLDialogElement
                                )?.showModal();
                            }}
                        >
                            Bu ürüne ilk yorumu siz yapın!
                        </button>
                    </div>
                ));
            }

            const rating = (stars: number): JSX.Element => {
                const starsList = [];
                for (let i = 0; i < 5; i++) {
                    if (i >= stars) {
                        // empty star
                        starsList.push(
                            <StarIcon
                                key={i}
                                width={24}
                                height={24}
                                className="text-gray-400"
                            />
                        );
                        continue;
                    }

                    starsList.push(
                        <StarIconSolid
                            key={i}
                            width={24}
                            height={24}
                            className="text-yellow-500"
                        />
                    );
                }
                return <div className="flex">{starsList}</div>;
            };

            const commentsList = comments.map((comment) => (
                <div key={comment.id} className="mb-4 flex flex-col gap-2">
                    <div className="mb-2 flex items-center">
                        <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-white">
                            {comment.User.firstName[0]}
                        </div>
                        <div className="flex w-full flex-col gap-1">
                            <div className="flex text-sm font-semibold text-gray-600">
                                <p>
                                    {comment.User.firstName}{" "}
                                    {comment.User.lastName.slice(0, 1)}...
                                </p>
                                <div className="ml-auto">
                                    {rating(comment.rating)}
                                </div>
                            </div>
                            <div className="text-xs text-gray-500">
                                {formatDate(comment.createdAt)}
                            </div>
                        </div>
                    </div>
                    <div>
                        {comment.title && (
                            <h2 className="text-xl font-bold text-gray-700">
                                {comment.title}
                            </h2>
                        )}
                        {comment.title && comment.content && (
                            <hr className="my-3" />
                        )}
                        {comment.content && (
                            <span className="text-sm text-gray-600">
                                {comment.content}
                            </span>
                        )}
                    </div>
                </div>
            ));

            content = (
                <div className="flex flex-col [&>div:not(:first-child)]:mt-1 [&>div:not(:last-child)]:after:mt-10 [&>div:not(:last-child)]:after:h-[1px] [&>div:not(:last-child)]:after:w-full [&>div:not(:last-child)]:after:bg-gray-300/60">
                    {commentsList}
                </div>
            );
        } else if (title === "description") {
            content = (
                <div className="prose-sm prose max-w-none">
                    <h2>Ürün Bilgisi</h2>
                    <p>{product.description}</p>
                </div>
            );
        }
        return content;
    }
);

export default function Tabs({
    product,
    commentLength,
}: {
    product: Prisma.ProductGetPayload<{
        include: {
            Brand: true;
            SubCategory: true;
            Category: true;
        };
    }>;
    commentLength: number;
}) {
    const [tab, setTab] = useState<string>("description");
    const [content, setContent] = useState<JSX.Element | null>(
        <div className="prose-sm prose max-w-none">
            <p>{product.description}</p>
        </div>
    );
    const [isPending, startTransition] = useTransition();

    const tabs = [
        {
            name: "description",
            title: "Ürün Bilgisi",
        },
        {
            name: "comments",
            title: `Yorumlar (${commentLength})`,
        },
        {
            name: "installments",
            title: "Taksit Seçenekleri",
        },
    ];

    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user as any;

    return (
        <div>
            <div className="grid grid-cols-3 gap-5">
                {tabs.map((t) => (
                    <button
                        key={t.name}
                        id={t.name}
                        className={`rounded p-4 shadow-md ${
                            t.name === tab
                                ? "bg-indigo-500 text-white"
                                : "text-indigo-500"
                        }`}
                        onClick={(e) => {
                            e.preventDefault();
                            setTab(t.name);
                            startTransition(async () => {
                                const data = await getContent({
                                    product,
                                    title: t.name,
                                    router,
                                    user,
                                });

                                setContent(data);
                            });
                        }}
                    >
                        {t.title}
                    </button>
                ))}
            </div>
            <div className="mt-6 min-h-[200px] rounded border border-solid border-gray-100 p-8 font-light text-gray-500 shadow-md">
                {isPending ? (
                    <div className="flex items-center justify-center">
                        <span className="loading loading-spinner loading-md text-primary" />
                    </div>
                ) : (
                    content
                )}
            </div>
        </div>
    );
}
