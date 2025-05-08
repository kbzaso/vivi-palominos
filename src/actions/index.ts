import { defineAction } from "astro:actions";
import { Resend } from "resend";
import confirmationEmail from "../emails/confirmationEmail";
import { render } from "@react-email/render";
import internalEmail from "../emails/internalEmail";
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  send: defineAction({
    accept: "form",
    handler: async (formData) => {
      const name = formData.get("firstName") + " " + formData.get("lastName");
      const phone = formData.get("phone")?.toString();
      const company = formData.get("company")?.toString();
      const email = formData.get("email")?.toString();
      const message = formData.get("message")?.toString();
      // Validate the data - you'll probably want to do more than this
      if (!name || !email || !phone) {
        return new Response(
          JSON.stringify({
            message: "Missing required fields",
          }),
          { status: 400 }
        );
      }
    
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
        name: name,
      });
    
      const html = await render(emailContent);
      const text = await render(emailContent, { plainText: true });
    
      // SEND EMAIL to the user
    
      const sendEmails = async () => {
        // Send the email to vivi
        await resend.emails.send({
          from: agentEmail,
          to: "msaez0360@gmail.com",
          subject: `Te contactó ${name} a través del formulario de la web`,
          html: htmlVivi,
          text: textVivi,
        });
    
        // Send the email to the user
        return await resend.emails.send({
          from: agentEmail,
          to: email.toString(),
          subject: "Gracias por tu mensaje – Te contactare pronto",
          html,
          text,
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
