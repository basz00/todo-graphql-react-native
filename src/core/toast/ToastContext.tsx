import React, {
  createContext,
  useContext,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import Toast from "react-native-root-toast";
import { RootSiblingParent } from "react-native-root-siblings";

type ToastContextType = {
  show: (message: string, options?: ToastOptions) => void;
  listener: (callback: (message: string) => void) => void;
};

type ToastOptions = {
  duration?: number;
  position?: number;
  shadow?: boolean;
  animation?: boolean;
  hideOnPress?: boolean;
  delay?: number;
};

const ToastContext = createContext<ToastContextType>({
  show: () => {},
  listener: () => {},
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const listeners = useRef<((message: string) => void)[]>([]);

  const show = useCallback((message: string, options?: ToastOptions) => {
    Toast.show(message, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      ...options,
    });

    listeners.current.forEach((listener) => listener(message));
  }, []);

  const listener = useCallback((callback: (message: string) => void) => {
    listeners.current.push(callback);
  }, []);

  return (
    <RootSiblingParent>
      <ToastContext.Provider value={{ show, listener }}>
        {children}
      </ToastContext.Provider>
    </RootSiblingParent>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
