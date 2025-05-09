import { useState } from "react";
import type { FormEvent } from "react";
import { actions } from "astro:actions";

export default function ContactForm() {
  const [responseMessage, setResponseMessage] = useState({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await actions.send(formData);
    console.log(result);

    if (result.data) {
      setResponseMessage({
        message: "Gracias por tu mensaje, te responderé pronto",
      });
    } else if (result.error) {
      setResponseMessage(result.error.fields);
    }
  };
  return (
    <>
    {responseMessage.message ? (
      <div className="mt-4 text-green-500 fill-green-500 flex flex-col justify-center items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-icon lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
        <p className="text-xl font-bold text-center max-w-sm">
          {responseMessage.message}
        </p>
      </div>
    ) : (
        <form
      id="form"
      method="POST"
      className="mx-auto md:max-w-xl"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm/6 font-semibold text-gray-500"
          >
            Nombre
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="firstName"
              id="firstName"
              autoComplete="given-name"
              required
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 global-focus"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm/6 font-semibold text-gray-500"
          >
            Apellido
          </label>
          <div className="mt-2.5">
            <input
              required
              type="text"
              name="lastName"
              id="lastName"
              autoComplete="family-name"
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 global-focus"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="company"
            className="block text-sm/6 font-semibold text-gray-500"
          >
            Empresa
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="company"
              id="company"
              autoComplete="organization"
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 global-focus"
            />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="email"
            className="block text-sm/6 font-semibold text-gray-500"
          >
            Email
          </label>
          <div className="mt-2.5">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              aria-describedby={responseMessage ? "email-error" : undefined}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 global-focus"
            />
          </div>
          {responseMessage.email && (
            <div className="mt-4">
              <p id="email-error" className="text-sm text-red-500 flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                {responseMessage.email[0]}
              </p>
            </div>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="phone"
            className="block text-sm/6 font-semibold text-gray-500"
          >
            Teléfono
          </label>
          <div className="mt-2.5">
            <input
              type="tel"
              name="phone"
              id="phone"
              autoComplete="phone"
              required
              aria-describedby={responseMessage ? "phone-error" : undefined}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 global-focus"
            />
          </div>
            {responseMessage.phone && (
                <div className="mt-4">
                <p id="phone-error" className="text-sm text-red-500 flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                    {responseMessage.phone[0]}
                </p>
                </div>
            )}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm/6 font-semibold text-gray-500"
          >
            Cuentame que tienes en mente
          </label>
          <div className="mt-2.5">
            <textarea
              name="message"
              id="message"
              rows={4}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 global-focus"
            ></textarea>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <button type="submit" className="global-button w-full global-focus">
          Enviar
        </button>
      </div>
    </form>
    )}
    </>
  );
}
