import { InputHTMLAttributes } from "react";

type FormInputProps = {
	id: string;
	label: string;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

const FormInput = ({ id, label, ...props }: FormInputProps) => {
	switch (props?.type) {
		case "textarea":
			return (
				<div className="flex w-full flex-col gap-1">
					<label htmlFor={id}>{label}</label>
					<textarea
						id={id}
						rows={5}
						className={
							"rounded-sm border border-gray-300 bg-gray-50 px-2 py-2.5"
						}
						{...props}
					></textarea>
				</div>
			);
		default:
			return (
				<div className="flex w-full flex-col gap-1">
					<label htmlFor={id}>{label}</label>
					<input
						id={id}
						className={
							"rounded-sm border border-gray-300 bg-gray-50 px-2 py-2.5"
						}
						{...props}
					/>
				</div>
			);
	}
};

export default FormInput;
