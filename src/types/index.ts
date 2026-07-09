export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  category: "commercial" | "technique" | "partenariat" | "autre";
  body: string;
  date: string;
  read: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  category: Message["category"];
  body: string;
}
