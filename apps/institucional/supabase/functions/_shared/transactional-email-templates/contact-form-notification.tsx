import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Miind"

interface ContactFormProps {
  name?: string
  email?: string
  message?: string
}

const ContactFormNotificationEmail = ({ name, email, message }: ContactFormProps) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Nova mensagem de contato de {name || 'visitante'} via {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerSection}>
          <Heading style={h1}>Nova Mensagem de Contato</Heading>
        </Section>
        <Hr style={hr} />
        <Section style={contentSection}>
          <Text style={label}>Nome</Text>
          <Text style={value}>{name || 'Não informado'}</Text>

          <Text style={label}>Email</Text>
          <Text style={value}>{email || 'Não informado'}</Text>

          <Text style={label}>Mensagem</Text>
          <Text style={messageText}>{message || 'Sem mensagem'}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          Esta mensagem foi enviada pelo formulário de contato do site {SITE_NAME}.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactFormNotificationEmail,
  subject: (data: Record<string, any>) => `Novo contato via site - ${data.name || 'Visitante'}`,
  displayName: 'Contact form notification',
  previewData: { name: 'João Silva', email: 'joao@exemplo.com', message: 'Gostaria de saber mais sobre os serviços da Miind.' },
  to: 'contato@miind.com.br',
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '30px 25px', maxWidth: '580px', margin: '0 auto' }
const headerSection = { padding: '0 0 10px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#2563eb', margin: '0 0 5px' }
const hr = { borderColor: '#e5e7eb', margin: '20px 0' }
const contentSection = { padding: '0' }
const label = { fontSize: '12px', fontWeight: '600' as const, color: '#7c3aed', textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '0 0 4px' }
const value = { fontSize: '15px', color: '#1f2937', margin: '0 0 18px', lineHeight: '1.4' }
const messageText = { fontSize: '15px', color: '#1f2937', margin: '0 0 18px', lineHeight: '1.6', whiteSpace: 'pre-wrap' as const, backgroundColor: '#f9fafb', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e5e7eb' }
const footer = { fontSize: '12px', color: '#9ca3af', margin: '0', textAlign: 'center' as const }
