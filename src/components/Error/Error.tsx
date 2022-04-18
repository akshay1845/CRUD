import './error.scss'
import {useNavigate} from 'react-router-dom'

const Error = () => {


  const navigate = useNavigate()
  return (
    <div className="errorContainer">
      <button className="errorBtn" onClick = {()=>navigate('/home')}>Go Back to Home</button>
    </div>
  )
}

export default Error