import { describe, expect, test, vi } from "vitest";
import { createTransport } from "nodemailer";
import { render } from "@react-email/render";
import { sendEmail } from "@/lib/sendEmail";

vi.mock("@react-email/render", () => ({
	render: vi.fn(() => "<p>Mocked Email HTML</p>")
}));

vi.mock("nodemailer", () => ({
	createTransport: vi.fn().mockReturnValue({
		sendMail: vi.fn().mockResolvedValue({ messageId: "mocked-message-id" }),
		verify: vi.fn().mockResolvedValue(true)
	})
}));

describe("email", () => {
	test("send email with correct content", async () => {
		await sendEmail({
			name: "Test",
			email: "test@example.com",
			message: "This is a test to verify the email sending is working!"
		});

		expect(createTransport).toHaveBeenCalled();
		expect(render).toHaveBeenCalled();
		expect(createTransport().sendMail).toHaveBeenCalledWith(
			expect.objectContaining({
				from: expect.any(String),
				to: expect.any(String),
				subject: expect.stringContaining(
					"Message from Test - Dragoninventor Contact Form"
				),
				html: expect.stringContaining("<p>Mocked Email HTML</p>")
			})
		);
	});
});
