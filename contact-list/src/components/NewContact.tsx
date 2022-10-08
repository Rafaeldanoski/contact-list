import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addContact, updateContact } from "../app/contactSlice";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { BsFillCursorFill } from "react-icons/bs";

type ContactFormData = {
  name: string;
  email: string;
  telephone: string;
  nascimento: string;
  empresa: string;
};
const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    telephone: yup.string().required(),
    nascimento: yup.string().required(),
    empresa: yup.string().required()
  })
  .required();

interface NewContactProps {
  id: string;
}
const NewContact: React.FC<NewContactProps> = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
  });
  console.log(id);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const contactData = useAppSelector((state) =>
    state.contact.contactList.find((contact) => contact.id === id)
  );

  setValue("name", contactData?.name || "");
  setValue("email", contactData?.email || "");
  setValue("telephone", contactData?.telephone || "");
  setValue("nascimento", contactData?.nascimento || "");
  setValue("empresa", contactData?.empresa || "");

  const onSubmit = (data: ContactFormData) => {
    const { name, email, telephone, nascimento, empresa } = data;

    if (id) {
      editContact(name, email, telephone, nascimento, empresa);
      return;
    }
    dispatch(addContact({ name, email, telephone, id: uuidv4(), nascimento, empresa}));
    history.push("/");
  };

  const editContact = (name: string, email: string, telephone: string, nascimento: string, empresa: string) => {
    dispatch(updateContact({ name, email, telephone, nascimento, empresa, id}));
    history.push("/");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white  p-4 px-4 text-sm ">
        <div className="md:col-span-5">
          <label htmlFor="full_name" className="text-left">
            Nome
          </label>

          <input
            type="text"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            placeholder="Full Name"
            {...register("name")}
          />
          <p className="mt-2 text-sm text-red-600">{errors.name?.message}</p>
        </div>

        <div className="mt-3">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            placeholder="email@domain.com"
            {...register("email")}
          />
          <p className="mt-2 text-sm text-red-600">{errors.email?.message}</p>
        </div>

        <div className="mt-3">
          <label htmlFor="nascimento">Nascimento</label>
          <input
            type="text"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            placeholder="01/01/2022"
            {...register("nascimento")}
          />
          <p className="mt-2 text-sm text-red-600">{errors.email?.message}</p>
        </div>

        <div className="mt-3">
          <label htmlFor="empresa">Empresa</label>
          <input
            type="text"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            placeholder="lasalle"
            {...register("empresa")}
          />
          <p className="mt-2 text-sm text-red-600">{errors.email?.message}</p>
        </div>

        <div className="mt-3">
          <label htmlFor="email">Telefone</label>
          <input
            type="text"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            placeholder="999999999"
            {...register("telephone")}
          />
          <p className="mt-2 text-sm text-red-600">
            {errors.telephone?.message}
          </p>
        </div>

        <div className="mt-3 text-right">
          <div className="inline-flex items-end">
            <button
              type="submit"
              className="flex items-center bg-indigo-600 text-white hover:bg-purple-500 p-2 rounded text-sm w-auto"
              
            >
              <BsFillCursorFill />
              <span>&nbsp;Editar</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewContact;
