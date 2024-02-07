import { Button } from "@/components/ui/button";
import { deleteImage } from "./action";
import { toast } from "sonner";

export default function DeleteImageButton({
    images,
    setImages,
    index,
}: {
    images: string[];
    setImages: React.Dispatch<React.SetStateAction<string[]>>;
    index: number;
}) {
    return (
        <Button
            variant="outline"
            type="button"
            onClick={async () => {
                const { success, error } = await deleteImage(images[index]);

                if (success) {
                    toast.success(success);
                    setImages((prev) => prev.filter((_, i) => i !== index));
                }
                if (error) toast.error(error);
            }}
        >
            Sil
        </Button>
    );
}
