import * as React from 'react'

const {Consumer, Provider} = React.createContext();

export const ThemeProvider = Provider;
export const ThemeConsumer = Consumer;