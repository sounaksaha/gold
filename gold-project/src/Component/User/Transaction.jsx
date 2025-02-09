import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Transaction() {
  const { phoneNo } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState("");
  const [isGold, setIsGold] = useState(1); // State for gold/silver filter
  const [isBuy, setIsBuy] = useState(1); // State for buy/sell filter
  const [isFilterEnabled, setIsFilterEnabled] = useState(false); // State for enabling/disabling filters
  const [totalPages, setTotalPages] = useState(1); // Total pages based on API response

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const goldSilverValue = isGold ? '1' : '0';
        const buySellValue = isBuy ? '1' : '0';
        const filterParams = isFilterEnabled
          ? `&gold_silver=${goldSilverValue}&buy_sell=${buySellValue}`
          : '';
        const response = await fetch(
          `https://gold.riddleescape.in/transactions.php?phone_no=${phoneNo}&date=${selectedDate}&page=${currentPage}&pageSize=${itemsPerPage}${filterParams}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transaction data");
        }

        const data = await response.json();
        setTransactions(data.data);
        setTotalPages(data.pagination.totalPages); // Set the total pages from the API response
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [phoneNo, currentPage, selectedDate, isGold, isBuy, isFilterEnabled]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const toggleGoldSilverFilter = () => {
    setIsGold(prevState => !prevState);
  };

  const toggleBuySellFilter = () => {
    setIsBuy(prevState => !prevState);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container px-6 py-8 mx-auto">
        <h3 className="text-3xl font-medium text-gray-700">
          Transaction Details for {phoneNo}
        </h3>

        <div className="mt-4 flex items-center">
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              placeholder="Select date"
              className="px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-500"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`mr-3 text-gray-500 font-medium ${!isGold ? 'text-opacity-100' : 'text-opacity-50'}`}>Silver</div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={isGold}
                onChange={toggleGoldSilverFilter}
              />
              <div className={`w-11 h-6 bg-${isGold ? 'white' : 'gray-650'}-400 rounded-full shadow-inner`}></div>
              <div className={`toggle__dot absolute w-3.5 h-3.5  ${isGold ? 'bg-yellow-600' : 'bg-gray-600'}  rounded-full shadow transform ${isGold ? 'translate-x-6' : 'translate-x-1'}`}></div>
            </label>
            <div className={`ml-3 text-yellow-600 font-medium ${isGold ? 'text-opacity-100' : 'text-opacity-50'}`}>Gold</div>
          </div>

          <div className="flex items-center">
            <div className={`mr-3 text-red-600 font-medium ${!isBuy ? 'text-opacity-100' : 'text-opacity-50'}`}>Sell</div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={isBuy}
                onChange={toggleBuySellFilter}
              />
              <div className={`w-11 h-6 bg-${isBuy ? 'green' : 'gray'}-400 rounded-full shadow-inner`}></div>
              <div className={`toggle__dot absolute w-3.5 h-3.5 ${isBuy ? 'bg-green-500' : 'bg-red-500'} rounded-full transform ${isBuy ? 'translate-x-6' : 'translate-x-1'}`}></div>
            </label>
            <div className={`ml-3 text-green-600 font-medium ${isBuy ? 'text-opacity-100' : 'text-opacity-50'}`}>Buy</div>
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="toggleFilter"
            checked={isFilterEnabled}
            onChange={() => setIsFilterEnabled(prevState => !prevState)}
            className="form-checkbox h-5 w-5 text-gray-600 rounded cursor-pointer"
          />
          <label htmlFor="toggleFilter" className="ml-2 text-gray-600 cursor-pointer">Enable Filters</label>
        </div>

        <div className="mt-8"></div>

        <div className="flex flex-col mt-8">
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Time
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Gold / Silver
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Buy / Sell
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Rate
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {loading ? (
                    <tr>
                      <td colSpan="6">Loading...</td>
                    </tr>
                  ) : (
                    transactions.map((transaction, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm font-medium leading-5 text-gray-900">
                            {`${('0' + new Date(transaction.transaction_date).getDate()).slice(-2)}/${('0' + (new Date(transaction.transaction_date).getMonth() + 1)).slice(-2)}/${new Date(transaction.transaction_date).getFullYear()}`}
                          </div>

                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="text-sm font-medium leading-5 text-gray-900">
                            {(() => {
                              const time = transaction.transaction_time;
                              const [hours, minutes, seconds] = time.split(':');
                              let formattedHours = parseInt(hours, 10);
                              let period = formattedHours >= 12 ? 'PM' : 'AM';

                              // Convert the hours to 12-hour format
                              if (formattedHours > 12) {
                                formattedHours -= 12;
                              } else if (formattedHours === 0) {
                                formattedHours = 12; // For midnight
                              } else if (formattedHours === 12) {
                                formattedHours = 12; // For noon
                              }

                              const formattedTime = `${formattedHours}:${minutes}:${seconds} ${period}`;
                              return formattedTime;
                            })()}
                          </div>



                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <span
                            className={`inline-flex px-2 text-xs font-semibold leading-5 text-gray-900 rounded-full ${transaction.gold_silver === "1" ? "bg-yellow-300" : "bg-gray-300"
                              }`}
                          >
                            {transaction.gold_silver === "1" ? "Gold" : "Silver"}
                          </span>

                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          <span
                            className={`inline-flex px-2 text-xs font-semibold leading-5 text-gray-800 rounded-full ${transaction.buy_sell === "1" ? "bg-green-300" : "bg-red-300"
                              }`}
                          >
                            {transaction.buy_sell === "1" ? "Buy" : "Sell"}
                          </span>

                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          {transaction.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                          {transaction.rate}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm font-medium text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 ml-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
