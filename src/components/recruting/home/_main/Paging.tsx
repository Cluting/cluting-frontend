import { useSearchParams } from "react-router-dom";

interface PagingProps {
  currentPage: number;
  totalPages: number;
}

export default function Paging({ currentPage, totalPages }: PagingProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (pageNum: number) => {
    searchParams.set("page", pageNum.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="flex justify-center gap-2 mt-20 mb-8">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => handlePageChange(pageNum)}
          className={`px-4 py-2 rounded-full ${
            pageNum === currentPage
              ? "bg-main-300 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
}
