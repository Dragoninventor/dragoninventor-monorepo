import ContactForm from "@/components/contactForm";
import { CardContent } from "@dragoninventor/ui";

const Contact = () => {
	return (
		<CardContent className={"w-full"}>
			<h1 className={"mb-2.5 text-center"}>Contact</h1>
			<ContactForm />
		</CardContent>
	);
};

export default Contact;
