import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  const data = await request.json();

  const transporter = nodemailer.createTransport({
    host: "mail.brandingemocion.net",
    port: 465,
    secure: true,
    auth: {
      user: "notificacion@brandingemocion.net",
      pass: "noti@2024",
    },
  });

  // Mapeo dinámico de las filas de la tabla
  const generateTableRows = (data) =>
    Object.entries(data)
      .map(
        ([key, value]) => `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background-color: #f2f2f2;"><strong>${key}:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${value}</td>
        </tr>
      `
      )
      .join(""); // Join para unir todas las filas en un solo string

  const mailOptions = {
    from: '"Contacto de Alva Negocios Inmobiliarios" <notificacion@brandingemocion.net>', // El remitente del correo
    to: `katya@alvainmobiliarios.com`, // Enviar a la empresa y al cliente
    subject: ` Formulario de Contacto de Alva Negocios Inmobiliarios`, // Asunto del correo
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #4CAF50; text-align: center;">Formulario de Contacto</h2>
        <p style="text-align: center; color: #333;">
          Hemos recibido su una solicitud de contacto. A continuación, los detalles de su solicitud:
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          ${generateTableRows(
            data
          )}  <!-- Aquí se insertan las filas generadas -->
        </table>
        <p style="text-align: center; color: #555; margin-top: 20px;">
          Nos pondremos en contacto con usted en un plazo máximo de 48 horas para resolver su queja.
        </p>
        <p style="text-align: center; color: #999; font-size: 12px;">
          Este es un correo generado automáticamente. Por favor, no responda a este mensaje.
        </p>
      </div>
    `,
  };

  console.log("mailOptions", mailOptions);

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Mensaje enviado con éxito" });
  } catch (error) {
    console.log("error", error);

    return NextResponse.json(
      { message: "Error al enviar el reclamo", error },
      { status: 500 }
    );
  }
}
