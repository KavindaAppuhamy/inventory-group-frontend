import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AdminStockPage() {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/stock")
        .then((res) => {
          setStocks(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load stock data");
        });
    }
  }, [isLoading]);

  function deleteStock(stockId) {
    if (!window.confirm("Are you sure you want to delete this stock?")) return;

    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/stock/" + stockId)
      .then(() => {
        toast.success("Stock deleted successfully");
        setIsLoading(true);
      })
      .catch((e) => {
        toast.error("Failed to delete stock");
      });
  }

  return (
    <div className="w-full h-full max-h-full overflow-y-scroll p-4 relative">
      <Link to="/admin/add-stock" className="absolute text-xl cursor-pointer bottom-5 right-5 bg-green-500 text-white font-bold py-2 px-4 rounded text-center flex justify-center items-center">+</Link>

      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[70px] h-[70px] border-[5px] border-gray-300 border-t-blue-900 rounded-full animate-spin"></div>
        </div>
      ) : (
        <table className="min-w-full text-center bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Product ID</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Name</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Category</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Quantity</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Unit</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Price</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Supplier</th>
              <th className="py-3 px-4 uppercase font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {stocks.map((stock, index) => (
              <tr key={stock._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-4">{stock.productId}</td>
                <td className="py-3 px-4 font-medium">{stock.itemName}</td>
                <td className="py-3 px-4">{stock.category}</td>
                <td className="py-3 px-4">{stock.quantity}</td>
                <td className="py-3 px-4">{stock.unit}</td>
                <td className="py-3 px-4 text-green-600 font-bold">${stock.price}</td>
                <td className="py-3 px-4">{stock.supplier}</td>
                <td className="py-3 px-4">
                  <div className="flex justify-center items-center">
                    <FaEdit
                      onClick={() =>
                        navigate("/admin/update-stock", {
                          state: stock,
                        })
                      }
                      className="text-[20px] text-blue-500 cursor-pointer hover:text-blue-700 mx-2 transition-all duration-150"
                    />
                    <FaTrash
                      onClick={() => deleteStock(stock._id)}
                      className="text-[20px] text-red-500 cursor-pointer hover:text-red-700 transition-all duration-150"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
