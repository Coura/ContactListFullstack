import React from 'react'
import Contacts from '../contacts/Contact'
import ContactForm from '../contacts/ContactForm'

const Home = () => {
    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>

            <div>
                <Contacts />
            </div>
            
        </div>
    )
}

export default Home
