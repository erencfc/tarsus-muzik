"use client";

import {
    ChatBubbleOvalLeftEllipsisIcon,
    DocumentIcon,
    StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconFilled } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { toast } from "react-toastify";
import { createComment } from "./action";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

type CreateCommentModalProps = {
    productId: string;
    userId: string;
};

export default function CreateCommentModal({
    productId,
    userId,
}: CreateCommentModalProps) {
    const [rating, setRating] = useState<number | null>(null);

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState<string>("");
    const { pending } = useFormStatus();

    const router = useRouter();

    const ratingElements = (): JSX.Element => {
        const starsList = [];
        for (let i = 0; i < 5; i++) {
            starsList.push(
                <div
                    className={`flex cursor-pointer ${
                        pending && "pointer-events-none opacity-40"
                    }`}
                    key={i}
                    onClick={(e) => {
                        for (let j = 0; j < 5; j++) {
                            setRating(i + 1);

                            const starsDiv = e.currentTarget.parentElement;
                            if (!starsDiv) return;

                            if (j > i) {
                                starsDiv.children[
                                    j
                                ].children[0].classList.remove("hidden");
                                starsDiv.children[j].children[1].classList.add(
                                    "hidden"
                                );
                                continue;
                            }

                            starsDiv.children[j].children[0].classList.add(
                                "hidden"
                            );
                            starsDiv.children[j].children[1].classList.remove(
                                "hidden"
                            );
                        }
                    }}
                >
                    <div className="flex">
                        <StarIcon
                            width={24}
                            height={24}
                            className="text-gray-400"
                        />
                    </div>
                    <div className="hidden">
                        <StarIconFilled
                            width={24}
                            height={24}
                            className="text-yellow-500"
                        />
                    </div>
                </div>
            );
            continue;
        }
        return <div className="flex">{starsList}</div>;
    };

    return (
        <dialog
            id="create_comment_modal"
            className="modal modal-bottom  sm:modal-middle"
        >
            <div className="modal-box">
                <h3 className="font-semibold">Ürün Hakkındaki Yorumunuz</h3>

                <form
                    action={async (formData) => {
                        if (!rating) {
                            toast.error("Lütfen puan veriniz.");
                            setSuccess(false);
                            setMessage("Lütfen puan veriniz.");
                            return;
                        }

                        if (
                            !formData.get("title")?.toString() &&
                            !formData.get("content")?.toString()
                        ) {
                            toast.error("Lütfen yorumunuzu giriniz.");
                            setSuccess(false);
                            setMessage("Lütfen yorumunuzu giriniz.");
                            return;
                        }

                        const comment = await createComment({
                            formData,
                            rating,
                            productId,
                            userId,
                        });

                        setSuccess(comment.success);
                        setMessage(comment.message);

                        toast[comment.success ? "success" : "error"](
                            comment.message
                        );

                        if (comment.success) {
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000);
                        }
                    }}
                    className="mt-4 flex flex-col gap-4 [&_*:focus]:outline-none [&_*:focus]:ring-2 [&_*:focus]:ring-blue-600"
                >
                    <div className="my-3 flex flex-col gap-2">
                        <label className="text-sm">Ürünü Değerlendir</label>
                        {ratingElements()}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm">Başlık</label>
                        <input
                            type="text"
                            name="title"
                            className="input input-bordered w-full placeholder:text-sm"
                            placeholder="Başlığı Giriniz"
                            disabled={pending}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm">Yorumunuz</label>
                        <textarea
                            className="textarea textarea-bordered"
                            placeholder="Yorumunuzu Giriniz"
                            name="content"
                            disabled={pending}
                        ></textarea>
                    </div>

                    <div className="flex w-full justify-end">
                        {!pending && (success || !success) && (
                            <div className="mx-auto flex items-center font-semibold">
                                <span
                                    className={`${
                                        success
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {message}
                                </span>
                            </div>
                        )}
                        <button
                            className="btn btn-primary btn-sm gap-1 text-white"
                            disabled={pending}
                        >
                            <ChatBubbleOvalLeftEllipsisIcon
                                width={20}
                                height={20}
                            />
                            <span>Yorum Yap</span>
                        </button>
                    </div>
                </form>
                {/* <form method="dialog" className="modal-backdrop">
                    <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                        <XMarkIcon width={16} height={16} />
                    </button>
                </form> */}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
