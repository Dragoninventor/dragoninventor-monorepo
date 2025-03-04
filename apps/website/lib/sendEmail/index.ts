import { createTransport } from "nodemailer";
import { render } from "@react-email/render";
import { ContactEmail } from "@/components/contactEmail";
import { MailOptions } from "nodemailer/lib/sendmail-transport";

export const sendEmail = async ({
									name,
									email,
									message
								}: {
	name: string;
	email: string;
	message: string;
}) => {
	const transporter = createTransport({
		host: process.env.SMTP_SERVER,
		port: Number(process.env.SMTP_PORT) || 0,
		secure: false,
		auth: {
			user: process.env.SMTP_USERNAME,
			pass: process.env.SMTP_TOKEN
		},
		logger: true,
		tls: {
			rejectUnauthorized: false
		}
	});

	const emailHtml = await render(
		ContactEmail({ name: name, email: email, message: message })
	);

	const mailOptions: MailOptions = {
		from: process.env.EMAIL,
		to: process.env.EMAIL,
		subject: `Message from ${name} - Dragoninventor Contact Form`,
		html: emailHtml
	};

	transporter.verify(function(error, success) {
		if (error) {
			console.log(`Server error: ${error}`);
		} else {
			console.log("Server is ready to take our messages");
		}
	});

	return transporter.sendMail(mailOptions);
};
