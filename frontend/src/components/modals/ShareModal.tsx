import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import Portal from "./Portal";
import { CloseIcon, FacebookIcon, InstagramIcon } from "../materials/icons";
import Link from "next/link";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useLockedBody } from "../../hooks/useLockBodyScroll";
import { useRouter } from "next/router";
import { IProject } from "../../interfaces/project";
import { share } from "../../utils/share";

interface ShareModalProps {
  children: JSX.Element;
  project: IProject;
}

export default function ShareModal({ children, project }: ShareModalProps) {
  const { push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const modalRef = useRef(null);
  const [value, copy] = useCopyToClipboard();
  const [locked, setLocked] = useLockedBody();

  useOnClickOutside(modalRef, () => {
    setIsOpen(false);
    setLocked(false);
  });

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined;
    if (copied) {
      timer = setTimeout(() => {
        setCopied(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  async function onCopy() {
    await copy(window.location.href);
    setCopied(true);
  }

  function closeModal() {
    setIsOpen(false);
    setLocked(false);
  }
  function openModal() {
    window.scrollTo({ behavior: "auto", top: 0 });
    setIsOpen(true);
    setLocked(true);
  }

  const socialLinks = [
    {
      link: share({ target: "facebook", projectData: project }),
      label: "Facebook",
      icon: (
        <FacebookIcon className="group-hover:text-[#3b5998] w-6 h-6 text-dark" />
      ),
    },
    {
      link: share({ target: "instagram", projectData: project }),
      label: "Instagram",
      icon: (
        <InstagramIcon className="w-6 h-6 text-dark group-hover:text-[#ff0084]" />
      ),
    },
    {
      link: share({ target: "twitter", projectData: project }),
      label: "Twitter",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-twitter w-6 h-6 text-dark group-hover:text-[#55acee]"
          viewBox="0 0 16 16"
        >
          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
        </svg>
      ),
    },
    {
      link: share({ target: "whatsapp", projectData: project }),
      label: "Whatsapp",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-whatsapp w-6 h-6 text-dark group-hover:text-[#4dc247]"
          viewBox="0 0 16 16"
        >
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
        </svg>
      ),
    },
  ];

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
              className="relative w-5/6 md:w-2/5 h-[400px] bg-white rounded-md p-4"
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
                  <h2 className="text-dark font-bold text-2xl">
                    Help by sharing
                  </h2>
                  <p className="text-sm text-lightDark">
                    Fundraisers shared on social networks raise up to 5x more
                  </p>
                </div>
                <div className="flex-1 flex flex-col justify-around ">
                  {/* social share links */}
                  <ul className="grid grid-cols-4">
                    {socialLinks.map(({ icon, label, link }, idx) => (
                      <li
                        key={idx}
                        className={clsx(
                          "group py-4 border-y hover:border-primary-500 hover:bg-primary-50/50",
                          {
                            "hover:border-[#3b5998] hover:bg-[#3b5998]/5":
                              label === "Facebook",
                            "hover:border-[#55acee] hover:bg-[#55acee]/5":
                              label === "Twitter",
                            "hover:border-[#4dc247] hover:bg-[#4dc247]/5":
                              label === "Whatsapp",
                            "hover:border-[#ff0084] hover:bg-[#ff0084]/5":
                              label === "Instagram",
                          }
                        )}
                      >
                        <Link href={link}>
                          <button className="w-full">
                            <div className="flex flex-col items-center gap-2">
                              {icon}
                              <span
                                className={clsx(
                                  "text-xs font-light text-lightDark",
                                  {
                                    "group-hover:text-[#3b5998]":
                                      label === "Facebook",
                                    "group-hover:text-[#55acee]":
                                      label === "Twitter",
                                    "group-hover:text-[#4dc247]":
                                      label === "Whatsapp",
                                    "group-hover:text-[#ff0084]":
                                      label === "Instagram",
                                  }
                                )}
                              >
                                {label}
                              </span>
                            </div>
                          </button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {/* copy links */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-full">
                      <input
                        className="w-full p-4 border border-lightDark rounded-md outline-none"
                        id="share-to-clipboard"
                        name="share-to-clipboard"
                        readOnly={true}
                        value={window.location.href}
                      />
                      <label
                        className="absolute -top-2.5 left-2 text-[13px] text-dark px-2 bg-white"
                        htmlFor="share-to-clipboard"
                      >
                        Copy link
                      </label>
                    </div>
                    <button
                      onClick={onCopy}
                      className={clsx(
                        "w-fit px-6 py-4 text-white font-medium rounded-md",
                        {
                          "bg-gradient-to-br from-green-300 to-green-500":
                            copied,
                          "bg-gradient-to-tr from-primary-300 to-primary-500":
                            !copied,
                        }
                      )}
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
