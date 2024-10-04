import React from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authAPI from "../apis/authApi"; // Assuming this handles your API requests
import { AddRateSchema } from "../schema";

const { setRate } = authAPI();

function SetRate({ closeModal, rate, getCardCounts }) {
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: {
                rate: rate || 0, // Only one field for rate
            },
            validationSchema: AddRateSchema, // Add a schema if you want to validate the rate field
            onSubmit: async (values) => {
                console.log(values);

                const data = { persentage: values.rate };

                try {
                    const res = await setRate(data); // Assuming this is your API for adding a rate        
                    if (res?.status === 200) {
                        getCardCounts()

                        toast.success("Token Rate Changed", {
                            autoClose: 1000,

                        });
                    } else {
                        toast.error("Network error", {
                            autoClose: 1000,

                        });
                    }
                }
                catch (e) {
                    console.error(e);
                    toast.error("Server error", {
                        position: "top-center",
                        onClose: () => {
                            closeModal();
                        },
                    });
                }
            },
        });

    return (
        <div>
            <ToastContainer />

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                        Set Rate
                    </h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Rate Input */}
                        <div className="relative">
                            <label className="block text-gray-600">Rate</label>
                            <input
                                type="number" // Assuming rate is numeric
                                name="rate"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                                placeholder="Enter rate"
                                value={values.rate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.rate && errors.rate ? (
                                <div className="absolute left-0 mb-1 w-full text-red-500 text-sm">
                                    {errors.rate}
                                </div>
                            ) : null}
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                            >
                                Set Rate
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SetRate;
