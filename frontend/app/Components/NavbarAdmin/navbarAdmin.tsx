import Link from 'next/link';
import './navbarAdmin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export default function navbarAdmin() {

  return (
    <div className='nav-container-admin'>
      <div className='logo-container-admin'>
        <img src="/images/logo2.png" alt="Logo" className="image-admin" />
      </div>
      <div className='icon-container-admin'>
        <Link href="/" className="icon-button-admin">
          <FontAwesomeIcon icon={faSignOutAlt} className='admin-icon' />
        </Link>
      </div>
    </div>
  )
}