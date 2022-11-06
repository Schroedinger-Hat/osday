import Image from "next/image";

export default function Main() {
    return (
        <div className="container">
            <div className="title-box">
                <h1>Schrödinger Hat <span>Originals</span></h1>
                <h2>Open Source Day 2023</h2>
                <ul>
                    <li>March 2023</li>
                    <li>Florence, Italy</li>
                    <li>10h 20min</li>
                    <li>Conference</li>
                </ul>
                <p>We are coming back with a new edition of the Open Source Day conference. In this season we are going to smash everything.</p>
                <p><i>Starring</i>: the best companies and the best professionals in the sector and in open source projects</p>
                <br />
                <a href="https://sessionize.com/opensourceday23" target="_blank" className="button" rel="noreferrer">Call for Papers</a>
                <a href="mailto:osday@schrodinger-hat.it" target="_blank" className="button" rel="noreferrer">Send us an email</a>
            </div>
            <div className="image">
                <Image className='img' alt='background' fill={true} src="/bg.jpg" />
            </div>
            <section className="talks_2021">
                <h2>Take a look at the first edition</h2>
                <div className="talks_container">
                <div className="talk_card riva">
                    <p>Zero effort, high performances and secure GraphQL APIs with Hasura</p>
                </div>
                <div className="talk_card bartolesi">
                    <p>How to create awesome VSCode extensions</p>
                </div>
                <div className="talk_card">
                    <p>Project Kerberus for self-service resource provisioning and managament</p>
                </div>
                <div className="talk_card">
                    <p>Contribute to Open Source: the right way</p>
                </div>
                <div className="talk_card">
                    <p>3D e Argumented Reality with google model-viewer</p>
                </div>
                </div>
            </section>
        </div>
    )
}