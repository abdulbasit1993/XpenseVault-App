import React, {Children, createContext, useContext, useState} from 'react';
import CustomToast from '../components/CustomToast';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({children}) => {
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'success',
  });

  const showToast = (message, type = 'success') => {
    setToast({visible: true, message, type});
  };

  const hideToast = () => {
    setToast(prev => ({...prev, visible: false}));
  };

  return (
    <ToastContext.Provider value={{showToast, hideToast}}>
      {children}
      {toast.visible && (
        <CustomToast
          message={toast.message}
          type={toast.type}
          setToast={hideToast}
        />
      )}
    </ToastContext.Provider>
  );
};
