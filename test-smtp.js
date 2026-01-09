const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");

// Load .env
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config({ path: path.join(__dirname, ".env.local") });

async function testSMTP() {
    console.log("Config:", {
        host: process.env.SMTP_HOST || "smtp.ionos.com",
        port: process.env.SMTP_PORT || "587",
        secure: process.env.SMTP_SECURE === "true",
        user: process.env.SMTP_USER,
    });

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.ionos.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
        tls: {
            // IONOS sometimes needs this
            rejectUnauthorized: false,
        },
    });

    try {
        console.log("Verifying transporter...");
        await transporter.verify();
        console.log("✅ SMTP connection is verified!");

        console.log("Attempting to send test email...");
        const info = await transporter.sendMail({
            from: `"SMTP Test" <${process.env.SMTP_USER}>`,
            to: process.env.MERCHANT_EMAIL || process.env.SMTP_USER,
            subject: "SMTP Test from Amrit Milk",
            text: "This is a test email to verify SMTP configuration.",
        });
        console.log("✅ Email sent successfully:", info.messageId);
    } catch (error) {
        console.error("❌ SMTP Error:", error);
    }
}

testSMTP();
