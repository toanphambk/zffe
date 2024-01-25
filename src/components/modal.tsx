"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const Modal: React.FC = () => {
  const { isActive, childComponent } = useAppSelector(
    (state) => state.modalReducer
  );

  if (isActive) {
    return (
      <div className="relative z-10">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            {childComponent}
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;
