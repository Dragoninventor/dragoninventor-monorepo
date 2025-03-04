import { sendEmail } from "@/lib/sendEmail";

export async function POST(request: Request) {
	const res = await request.json();

	await sendEmail({
		name: res.name,
		email: res.email,
		message: res.message
	});

	return Response.json({ res });
}
