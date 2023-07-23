import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/Auth/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { UserContextProvider } from "./context/UserContext/UserContext";
import { FeedContextProvider } from "./context/FeedContext/FeedContext";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <AuthContextProvider>
            <UserContextProvider>
              <FeedContextProvider>
                <App />
              </FeedContextProvider>
            </UserContextProvider>
          </AuthContextProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
