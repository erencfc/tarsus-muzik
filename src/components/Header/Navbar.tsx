import NavLinks from "./NavLinks";

export default function Navbar() {
    return (
        <div className="sticky top-0 z-[1111] hidden h-12 items-center justify-center bg-zinc-950 font-semibold text-white xl:flex">
            <ul className="flex items-center justify-between gap-8">
                <NavLinks />
            </ul>
        </div>
    );
}
