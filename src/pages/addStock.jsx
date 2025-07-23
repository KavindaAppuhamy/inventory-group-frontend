import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import UpdateStock from "./updateStock";

export default function AddStock() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productId: "",
    itemName: "",
    category: "",
    quantity: 0,
    unit: "units",
    price: 0,
    supplier: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/stock", formData);
      toast.success("Stock added successfully");
      navigate("/admin/stocks"); // change to your desired route
    } catch (err) {
      console.error(err);
      toast.error("Failed to add stock");
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
            Add New Stock
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Record a new item into your stock inventory.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/75 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 p-8 space-y-7"
        >
          {/* Product ID */}
          <InputField label="Product ID" name="productId" icon={<Hash />} value={formData.productId} onChange={handleChange} />

          {/* Item Name */}
          <InputField label="Item Name" name="itemName" icon={<Tag />} value={formData.itemName} onChange={handleChange} />

          {/* Category */}
          <InputField label="Category" name="category" icon={<Folder />} value={formData.category} onChange={handleChange} />

          {/* Quantity */}
          <InputField label="Quantity" name="quantity" type="number" icon={<BarChart3 />} value={formData.quantity} onChange={handleChange} />

          {/* Unit */}
          <div className="group">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2.5">
              <Ruler className="w-4 h-4 mr-2 text-purple-500" />
              Unit
            </label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-white/70 text-gray-900"
            >
              <option value="units">2Unit</option>
              <option value="packs">Packs</option>
              <option value="kg">Kg</option>
              <option value="g">Grams</option>
              <option value="l">Liters</option>
              <option value="ml">Milliliters</option>
            </select>
          </div>

          {/* Price */}
          <InputField label="Price" name="price" type="number" icon={<DollarSign />} value={formData.price} onChange={handleChange} />

          {/* Supplier */}
          <InputField label="Supplier" name="supplier" icon={<Building />} value={formData.supplier} onChange={handleChange} />

          {/* Description */}
          <div className="group">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2.5">
              <Info className="w-4 h-4 mr-2 text-indigo-500" />
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter optional stock description..."
              className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-white/70 text-gray-900 h-28 resize-y"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end items-center mt-10 pt-6 border-t border-gray-200">
            <Link
                to="/admin/stocks"
                className="w-full sm:w-auto px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-center"
            >
                Cancel
            </Link>
            <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300"
            >
                Add Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Reusable InputField Component
function InputField({ label, name, value, onChange, icon, type = "text" }) {
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
      />
    </div>
  );
}
