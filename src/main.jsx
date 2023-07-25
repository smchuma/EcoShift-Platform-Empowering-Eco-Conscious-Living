import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/Auth/AuthContext";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { UserContextProvider } from "./context/UserContext/UserContext";
import { FeedContextProvider } from "./context/FeedContext/FeedContext";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { PostContextProvider } from "./context/PostContext/PostContext";
import { TaskContextProvider } from "./context/TaskContext/TaskContext";

const queryClient = new QueryClient();

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AuthContextProvider>
            <UserContextProvider>
              <FeedContextProvider>
                <PostContextProvider>
                  <TaskContextProvider>
                    <App />
                  </TaskContextProvider>
                </PostContextProvider>
              </FeedContextProvider>
            </UserContextProvider>
          </AuthContextProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
