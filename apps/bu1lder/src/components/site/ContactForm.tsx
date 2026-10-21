import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m as motion, AnimatePresence } from "framer-motion";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  company: z.string().trim().min(2, "Informe a empresa").max(100),
  role: z.string().trim().min(2, "Informe seu cargo").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(8, "Telefone inválido").max(30),
  challenge: z.string().trim().min(10, "Descreva o desafio").max(1000),
  volume: z.string().min(1, "Selecione uma opção"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    window.alert("Prévia de revisão: formulário ainda não conectado. Nenhum contato foi enviado.");
  };

  return (
    <div className="relative rounded-2xl glass p-6 md:p-8 overflow-hidden">
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-brand-violet/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-brand-cyan/20 blur-3xl rounded-full" />

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative text-center py-10"
          >
            <div className="size-14 rounded-full bg-brand-mint/15 grid place-items-center mx-auto mb-4 border border-brand-mint/30">
              <Check className="size-6 text-brand-mint" />
            </div>
            <h3 className="text-xl font-semibold">Recebemos seu contato.</h3>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              Em breve, um especialista da Miind vai falar com você.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="relative grid md:grid-cols-2 gap-4"
            noValidate
          >
            <Field label="Nome" error={errors.name?.message}>
              <Input {...register("name")} placeholder="Seu nome" />
            </Field>
            <Field label="Empresa" error={errors.company?.message}>
              <Input {...register("company")} placeholder="Nome da empresa" />
            </Field>
            <Field label="Cargo" error={errors.role?.message}>
              <Input {...register("role")} placeholder="Seu cargo" />
            </Field>
            <Field label="E-mail corporativo" error={errors.email?.message}>
              <Input type="email" {...register("email")} placeholder="voce@empresa.com" />
            </Field>
            <Field label="Telefone / WhatsApp" error={errors.phone?.message}>
              <Input {...register("phone")} placeholder="+55 (11) 9 0000-0000" />
            </Field>
            <Field label="Volume / colaboradores" error={errors.volume?.message}>
              <Select onValueChange={(v) => setValue("volume", v, { shouldValidate: true })} value={watch("volume")}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ate-100">Até 100 colaboradores</SelectItem>
                  <SelectItem value="100-500">100–500</SelectItem>
                  <SelectItem value="500-2000">500–2.000</SelectItem>
                  <SelectItem value="2000+">2.000+</SelectItem>
                  <SelectItem value="atendimentos">Alto volume de atendimentos</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <div className="md:col-span-2">
              <Field label="Principal desafio" error={errors.challenge?.message}>
                <Textarea
                  rows={4}
                  {...register("challenge")}
                  placeholder="Conte qual processo, jornada ou operação você quer transformar com IA."
                />
              </Field>
            </div>

            <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <p className="text-xs text-muted-foreground">
                Ao enviar, você concorda em ser contatado pela Miind. Tratamos
                seus dados conforme a LGPD.
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-brand-cyan to-brand-blue text-background hover:opacity-90 shadow-[0_10px_40px_-10px_oklch(0.82_0.14_210/0.6)]"
              >
                {isSubmitting ? "Enviando..." : (
                  <>Quero falar com a Miind <Send className="ml-1 size-4" /></>
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-[11px] text-destructive">{error}</p>}
    </div>
  );
}
