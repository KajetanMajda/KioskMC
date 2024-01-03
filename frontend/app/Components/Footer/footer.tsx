import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

export default function footer() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className='footer-container'>
      <div className='icon-container'>
        <button onClick={scrollToTop} className="icon-button">
          <FontAwesomeIcon icon={faArrowUp} className='footer-icon' />
        </button>
      </div>
    </div>
  )
}