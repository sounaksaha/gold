import { useEffect, useState } from "react";
import goldImage from "/gold.png";
import { API_URl } from "../../config";


export default function GoldRate() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URl}/allGoldPrice.php?page=${currentPage}&pageSize=${pageSize}&date=${searchTerm}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Gold data");
        }

        const data = await response.json();
        setRates(data.data);
        setTotalCount(data.pagination.totalCount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Gold data:", error);
        setError("Failed to fetch Gold data");
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, pageSize,searchTerm]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };
  return (
    <div
            className="flex items-center justify-center min-h-screen"
            
          >
      <div className="container px-6 py-8 mx-auto">
        <h3 className="text-3xl font-medium text-gray-900">Past Gold Rate</h3>

        <div className="mt-8"></div>
        <div className="mt-4 flex items-center">
          <div className="relative">
            <input
              type="date"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by Date"
              className="px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-500 w-72
         bg-white text-gray-800 placeholder-gray-500
         hover:bg-gray-100 focus:bg-white"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 15l5-5m0 0l-5-5m5 5h-13"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Gold Rate
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan="8">Loading...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="8">{error}</td>
                    </tr>
                  ) : (
                    rates.map((rate, index) => (
                      <tr key={index}>
                        <td className="px-6 py-3 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-10 h-10 rounded-full"
                                src={goldImage}
                                alt="Gold"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {rate.date}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm leading-5 text-gray-900">
                            {rate.gold_price}  <b>Rs</b>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="mr-2 px-3 py-1 text-sm rounded-md border border-blue-600 bg-blue-400 text-white hover:bg-blue-600 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-600"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 text-sm rounded-md border ${
                currentPage === index + 1
                  ? "bg-blue-300 text-white"
                  : "border-blue-300 text-blue-700 hover:bg-blue-100"
              } focus:outline-none focus:border-blue-300 focus:shadow-outline-blue`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="ml-2 px-3 py-1 text-sm rounded-md border border-blue-300 bg-blue-400 text-white hover:bg-blue-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
