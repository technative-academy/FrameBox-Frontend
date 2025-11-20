import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice.jsx";

export default function PopUp({ onCancel }) {
    const dispatch = useDispatch();

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="flex justify-end items-center pr-4 bg-red-100 p-6 rounded shadow-lg">
                <div className="flex flex-col items-center justify-center text-xl lg:mb-16 ">
                    <h1 className="text-2xl text-center">
                        You are going to Log Out
                    </h1>
                    <div className="flex gap-4 mt-4 p-2">
                        <button
                            className="bg-black justify-center flex text-white p-2 mx-auto rounded-md w-24"
                            onClick={() => {
                                dispatch(logout());
                                onCancel();
                            }}
                        >
                            Proceed
                        </button>
                        <button
                            className="bg-black justify-center flex text-white p-2 mx-auto rounded-md w-24"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
