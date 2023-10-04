import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { QueryClientProvider } from "react-query";
import { AuthProvider } from "./hooks/useAuth";
import AppRoutes from "./routes/Routes";
import GlobalStyle from "./styles/global";
import { theme } from "./styles/theme";
import queryClient from "./services/queryClient";
import CartProvider from "./contexts/CartContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <ThemeProvider theme={theme}>
            <AppRoutes />
            <GlobalStyle />
          </ThemeProvider>
        </CartProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
