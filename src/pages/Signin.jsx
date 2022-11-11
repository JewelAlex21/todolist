import GoogleButton from 'react-google-button'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './signin.css'
import { useEffect } from 'react'

const Signin = () => {

  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/dashboard')
    }
  }, [user])

  return (
    <div className='signin'>
      <div className='logo'>
        <img src="https://i.postimg.cc/Kzc3MP3H/Vector.png" alt="" />
      </div>
      <div className='image'>
        <img src="https://i.postimg.cc/nrJR13Bp/chandelier-with-green-round-lampshade.png"  alt="" />
      </div>
      <div className='imgbg'>
        <img src="https://i.postimg.cc/K8TRLQG0/Rectangle-1.png" alt="" />
      </div>
      <div className='rectangle'>
        <img src="https://i.postimg.cc/zGQ1k1BN/Rectangle.png" alt="" />
      </div>
      
      <h1>LOGIN</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit eos voluptatem nemo dicta obcaecati odit, 
        iure quibusdam assumenda ratione incidunt laboriosam voluptates molestiae alias ab, fuga aperiam dignissimos!
      </p>
      <GoogleButton className='google' onClick={handleGoogleSignIn} />
    </div>
  )
}

export default Signin