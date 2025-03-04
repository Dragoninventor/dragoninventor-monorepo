import {
	Body,
	Button,
	Container,
	Font,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Tailwind,
	Text,
} from "@react-email/components";

type EmailProps = {
	name: string;
	email: string;
	message: string;
};

export const ContactEmail = ({ name, email, message }: EmailProps) => {
	const messagePreview =
		message.length > 60 ? message.substring(0, 60 - 3) + "…" : message;

	// const subjectCharacterLimit = 36;
	// const replySubject = `Re: ${encodeURIComponent(
	// 	message.split(" ").reduce((acc, word) => {
	// 		return acc.length + word.length + 1 <= subjectCharacterLimit
	// 			? acc + " " + word
	// 			: acc;
	// 	}),
	// )}…`;

	const encodedMessage = encodeURIComponent(
		`<br><br><i>Your message sent to the Dragoninventor contact form: </i><blockquote>${message}</blockquote>`,
	).replace(/%0A/g, "<br>");

	return (
		<Html lang="en-us">
			<Head>
				<title>{messagePreview}</title>
				<Font
					fontFamily="Open Sans"
					fallbackFontFamily="Verdana"
					webFont={{
						url: "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap",
						format: "woff2",
					}}
					fontWeight={400}
					fontStyle="normal"
				/>
			</Head>
			<Preview>{messagePreview}</Preview>
			<Tailwind>
				<Body className={"p-2.5"}>
					<Container
						className={
							"flex flex-col gap-2.5 rounded bg-slate-100 px-5 pb-12 pt-8 shadow-md"
						}
					>
						<Heading
							as={"h1"}
							className={"text-xl text-indigo-950"}
						>
							{name} sent you a message
						</Heading>
						<Heading
							as={"h2"}
							className={"mb-7 text-sm text-indigo-500"}
						>
							Dragoninventor Contact Form
						</Heading>
						<Hr className={"border-2 border-indigo-100"} />
						<Text className={"text-slate-900"}>
							<span
								className={
									"mr-2 rounded bg-indigo-100 px-2.5 py-1 text-slate-600"
								}
							>
								Name:
							</span>{" "}
							{name}
						</Text>
						<Text className={"text-slate-900"}>
							<span
								className={
									"mr-2 rounded bg-indigo-100 px-2.5 py-1 text-slate-600"
								}
							>
								Email:
							</span>{" "}
							{email}
						</Text>
						<Hr className={"border-2 border-indigo-100"} />
						<Text
							className={
								"my-5 whitespace-pre-line leading-5 text-slate-900"
							}
						>
							{message}
						</Text>
						<Button
							className={
								"cursor-pointer rounded bg-indigo-500 px-4 py-2.5 text-blue-50"
							}
							href={`mailto:${email}?body=${encodedMessage}`}
						>
							Reply
						</Button>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};
