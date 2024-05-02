import { useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import { Dialog, DialogRef } from "src/components";

function useConfirm(props) {
  const dialogRef = (useRef < DialogRef) | (null > null);

  useEffect(() => {
    const rootElement = document.createElement("div");
    const root = ReactDOM.createRoot(rootElement);

    root.render(<Dialog ref={dialogRef} {...props} />);

    return () => {
      root.unmount();
      rootElement.parentNode?.removeChild(rootElement);
    };
  }, [props]);

  const ask = useCallback(() => dialogRef.current?.open(), []);
  const close = useCallback(() => dialogRef.current?.close(), []);
  return { ask, close };
}

export { useConfirm };
