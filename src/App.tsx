
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import RegisterServices from './components/Services/RegisterServices'

function App() {
  return (
    <div className="relative w-full h-full bg-cover bg-center" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 10%, #000 100%), url('background.jpg')" }}>
      <Header />
        <main>
          <RegisterServices />          
        </main>
      <Footer />
    </div>
  )
}

export default App
