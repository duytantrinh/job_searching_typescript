import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import "./index.css"
import App from "./components/App"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {BookmarksContextProvider} from "./context/BookmarksContextProvider"
import {SearchProvider} from "./context/searchContext"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <BookmarksContextProvider>
          <App />
        </BookmarksContextProvider>
      </SearchProvider>
    </QueryClientProvider>
  </StrictMode>
)
