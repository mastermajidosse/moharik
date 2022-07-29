import { useState, useRef } from "react";
import Portal from "./Portal";
import { CloseIcon } from "../materials/icons";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useLockedBody } from "../../hooks/useLockBodyScroll";
import { IOrganizer } from "../../interfaces/organizer";

interface ModalProps {
  children: JSX.Element;
  contact: IOrganizer | Record<string, never>;
}

export default function ContactModal({ children, contact }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const [locked, setLocked] = useLockedBody();

  useOnClickOutside(modalRef, () => {
    setIsOpen(false);
    setLocked(false);
  });

  function closeModal() {
    setIsOpen(false);
    setLocked(false);
  }
  function openModal() {
    window.scrollTo({ behavior: "auto", top: 0 });
    setIsOpen(true);
    setLocked(true);
  }

  return (
    <>
      <div onClick={openModal} className="w-full">
        {children}
      </div>
      {isOpen && (
        <Portal selector="#modal">
          {/* overlay */}
          <div className="absolute bottom-0 top-0 left-0 right-0 z-50 bg-black/70 flex justify-center items-center">
            {/* modal */}
            <div
              ref={modalRef}
              className="relative w-5/6 md:w-2/5  bg-white rounded-md p-4"
            >
              {/* close btn */}
              <CloseIcon
                onClick={closeModal}
                className="absolute top-4 right-4 bg-light text-dark w-8 h-8 p-1.5 rounded-full hover:scale-105 cursor-pointer"
              />
              {/* modal body */}
              <div className="w-full h-full flex flex-col gap-4">
                {/* modal header */}
                <div className="pt-10">
                  <h2 className="text-dark font-bold text-2xl">Organizer</h2>
                  <p className="text-sm text-lightDark">
                    Let&#39;s get connected
                  </p>
                </div>
                <div className="flex-1 flex flex-col justify-center ">
                  {/* contact info */}
                  <ul className="flex flex-col gap-2">
                    <li className="">
                      <b>Name: </b> {contact?.name || "-----"}
                    </li>
                    <li className="list">
                      <b>Email: </b> {contact?.email || "------"}
                    </li>
                    <li className="list">
                      <b>Phone: </b> {contact?.phone || "-----"}
                    </li>
                    <li className="list">
                      <b>Country: </b> {contact?.country || "-----"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
