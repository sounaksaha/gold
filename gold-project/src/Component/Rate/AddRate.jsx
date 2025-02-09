import { useEffect, useState } from "react";
import silverCoinImage from "/silver.png";
import goldImage from "/gold.png";
// import background from "/rate.png";

// import { API_URl } from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URl } from "../../config";

export default function AddForm() {
  const [activeTab, setActiveTab] = useState("Gold");
  const [date, setDate] = useState("");
  const [goldPrice, setGoldPrice] = useState("");
  const [silverPrice, setSilverPrice] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (activeTab === "Gold") {
      setGoldPrice(value);
    } else {
      setSilverPrice(value);
    }
  };

  const onGoldSubmit = async () => {
    const formData = new FormData();
    formData.append("date", date);
    formData.append("gold_price", goldPrice);

    try {
      const response = await fetch(`${API_URl}/goldPrice.php`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setGoldPrice("");
        toast.success("Gold price added successfully!");
      } else {
        alert("Add Failed");
      }
    } catch (error) {
      toast.error("Failed to add gold price.");
      // Handle error, show error message, etc.
    }
  };

  const onSilverSubmit = async () => {
    const formData = new FormData();
    formData.append("date", date);
    formData.append("silver_price", silverPrice);

    try {
      const response = await fetch(`${API_URl}/silverPrice.php`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSilverPrice("");
        toast.success("Silver price added successfully!");
      } else {
        alert("Add Failed");
      }
    } catch (error) {
      toast.error("Failed to add silver price.");
      // Handle error, show error message, etc.
    }
  };

  const handleAddButtonClick = (e) => {
    e.preventDefault();

    if (activeTab === "Gold") {
      onGoldSubmit();
    } else {
      onSilverSubmit();
    }
  };
  useEffect(() => {
    // Get today's date
    const currentDate = new Date();

    const formattedDate = currentDate.toISOString().split("T")[0];

    setDate(formattedDate);
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div
        className="flex items-center justify-center min-h-screen bg-gray-300 bg-cover bg-center"
        
      >
        <div className="relative flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md my-8">
          <div className="relative grid px-4 py-8 m-0 overflow-hidden text-center text-white bg-gray-900 place-items-center rounded-xl bg-clip-border shadow-gray-900/20">
            <div className="h-20 p-6 mb-4 text-white">
              <img
                className="h-10 w-10" // Adjust the size as needed
                src={activeTab === "Gold" ? goldImage : silverCoinImage}
                alt="Gold Coin"
              />
            </div>
            <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-white">
              Add Rate
            </h5>
          </div>
          <div className="p-6">
            <div className="block overflow-visible">
              <nav>
                <ul
                  role="tablist"
                  className="relative z-0 flex flex-row p-1 rounded-lg bg-blue-gray-50 bg-opacity-60"
                >
                  <li
                    role="tab"
                    className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none ${
                      activeTab === "Gold"
                        ? "text-gray-50"
                        : "text-blue-gray-900"
                    }`}
                    onClick={() => handleTabClick("Gold")}
                  >
                    <div className="z-20 text-inherit">Gold</div>
                    <div
                      className={`absolute inset-0 z-10 h-full bg-yellow-600 rounded-md shadow ${
                        activeTab === "Gold" ? "opacity-100" : "opacity-0"
                      }`}
                      data-projection-id="4"
                    ></div>
                  </li>
                  <li
                    role="tab"
                    className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none ${
                      activeTab === "Silver"
                        ? "text-gray-50"
                        : "text-blue-gray-900"
                    }`}
                    onClick={() => handleTabClick("Silver")}
                  >
                    <div className="z-20 text-inherit">Silver</div>
                    <div
                      className={`absolute inset-0 z-10 h-full bg-gray-600 rounded-md shadow ${
                        activeTab === "Silver" ? "opacity-100" : "opacity-0"
                      }`}
                      data-projection-id="4"
                    ></div>
                  </li>
                </ul>
              </nav>
              <div className="relative block w-full overflow-hidden !overflow-x-hidden !overflow-y-visible bg-transparent">
                <div
                  role="tabpanel"
                  className="w-full p-0 font-sans text-base antialiased font-light leading-relaxed text-gray-700 h-max"
                  data-value="card"
                >
                  <form className="flex flex-col gap-4 mt-12">
                    <div>
                      <p className="block mb-2 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                        Date
                      </p>
                      <div className="relative h-10 w-full min-w-[200px]">
                        <input
                          type="date"
                          placeholder="date"
                          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                      </div>
                    </div>
                    <div>
                      <p className="block mb-2 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                        Time
                      </p>
                      <div className="relative h-10 w-full min-w-[200px]">
                        <input
                          type="time"
                          placeholder="date"
                          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                      </div>
                    </div>
                    <div className="my-3">
                      <p className="block mb-2 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                        Price
                      </p>
                      <div className="relative h-10 w-full min-w-[200px]">
                        <input
                          type="number"
                          placeholder={`${activeTab} Price`}
                          required
                          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                          value={activeTab === "Gold" ? goldPrice : silverPrice}
                          onChange={handlePriceChange}
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                      </div>
                    </div>
                    <button
                      className={`select-none rounded-lg ${
                        activeTab === "Gold" ? "bg-yellow-600" : "bg-gray-600"
                      } py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                      type="button"
                      onClick={handleAddButtonClick}
                    >
                      Add
                    </button>
                    <p className="flex items-center justify-center gap-2 mt-2 font-sans text-sm antialiased font-medium leading-normal text-gray-700 opacity-60"></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
