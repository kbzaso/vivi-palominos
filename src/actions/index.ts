import { defineAction } from "astro:actions";
import { Resend } from "resend";
import confirmationEmail from "../emails/confirmationEmail";
import { render } from "@react-email/render";
import internalEmail from "../emails/internalEmail";
import { z } from "astro/zod";
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  send: defineAction({
    accept: "form",
    input: z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email({ message: "Email no valido" }),
      phone: z.string().refine((phone) => /^[0-9+]{11,15}$/.test(phone), {
        message: "Telefono no valido, debes incluir el código de país",
      }),
      company: z.string().optional(),
      message: z.string().optional(),
    }),
    handler: async ({
      firstName,
      lastName,
      email,
      phone,
      company,
      message,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      company?: string;
      message?: string;
    }) => {
      const name = firstName + " " + lastName;
      const agentEmail = "vivi@vivipalominos.com";

      // Create email to vivi
      const emailContentVivi = internalEmail({
        name: name,
        company: company,
        phone: phone,
        email: email,
        message: message,
      });
      const htmlVivi = await render(emailContentVivi);
      const textVivi = await render(emailContentVivi, { plainText: true });

      // Create the email TO THE USER
      const emailContent = confirmationEmail({
        name: firstName + " " + lastName,
      });

      const html = await render(emailContent);
      const text = await render(emailContent, { plainText: true });

      // SEND EMAIL to the user

      const sendEmails = async () => {
        // Send the email to the user
        await resend.emails.send({
          from: agentEmail,
          to: email.toString(),
          subject: "Gracias por tu mensaje – Te contactare pronto",
          html,
          text,
        });

        // Send the email to vivi
        return await resend.emails.send({
          from: agentEmail,
          to: agentEmail,
          subject: `Te contactó ${name} a través del formulario de la web`,
          html: htmlVivi,
          text: textVivi,
        });
      };

      const { data, error } = await sendEmails();

      if (error) {
        throw error;
      }

      return data;
    },
  }),
};
