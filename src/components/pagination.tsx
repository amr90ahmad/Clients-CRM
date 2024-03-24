"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function Paginate({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const { replace } = useRouter();

    const createPageURL = (pageNumber: number | string) => {
        if (pageNumber === 0) {
            pageNumber = 1;
        }
        if (Number(pageNumber) > totalPages) {
            pageNumber = totalPages;
        }
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        replace(`${pathname}?${params.toString()}`);
    };

    const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <Pagination className='mt-8'>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => createPageURL(currentPage - 1)}
                    />
                </PaginationItem>
                {pagesArray?.map((num) => (
                    <PaginationItem key={num}>
                        <PaginationLink
                            onClick={() => createPageURL(num)}
                            isActive={currentPage === num}
                        >
                            {num}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => createPageURL(currentPage + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
