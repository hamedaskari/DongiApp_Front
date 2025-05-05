"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";

interface PaginationDemoProps {
  pages: number;
  setPage: (page: number) => void;
  page: number;
}
export function PaginationDemo({ pages, setPage, page }: PaginationDemoProps) {
  console.log(pages, page);

  return pages > 1 ? (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <button
            type="button"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
        </PaginationItem>

        {Array.from({ length: pages }).map((_, i) => (
          <PaginationItem key={i}>
            <button
              type="button"
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 flex justify-center items-center rounded ${
                page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          </PaginationItem>
        ))}

        {pages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <button
            type="button"
            disabled={pages === page}
            onClick={() => setPage(page + 1)}
            className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next →
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ) : null;
}
