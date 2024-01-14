import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconFilled } from "@heroicons/react/24/solid";

export default function Rating({ rating }: { rating: number }) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (rating - i > 0) {
            stars.push(
                <StarIconFilled
                    key={i}
                    width={18}
                    height={18}
                    className="mb-0.5 text-yellow-500"
                />
            );
        } else {
            stars.push(
                <StarIcon
                    key={i}
                    width={18}
                    height={18}
                    className="mb-0.5 text-yellow-500"
                />
            );
        }
    }
    return <div className="flex">{stars}</div>;
}
