import { Footer } from "@/components/footer";

interface Props {
    children?: React.ReactNode;
}
export default function PagesLayout({ children }: Props) {
    return (
        <>
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
        </>
    );
}
