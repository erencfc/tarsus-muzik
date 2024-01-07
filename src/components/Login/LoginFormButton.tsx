import { useFormStatus } from "react-dom";

export default function FormButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <span className="loading loading-spinner mb-5 text-accent"></span>
            ) : (
                <button
                    className="max-w-96 hover:bg-accent-focus btn btn-accent mb-5 h-10 w-36 rounded-lg text-white transition duration-200 ease-in-out "
                    disabled={pending}
                    style={
                        pending
                            ? {
                                  backgroundColor: "#044266",
                                  border: "2px solid #044266",
                                  cursor: "not-allowed",
                              }
                            : {}
                    }
                >
                    Giriş Yap
                </button>
            )}
        </>
    );
}
