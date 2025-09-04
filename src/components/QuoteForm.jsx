import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function QuoteForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    city: "",
    fromPostcode: "",
    toPostcode: "",
    distance: 0,
    propertySize: "",
    helpers: 1,
    date: "",
    time: "",
    stairs: 0,
    furniture: [{ name: "", number: "" }],
    customerName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFurnitureChange = (index, field, value) => {
    const updated = [...formData.furniture];
    updated[index][field] = value;
    setFormData({ ...formData, furniture: updated });
  };

  const addFurniture = () =>
    setFormData({
      ...formData,
      furniture: [...formData.furniture, { name: "", number: "" }],
    });

  const calculatePrice = () => {
    const baseRate = 50;
    const distanceCost = formData.distance * 2;
    const helperCost = formData.helpers * 30;
    const itemCost = formData.furniture.reduce(
      (acc, f) => acc + (parseInt(f.number) || 0) * 10,
      0
    );
    return baseRate + distanceCost + helperCost + itemCost;
  };

  const handleDistanceCalc = () => {
    if (formData.fromPostcode && formData.toPostcode) {
      const dist =
        Math.abs(
          formData.fromPostcode.charCodeAt(0) -
            formData.toPostcode.charCodeAt(0)
        ) * 10;
      setFormData({ ...formData, distance: dist });
    }
  };

  const steps = ["Journey", "Property", "Furniture", "Your Details"];

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 sm:p-8 md:p-10 rounded-3xl bg-white/70 backdrop-blur-md shadow-2xl border border-indigo-200">
      {/* Progress Tracker */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 relative">
        {steps.map((label, i) => (
          <div key={i} className="flex-1 flex items-center mb-2 sm:mb-0">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold z-10 transition
              ${step === i + 1 ? "bg-indigo-600 text-white" : step > i + 1 ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}
            >
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded transition 
                ${step > i + 1 ? "bg-green-500" : "bg-gray-300"}`}
              ></div>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 text-gray-800">
        Get a Moving Quote
      </h2>

      <AnimatePresence mode="wait">
        {/* STEP 1 */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">
              Step 1: Journey Details
            </h3>

            {["city", "fromPostcode", "toPostcode"].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none"
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}

            <button
              onClick={handleDistanceCalc}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-500 text-white rounded-xl shadow-md hover:scale-105 transition"
            >
              Calculate Distance
            </button>

            {formData.distance > 0 && (
              <p className="text-sm text-gray-600 font-medium">
                Estimated Distance:{" "}
                <span className="text-indigo-600 font-bold">
                  {formData.distance} miles
                </span>
              </p>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl shadow hover:scale-105 transition"
              >
                Next →
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">
              Step 2: Property & Helpers
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Size
              </label>
              <select
                name="propertySize"
                value={formData.propertySize}
                onChange={handleChange}
                className="w-full p-3 border-2 border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              >
                <option value="">Select Property Size</option>
                <option value="1bhk">1 BHK</option>
                <option value="2bhk">2 BHK</option>
                <option value="3bhk">3 BHK</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["helpers", "date", "time", "stairs"].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    type={
                      field === "date"
                        ? "date"
                        : field === "time"
                        ? "time"
                        : "number"
                    }
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    placeholder={field === "helpers" ? "e.g. 2" : ""}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 transition w-full sm:w-auto"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl shadow hover:scale-105 transition w-full sm:w-auto"
              >
                Next →
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">
              Step 3: Furniture Details
            </h3>

            {formData.furniture.map((f, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-3 items-start sm:items-end"
              >
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={f.name}
                    onChange={(e) =>
                      handleFurnitureChange(index, "name", e.target.value)
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    placeholder="Furniture / Appliance"
                  />
                </div>
                <div className="w-full sm:w-24">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Qty
                  </label>
                  <input
                    type="number"
                    value={f.number}
                    onChange={(e) =>
                      handleFurnitureChange(index, "number", e.target.value)
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                    placeholder="Qty"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={addFurniture}
              className="px-5 py-2 border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition"
            >
              + Add More
            </button>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 transition w-full sm:w-auto"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl shadow hover:scale-105 transition w-full sm:w-auto"
              >
                Next →
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-semibold text-indigo-600 mb-2">
              Step 4: Your Details
            </h3>

            {["customerName", "email", "phone"].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {field.replace("customerName", "Full Name")}
                </label>
                <input
                  type={
                    field === "email" ? "email" : field === "phone" ? "tel" : "text"
                  }
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl text-black focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                  placeholder={
                    field === "email"
                      ? "you@example.com"
                      : field === "phone"
                      ? "+44 123 456 789"
                      : "Your Name"
                  }
                />
              </div>
            ))}

            <div className="bg-indigo-50 p-5 rounded-xl border text-center shadow-inner">
              <p className="text-gray-700 font-medium">
                Estimated Price:{" "}
                <span className="text-2xl font-bold text-indigo-600">
                  ${calculatePrice()}
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 transition w-full sm:w-auto"
              >
                ← Back
              </button>
              <button
                onClick={() => alert("Quote submitted!")}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow hover:scale-105 transition w-full sm:w-auto"
              >
                Submit ✔
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default QuoteForm;
