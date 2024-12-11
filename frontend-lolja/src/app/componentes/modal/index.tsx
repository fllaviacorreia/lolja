import { ReactNode } from "react";

interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    children: ReactNode
}

export function Modal({isOpen, onClose, children}: ModalProps){
    if(!isOpen) return null;

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}/>
            <div className="relative z-10 h-full max-h-[500px] w-full max-w-6xl overflow-y-auto bg-white p-6 md:rounded-lg">
                <div className="mb-6 border-b border-blue-200 py-6 text-center">

                </div>

                <button type="button" className="absolute right-0 top-0 m-4 text-gray-400 transition-all hover:text-red-400" onClick={onClose}>X</button>

                <div className="">{children}</div>

            </div>

        </div>
    )
}