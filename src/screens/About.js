import React from 'react'

import dots from '../assets/img/design/dots.svg'
import Button from '../components/Button'
import rect from '../assets/img/backgrounds/rect.jpg'
import man from '../assets/img/backgrounds/man.jpg'

import '../assets/css/About.css'

function About() {
    return (
        <div>
            <section id="hero">
                <div className="container">
                    <h3>About</h3>
                    <h1>Em<span className="pri">o</span>t<span className="pri">o</span>rad</h1>
                    <img src={dots} className="dots mb-4" alt="Dots" />
                    <Button text="Meet the team" />
                </div>
            </section>

            <section id="info">
                <h3>A Company with Million Dreams!</h3>
            </section>

            <section id="mission">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-7">
                            <img src={rect} className="img-fluid" alt="Rectangle" />
                        </div>
                        <div className="col-lg-5">
                            <h3>Our Mission</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                            <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="vision">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-5">
                            <h3>Our Vision</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                        </div>
                        <div className="col-lg-7">
                            <img src={rect} className="img-fluid" alt="Rectangle" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="team">
                <div className="container">
                    <h3 className="mb-5">Our Team</h3>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-3">
                            <img src={man} alt="Aditya Pathak" className="img-fluid" />
                            <h4>Tanuj Namdeo</h4>
                            <p>Creative designer</p>
                        </div>
                        <div className="col-lg-3">
                            <img src={man} alt="Aditya Pathak" className="img-fluid" />
                            <h4>Tanuj Namdeo</h4>
                            <p>Creative designer</p>
                        </div>
                        <div className="col-lg-3">
                            <img src={man} alt="Aditya Pathak" className="img-fluid" />
                            <h4>Tanuj Namdeo</h4>
                            <p>Creative designer</p>
                        </div>
                        <div className="col-lg-3">
                            <img src={man} alt="Aditya Pathak" className="img-fluid" />
                            <h4>Tanuj Namdeo</h4>
                            <p>Creative designer</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
