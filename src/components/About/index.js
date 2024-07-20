import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import {useEffect,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {   faAngular,
    faCss3,
    faGitAlt,
    faHtml5,
    faJsSquare,
    faReact,} from '@fortawesome/free-brands-svg-icons'
import Loader from 'react-loaders'
    const About = () => {

    const [letterClass, setLetterClass] = useState('text-animate')
    useEffect(() => {
        const timer = setTimeout(() => {
          setLetterClass('text-animate-hover');
        }, 3000);
        return () => clearTimeout(timer); // Cleanup function to clear the timeout
    }, []);

    return (
        <>
            <div className='container about-page'>
            <div className ='text-zone'>
                <h1>
                    <AnimatedLetters
                    letterClass ={letterClass}
                    strArray={['A', 'b','o','u','t','M','e']}
                    idx={15}
                    />
                </h1>
                <p>I have solved over 600 problems on data structures and algorithms (DSA), demonstrating a solid command of DSA concepts.</p>
                <p> I thrive in collaborative environments and am always eager to learn new technologies and improve my skills. </p>
                <p>With a keen eye for detail and a commitment to writing clean, maintainable code, I am confident in my ability to contribute effectively to any development team.</p>
            </div>

            <div className="stage-cube-cont">
          <div className="cubespinner">
            <div className="face1">
              <FontAwesomeIcon icon={faAngular} color="#DD0031" />
            </div>
            <div className="face2">
              <FontAwesomeIcon icon={faHtml5} color="#F06529" />
            </div>
            <div className="face3">
              <FontAwesomeIcon icon={faCss3} color="#28A4D9" />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faGitAlt} color="#EC4D28" />
            </div>
          </div>
        </div>

        </div>
        <Loader type="pacman"/>
        </>
    
    )
}

export default About