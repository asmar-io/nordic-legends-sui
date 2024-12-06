import FooterImg from '../Assets/images/Footer_Img.png';

const Footer = () => {
    return (
        <div className='footer-container'>
            <img src={FooterImg} className='footer-img' alt="A Nordic Legend Pics" />
            <div className='footer-texts'>
                <p>
                    The Nordic Legends NFT Collection marks the beginning of a legendary journey. With Warriors and Shieldmaidens leading the charge, the genesis collection sets the stage for your Viking legacy. As the Raid Token launches, new characters, conquests, and opportunities will emerge, empowering you to Raid. Earn. Conquer.
                </p>
                <h1>The North awaits. Will you seize <br />your destiny?</h1>
            </div>
        </div>
    )
}

export default Footer;