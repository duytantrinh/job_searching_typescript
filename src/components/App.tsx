import Background from "./Background"
import Container from "./Container"
import Footer from "./Footer"
import Header from "./Header"

import {Toaster} from "react-hot-toast"

function App() {
  return (
    <>
      <Background />

      <Header />

      <Container />

      <Footer />

      <Toaster position="top-center" />
    </>
  )
}

export default App
