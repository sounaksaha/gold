import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { API_URl } from "../../config"; // Ensure this is the correct variable name

export default function User() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerResponse, totalResponse] = await Promise.all([
          fetch(`${API_URl}/customer.php?q=${searchTerm}`),
          fetch(`${API_URl}/totalCustomer.php`),
        ]);

        if (!customerResponse.ok || !totalResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await customerResponse.json();
        const totalData = await totalResponse.json();

        setCustomers(data);
        setTotalCustomers(totalData.totalcustomers || 0);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return Array.isArray(customers.data) ? customers.data.slice(indexOfFirstItem, indexOfLastItem) : [];
  }, [customers, currentPage, itemsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container px-6 py-8 mx-auto">
        <h3 className="text-4xl font-medium text-gray-700">Customer Details</h3>

        <div className="mt-4">
          <div className="flex flex-wrap -mx-6">
            <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
              <div className="relative flex items-center px-5 py-6 bg-gray-800 rounded-lg shadow-sm">
                <div className="absolute left-0 h-full w-6 bg-gradient-to-r from-gray-800 to-transparent rounded-full"></div>
                <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div className="absolute right-0 h-full w-6 bg-gradient-to-l from-gray-800 to-transparent rounded-full"></div>
                <div className="mx-5">
                  <h4 className="text-3xl font-semibold text-gray-200">{totalCustomers}</h4>
                  <div className="text-gray-100">Total Customer</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name or phone..."
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

        <div className="mt-8">
          <div className="flex flex-col mt-8">
            <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Name</th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Phone</th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">DOB</th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">PAN</th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Address</th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">City</th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">State</th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Pincode</th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {loading ? (
                      <tr>
                        <td colSpan="9" className="text-center">Loading...</td>
                      </tr>
                    ) : currentItems.length > 0 ? (
                      currentItems.map((customer, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 border-b border-gray-200">
                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                            <div className="text-sm text-gray-500">{customer.email}</div>
                          </td>
                          <td className="px-6 py-4 border-b border-gray-200">{customer.number}</td>
                          <td className="px-6 py-4 border-b border-gray-200">{customer.dob}</td>
                          <td className="px-6 py-4 border-b border-gray-200">
                            {customer.pan_number}
                            <button
                              onClick={() => handleImageClick(customer.pan_image)} // Ensure you have this field
                              className="ml-2 text-blue-500 hover:underline"
                            >
                              🖼️
                            </button>
                          </td>
                          <td className="px-6 py-4 border-b border-gray-200">{customer.address}</td>
                          <td className="px-6 py-4 border-b border-gray-200">{customer.city}</td>
                          <td className="px-6 py-4 border-b border-gray-200">{customer.state}</td>
                          <td className="px-6 py-4 border-b border-gray-200">{customer.pincode}</td>
                          <td className="px-6 py-4 border-b border-gray-200">
                            <Link to={`/dashboard/user/${customer.number}`} className="rounded-lg px-4 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 duration-300">
                              View
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center">No customers found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {/* Pagination Logic */}
                <div className="flex justify-center mt-4">
                  <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="mx-2 px-4 py-2 text-white bg-blue-500 rounded">
                    Previous
                  </button>
                  <span className="mx-2">{currentPage}</span>
                  <button onClick={() => paginate(currentPage + 1)} disabled={currentItems.length < itemsPerPage} className="mx-2 px-4 py-2 text-white bg-blue-500 rounded">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for PAN Image */}
        {selectedImage && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
            onClick={closeModal} // Close modal on background click
          >
            <div
              className="relative bg-white rounded-lg shadow-lg max-w-lg w-full"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing modal when clicking inside
            >
              {/* Close Button Positioned Above the Image */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition duration-150 z-10"
              >
                ✖️
              </button>
              <img
                src={selectedImage}
                alt="PAN"
                className="max-w-full h-auto rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-center">PAN Image</h3>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}
