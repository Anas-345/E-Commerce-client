export default function Pagination({ pagination, handlePrevChange, handleNextChange }) {

  return <div className="flex gap-4 items-center justify-center py-4">
    <button className="bg-[#f97316] hover:bg-[#ea580c] transition-all duration-300 ease-in-out px-4 py-2 rounded-lg text-white flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-900" disabled={!pagination.hasPrevPage} onClick={handlePrevChange}>Previous</button>
    <button className="bg-[#f97316] hover:bg-[#ea580c] transition-all duration-300 ease-in-out px-4 py-2 rounded-lg text-white flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-900" disabled={!pagination.hasNextPage} onClick={handleNextChange}>Next</button>
  </div>
}
