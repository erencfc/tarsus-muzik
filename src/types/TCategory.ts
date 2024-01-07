import type { Category, SubCategory } from "@prisma/client";

type TCategory = Category & {
    SubCategory: SubCategory[];
};

export type { TCategory };
