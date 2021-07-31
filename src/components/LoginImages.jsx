import React from 'react'
import IronmanImage from '@heroes/ironman.png'
import SupermanImage from '@heroes/superman.png'
import ThorImage from '@heroes/thor.png'
import BatmanImage from '@heroes/batman.png'
import SpidermanImage from '@heroes/spiderman.png'
import AquamanImage from '@heroes/aquaman.png'
import HulkImage from '@heroes/hulk.png'
import CaptainAmericaImage from '@heroes/captain-america.png'
import WonderWomanImage from '@heroes/wonderwoman.png'


const LoginImages = () => {
  return (
    <div className="login-images-container">
      <img className="login-image" src={IronmanImage} alt="Ironman" />
      <img className="login-image" src={SupermanImage} alt="Superman" />
      <img className="login-image" src={ThorImage} alt="Thor" />
      <img className="login-image" src={BatmanImage} alt="Batman" />
      <img className="login-image" src={SpidermanImage} alt="Spiderman" />
      <img className="login-image" src={AquamanImage} alt="Aquaman" />
      <img className="login-image" src={HulkImage} alt="Hulk" />
      <img className="login-image" src={CaptainAmericaImage} alt="Captain America" />
      <img className="login-image" src={WonderWomanImage} alt="Wonder Woman" />
    </div>
  )
}
 
export default LoginImages