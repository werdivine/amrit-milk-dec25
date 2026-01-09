import nodemailer from "nodemailer";

async function testSMTP() {
    const config = {
        host: process.env.SMTP_HOST || "smtp.ionos.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    };

    console.log("Testing SMTP with config (excluding password):", {
        host: config.host,
        port: config.port,
        secure: config.secure,
        user: config.auth.user,
    });

    const transporter = nodemailer.createTransport(config);

    try {
        console.log("Verifying connection...");
        await transporter.verify();
        console.log("✅ SMTP connection is active!");

        const merchantEmail = process.env.MERCHANT_EMAIL || config.auth.user;
        console.log(`Sending test email to: ${merchantEmail}`);

        const info = await transporter.sendMail({
            from: `"Amrit Milk Test" <${config.auth.user}>`,
            to: merchantEmail,
            subject: "Emergency SMTP Test",
            text: "SMTP is working correctly from the server environment.",
            html: "<b>SMTP is working correctly</b> from the server environment.",
        });

        console.log("✅ Message sent: %s", info.messageId);
    } catch (error) {
        console.error("❌ SMTP Error details:");
        console.error(error);
    }
}

testSMTP();
