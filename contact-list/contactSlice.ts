import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import Contact from "../model/Contact";
import { v4 as uuidv4 } from "uuid";

type initialStateType = {
  contactList: Contact[];
};

const contactList: Contact[] = [
  {
    id: uuidv4(),
    name: "Chrystopher",
    email: "chrystopher@gmail.com",
    telephone: "123456789",
    nascimento: "01/01/1900",
    empresa: "lasalle"
  },
  {
    id: uuidv4(),
    name: "Leonardo",
    email: "leonardo@gmail.com",
    telephone: "123456789",
    nascimento: "01/01/1900",
    empresa: "lasalle"
  },
  {
    id: uuidv4(),
    name: "Luis",
    email: "luis@gmail.com",
    telephone: "123456789",
    nascimento: "01/01/1900",
    empresa: "lasalle"
  },
  {
    id: uuidv4(),
    name: "Maurício",
    email: "mau@hotmail.com",
    telephone: "123456789",
    nascimento: "01/01/1900",
    empresa: "lasalle"
  },
  {
    id: uuidv4(),
    name: "Pedro",
    email: "pedro@gmail.com",
    telephone: "123456789",
    nascimento: "01/01/1900",
    empresa: "lasalle"
  },
  {
    id: uuidv4(),
    name: "Rafa",
    email: "rafa@gmail.com",
    telephone: "123456789",
    nascimento: "30/06/1996",
    empresa: "lasalle"
  },
  {
    id: uuidv4(),
    name: "Rafael",
    email: "rafael@gmail.com",
    telephone: "123456789",
    nascimento: "30/06/1996",
    empresa: "lasalle"
  },
  {
    id: uuidv4(),
    name: "Rafael Danoski",
    email: "rafaeldanoski@gmail.com",
    telephone: "123456789",
    nascimento: "30/06/1996",
    empresa: "lasalle"
  },
  {
    id: uuidv4(),
    name: "Thaynara",
    email: "thaynara@hotmail.com",
    telephone: "123456789",
    nascimento: "01/01/1900",
    empresa: "lasalle"
  },
  {
    id: uuidv4(),
    name: "Vanessa",
    email: "vanessa@gmail.com",
    telephone: "123456789",
    nascimento: "01/01/1900",
    empresa: "lasalle"
  } 
];

const initialState: initialStateType = {
  contactList,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contactList.push(action.payload);
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const {
        payload: { id, name, email, telephone, nascimento, empresa },
      } = action;

      state.contactList = state.contactList.map((contact) =>
        contact.id === id ? { ...contact, name, email, telephone, nascimento, empresa } : contact
      );
    },
    removeContact: (state, action: PayloadAction<{ id: string }>) => {
      state.contactList = state.contactList.filter(
        (contact) => contact.id !== action.payload.id
      );
    },
  },
});

export const { addContact, updateContact, removeContact } =
  contactSlice.actions;
export const getContactList = (state: RootState) => state.contact.contactList;

export default contactSlice.reducer;
