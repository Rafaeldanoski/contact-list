class Contact {
  id: string;
  name: string;
  email: string;
  telephone: string;
  nascimento: string;
  empresa: string;
  constructor(name: string, email: string, telephone: string, id: string, nascimento: string, empresa: string) {
    this.name = name;
    this.email = email;
    this.telephone = telephone;
    this.nascimento = nascimento;
    this.empresa = empresa;
    this.id = id;
  }
}

export default Contact;
