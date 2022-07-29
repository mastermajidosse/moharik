import emailjs from "@emailjs/browser";

interface SendEmailProps {
  form: string | HTMLFormElement;
}

export async function sendEmail({ form }: SendEmailProps) {
  const { status, text } = await emailjs.sendForm(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "SERVICE_ID",
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "TEMPLATE_ID",
    form,
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "PUBLIC_KEY"
  );
  console.log(status);
  console.log(text);
}
