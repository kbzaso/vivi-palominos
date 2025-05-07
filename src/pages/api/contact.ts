export const prerender = false; // Not needed in 'server' mode
import type { APIRoute } from "astro";
import { Resend } from "resend";
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("first-name") + " " + formData.get("last-name");
  const phone = formData.get("phone");
  const company = formData.get("company");
  const email = formData.get("email");
  const message = formData.get("message");
  // Validate the data - you'll probably want to do more than this
  if (!name || !email || !phone) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }

  // SEND EMAIL

  const { data, error } = await resend.emails.send({
    from: "vivi@vivipalominos.com",
    to: email.toString(),
    subject: "Gracias por tu mensaje – Te contactare pronto",
    text: `You have a new message from ${name} (${phone}, ${company}): ${message}`,
  });
  if (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to send email",
        error,
      }),
      { status: 500 }
    );
  }
  return new Response(
    JSON.stringify({
      message: "Email sent successfully",
      data,
    }),
    { status: 200 }
  );
};