import { CarouselItem } from "@/components/ui/carousel";
import Carousel from "./Carousel";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/db/category";

export default async function Categories() {
    const categories = await getCategories();

    return (
        <div className="container mx-auto flex max-w-6xl flex-col gap-6">
            <div className="flex w-full flex-col gap-3">
                <h4 className="text-center text-xl font-bold text-gray-700 sm:text-start">
                    Kategoriler
                </h4>
            </div>
            <Carousel>
                {categories
                    .sort((a, b) => {
                        // order değerine göre sırala (eğer 0 ise en alta at)
                        if (a.order === 0) return 1;
                        if (b.order === 0) return -1;
                        return a.order - b.order;
                    })
                    .map((category) => (
                        <CarouselItem
                            key={category.id}
                            className="basis-full border p-4 sm:basis-1/2 min-[850px]:basis-1/3"
                        >
                            <div
                                key={category.id}
                                className="flex select-none flex-col items-center justify-center"
                            >
                                <Link
                                    href={`/kategori/${category.slug}`}
                                    draggable={false}
                                >
                                    <div className="group flex flex-col items-center justify-center">
                                        <Image
                                            className={` h-[196px] w-[196px] rounded-full border border-solid border-gray-200 transition-all duration-300 ease-in-out group-hover:scale-105 ${
                                                category.color
                                                    ? `bg-gray-200/60 object-contain p-4`
                                                    : "object-cover"
                                            }`}
                                            src={`/images/category/${category.slug}.png`}
                                            width={196}
                                            height={196}
                                            alt={category.name}
                                            draggable={false}
                                        />
                                        <span className="mt-5 text-center font-medium text-gray-600">
                                            {category.name}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </CarouselItem>
                    ))}
            </Carousel>
        </div>
    );
}
