import React, {useContext, Fragment} from 'react'
import ContactContext from '../../context/contact/contactContext'
import ContactItem from './ContactItem'

const Contacts = () => {

    const contactContext = useContext(ContactContext);

    const {contacts} = contactContext;
    
    return (
        <div>
            {
                contacts.map(contact =>(
                    <ContactItem 
                    key={contact.id} 
                    contact={contact} 
                    /> 
                ))
            }
            
        </div>
    )
}

export default Contacts
