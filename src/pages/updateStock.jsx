import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Package,
  Hash,
  Tag,
  Folder,
  BarChart3,
  Ruler,
  DollarSign,
  Building,
  Info
} from "lucide-react";

export default function UpdateStock() {
  const navigate = useNavigate();
  const { state } = useLocation(); // passed stock item

  // Separate state variables
  const [id, setId] = useState("");
  const [productId, setProductId] = useState("");
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState("units");
  const [price, setPrice] = useState(0);
  const [supplier, setSupplier] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (state) {
      setId(state._id);
      setProductId(state.productId || "");
      setItemName(state.itemName || "");
      setCategory(state.category || "");
      setQuantity(state.quantity || 0);
      setUnit(state.unit || "units");
      setPrice(state.price || 0);
      setSupplier(state.supplier || "");
      setDescription(state.description || "");
    }
  }, [state]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      productId,
      itemName,
      category,
      quantity,
      unit,
      price,
      supplier,
      description,
    };

    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/stock/${id}`, updatedData);
      toast.success("Stock updated successfully");
      navigate("/admin/stocks");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 font-sans antialiased">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-3xl mb-6 shadow-xl">
            <Package className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight mb-3">
            Update Stock
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Modify existing stock details and save changes.
          </p>
        </div>

        <form onSubmit={handleUpdate} className="bg-white/75 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 p-8 space-y-7">

          <InputField label="Product ID" name="productId" icon={<Hash />} value={productId} onChange={(e) => setProductId(e.target.value)} readOnly />
          <InputField label="Item Name" name="itemName" icon={<Tag />} value={itemName} onChange={(e) => setItemName(e.target.value)} />
          <InputField label="Category" name="category" icon={<Folder />} value={category} onChange={(e) => setCategory(e.target.value)} />
          <InputField label="Quantity" name="quantity" type="number" icon={<BarChart3 />} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />

          {/* Unit */}
          <div className="group">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2.5">
              <Ruler className="w-4 h-4 mr-2 text-purple-500" />
              Unit
            </label>
            <select
              name="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-white/70 text-gray-900"
            >
              <option value="units">Units</option>
              <option value="packs">Packs</option>
              <option value="kg">Kg</option>
              <option value="g">Grams</option>
              <option value="l">Liters</option>
              <option value="ml">Milliliters</option>
            </select>
          </div>

          <InputField label="Price" name="price" type="number" icon={<DollarSign />} value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          <InputField label="Supplier" name="supplier" icon={<Building />} value={supplier} onChange={(e) => setSupplier(e.target.value)} />

          {/* Description */}
          <div className="group">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2.5">
              <Info className="w-4 h-4 mr-2 text-indigo-500" />
              Description
            </label>
            <textarea
              name="description"
              placeholder="Update stock description..."
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-white/70 text-gray-900 h-28 resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end items-center mt-10 pt-6 border-t border-gray-200">
            <Link
              to="/admin/stocks"
              className="w-full sm:w-auto px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-br from-green-600 to-emerald-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-800 transition-all duration-300"
            >
              Update Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable InputField component
function InputField({ label, name, value, onChange, icon, type = "text", readOnly = false }) {
  return (
    <div className="group">
      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2.5">
        <span className="mr-2 text-blue-500">{icon}</span>
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-white/70 text-gray-900"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
}
