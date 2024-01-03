import Link from 'next/link';
import './navbar.css';

export default function Navbar() {

  return (
    <nav className="navbar-container">
      <p className="firstP">Kajetan's</p>
      <div className="tooltip">
        <Link href="/login">
          <img src="/images/logo.png" alt="Logo" className="image" />
        </Link>
        <span className="tooltiptext">
          Welcome to Burger Kingdom, Admin Royalty! 🍔 👑 To enter the realm of gourmet burgers and wield the spatula of admin authority, unlock the kingdom gates with your special credentials. Behind these virtual drawbridges, the kingdom secrets unfold – secret sauces, gourmet toppings, and a treasure trove of admin-exclusive delights. Prepare to reign over the burger empire, oh Admin Majesty! 🏰 🔒
        </span>
      </div>
      <p className="secondP">Dining</p>
    </nav>
  );
}