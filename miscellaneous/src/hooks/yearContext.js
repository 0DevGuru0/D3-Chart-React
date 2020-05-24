import React from 'react'
const ctrlContext = React.createContext()
export const CtrlProvider = ctrlContext.Provider
export const CtrlConsumer = ctrlContext.Consumer
export default ctrlContext
