/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { useState, useContext, useCallback,  useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { animated, useTransition } from "react-spring";

import "./Toast.css"

export const ToastContext = React.createContext(null);

let id = 1;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    content => {
      setToasts(toasts => [
        ...toasts,
        {
          id: id++,
          content
        }
      ]);
    },
    [setToasts]
  );

  const removeToast = useCallback(
    id => {
      setToasts(toasts => toasts.filter(t => t.id !== id));
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast
      }}
    >
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const toastHelpers = useContext(ToastContext);

  return toastHelpers;
};

export const ToastContainer = ({ toasts }) => {
  const transitions = useTransition(toasts, toast => toast.id, {
    from: { right: "-100%" },
    enter: { right: "0%" },
    leave: { right: "-105%" }
  });
  
  return createPortal(
    <div className="toast-portal">
      {transitions.map(({ item, key, props }) => (
        <Toast key={key} id={item.id} style={props}>
          {item.content}
        </Toast>
      ))}
    </div>,
    document.body
  );
};

export const Toast = ({ children, id, style, delay = 800 }) => {
  const { removeToast } = useToast();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [id, removeToast]);

  return <div className="toast">
    <div style={{...style, display: 'inline'}}>
      {children}
    </div>
  </div>;
};
