import './Header.css'

import Logo from '../../assets/logo.png'

const Header = () => {
  return (
      <header className='header'>
        <img src={Logo} alt="" />
        <h2>PlusPark</h2>
      </header>
  )
}

export default Header