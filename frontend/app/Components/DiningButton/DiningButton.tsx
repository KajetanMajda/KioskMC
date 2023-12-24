import Link from 'next/link';
import "./diningButton.css";

export default function DiningButton() {
  return (
    <div className="dining-button-container">
      <Link href="/home" className="dining">Dine In</Link>
      <Link href="/home" className="dining">Take Out</Link>
    </div>
  );
}