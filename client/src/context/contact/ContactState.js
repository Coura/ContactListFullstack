import React, { useReducer } from 'react'
import {v4 as uuid} from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
} from '../types'
import contactContext from './contactContext'

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                "type": "personal",
                "id": 1,
                "name": "Harry Potter",
                "email": "expelliarmus@mail.com",
                "phone": "69hedwig69"
                
            },
            {
                "type": "professional",
                "id": 2,
                "name": "Captain Nourriture",
                "email": "rui@mail.com",
                "phone": "987-654-321"
               
            },
            {
                "type": "professional",
                "id": 3,
                "name": "Marisa Andrade",
                "email": "marisa@mail.com",
                "phone": "123456789",
            }
        ],
        current : null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState)

    //add contact
    const addContact = contact => {
        contact.id = uuid();
        dispatch({type: ADD_CONTACT, payload:contact})
    }

    //delete contact
    const deleteContact = id => {
        dispatch({type: DELETE_CONTACT, payload:id})
    }

    //set current contact
    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload:contact})
    }

    //clear current contact
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT})
    }

    //update contact
    const updateContact = contact => {
        dispatch({type: UPDATE_CONTACT, payload:contact})
    }

    //filter contact

    //clear contact


    return (
        <contactContext.Provider
        value={{
            contacts:state.contacts,
            current:state.current,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
        }}
        >{props.children}
        </contactContext.Provider>
    )
};

export default ContactState

