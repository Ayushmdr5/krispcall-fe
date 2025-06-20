import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Toaster } from "react-hot-toast";
import StripeProvider from "./StripeProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StripeProvider>
          <App />
        </StripeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
