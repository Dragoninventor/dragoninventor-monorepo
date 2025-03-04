"use client";

import { ChangeEvent, FormEvent, ReactNode, useState } from "react";

import FormInput from "@/components/contactForm/formInput";
import { validate } from "email-validator";

type Form = {
	name: string;
	email: string;
	message: string;
};
type FormStatus = "default" | "loading" | "sent" | "failed" | "invalidInputs";

const ContactForm = () => {
	const [form, setForm] = useState<Form>({
		name: "",
		email: "",
		message: "",
	});
	const [formStatus, setFormStatus] = useState<FormStatus>("default");
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = event.target;

		setForm((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: "" }));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const newErrors: Record<string, string> = {};
		if (!form.name) {
			newErrors.name = "Name is required";
		}
		if (!form.email) {
			newErrors.email = "Email is required";
		} else if (!validate(form.email)) {
			newErrors.email = "Please enter a valid email address";
		}
		if (!form.message) {
			newErrors.message = "Message is required";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
		} else {
			await sendEmail();
			setErrors({});
		}
	};

	const sendEmail = async () => {
		setFormStatus("loading");

		const response = await fetch("/api/sendEmail", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: form.name,
				email: form.email,
				message: form.message,
			}),
		});

		if (response.ok) {
			console.log(response);
			setFormStatus("sent");
		} else {
			setFormStatus("failed");
		}
	};

	const InvalidInputMessage = ({ children }: { children: ReactNode }) => {
		return (
			<span role={"alert"} className={"text-sm text-gray-600"}>
				{children}
			</span>
		);
	};

	if (formStatus === "sent") {
		return (
			<div>
				<h2 className={"mb-2.5 text-center"}>
					Message Sent Successfully!
				</h2>
				<p>
					Thank you for reaching out. Your message has been
					successfully sent and I appreciate your interest. I&apos;ll
					get back to you shortly!
				</p>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className={"flex flex-col gap-4"}>
			{formStatus === "failed" && (
				<span role={"alert"}>
					There was an error sending your message. It&apos;s not you,
					it&apos;s me. Please try again another time.
				</span>
			)}
			<div className={"w-full"}>
				{errors.name && (
					<InvalidInputMessage>{errors.name}</InvalidInputMessage>
				)}
				<FormInput
					id={"fullName"}
					label={"Full Name"}
					placeholder={"Your full name"}
					autoFocus={true}
					value={form.name}
					name={"name"}
					onChange={handleChange}
				/>
			</div>
			<div className={"w-full"}>
				{errors.email && (
					<InvalidInputMessage>{errors.email}</InvalidInputMessage>
				)}
				<FormInput
					id={"email"}
					label={"Email"}
					placeholder={"Your email address"}
					value={form.email}
					name={"email"}
					onChange={handleChange}
				/>
			</div>
			<div className={"w-full"}>
				{errors.message && (
					<InvalidInputMessage>{errors.message}</InvalidInputMessage>
				)}
				<FormInput
					type={"textarea"}
					id={"message"}
					label={"Message"}
					placeholder={"Your message"}
					value={form.message}
					name={"message"}
					onChange={handleChange}
				/>
			</div>
			<button
				type={"submit"}
				className={
					"flex w-full cursor-pointer items-center justify-center rounded border border-indigo-400 bg-indigo-100 px-5 py-2.5 text-indigo-600 duration-200"
				}
			>
				Submit
				<div
					className={`relative transition-all duration-200 ease-out ${
						formStatus === "loading"
							? "w-7 opacity-100"
							: "w-0 opacity-0"
					}`}
				>
					<div className={"relative ml-3"}>
						<div
							className={
								"h-4 w-4 rounded-full border border-indigo-200"
							}
						/>
						<div
							className={
								"absolute top-0 left-0 h-4 w-4 animate-spin rounded-full border-t border-indigo-600"
							}
						/>
					</div>
				</div>
			</button>
		</form>
	);
};

export default ContactForm;
