import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const gmailUser = process.env.EMAIL_USER?.trim();
    const gmailPass = process.env.EMAIL_PASS?.replace(/\s/g, "");

    if (!gmailUser || !gmailPass || gmailPass === "your_gmail_app_password") {
      return NextResponse.json(
        {
          error: "Email chưa được cấu hình. Hãy thêm Gmail App Password vào .env.local rồi khởi động lại server.",
        },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    await transporter.sendMail({
      from: gmailUser,
      to: "dangquyen18122005@gmail.com",
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h3>New portfolio message</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);

    if (error instanceof Error && "code" in error && (error as any).code === "EAUTH") {
      return NextResponse.json(
        {
          error: "Gmail từ chối đăng nhập. Hãy dùng App Password 16 ký tự, không dùng mật khẩu Gmail thông thường.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
