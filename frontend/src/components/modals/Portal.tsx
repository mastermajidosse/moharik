import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: JSX.Element;
  selector: string;
}

export default function Portal({ children, selector }: PortalProps) {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector) || null;
    if (ref.current) {
      setMounted(true);
    }
  }, [selector]);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
}
