import { Footer } from "@/components/footer";

interface Props {
    children?: React.ReactNode;
}

const PagesLayout = ({ children }: Props) => {
    return (
        <>
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
        </>
    );
};

export default PagesLayout;
