export type CategorieContact = "commercial" | "technique" | "partenariat" | "autre";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  category: CategorieContact;
  body: string;
}
