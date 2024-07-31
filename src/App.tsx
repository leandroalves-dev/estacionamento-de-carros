
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import RegisterServices from './components/Services/RegisterServices'

function App() {
  return (
    <>
      <Header />
        <main>
          <RegisterServices />          
        </main>
      <Footer />
    </>
  )
}

export default App
