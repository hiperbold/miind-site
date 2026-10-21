// Shared contact constants — change in one place.
export const CONTACT_EMAIL = 'contato@miind.com.br';
export const CONTACT_PHONE_E164 = '+5551981652778';
export const CONTACT_PHONE_DISPLAY = '+55 51 98165-2778';
export const WHATSAPP_NUMBER = '5551981652778';

export const buildWhatsAppUrl = (message: string) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;

export const WHATSAPP_DEFAULT = buildWhatsAppUrl(
  'Olá! Quero agendar uma conversa estratégica com a MIIND.',
);

export const WHATSAPP_GRAMADO = buildWhatsAppUrl(
  'Olá! Estou no Gramado Summit e quero agendar a consultoria gratuita com a MIIND.',
);
