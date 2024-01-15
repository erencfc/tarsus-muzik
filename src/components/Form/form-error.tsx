import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type FormErrorProps = {
    message?: string;
};

export const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null;

    return (
        <div className="flex items-center gap-x-2 rounded-md bg-red-400/20 p-3 text-sm text-red-400">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <p>{message}</p>
        </div>
    );
};
