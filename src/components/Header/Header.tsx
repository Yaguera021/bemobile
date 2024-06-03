import Logo from "../../assets/images/BeLogo.png";

import "./Header.scss";

export default function Header() {
  return (
    <div className='header-container'>
      <img src={Logo} alt='Logo' />
    </div>
  );
}
