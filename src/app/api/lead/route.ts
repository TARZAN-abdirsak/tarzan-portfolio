import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Email recipient (business owner)
const BUSINESS_EMAIL = "abukarabdirsak@tarzan.software";

interface LeadRequest {
    name: string;
    email: string;
    conversation: { role: string; content: string }[];
}

export async function POST(req: Request) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return NextResponse.json(
            { error: "Server misconfigured: RESEND_API_KEY missing" },
            { status: 500 }
        );
    }
    const resend = new Resend(apiKey);
    try {
        const body: LeadRequest = await req.json();
        const { name, email, conversation } = body;

        // Validate required fields
        if (!name || !email) {
            return NextResponse.json(
                { error: "Name and email are required" },
                { status: 400 }
            );
        }

        // Format conversation summary
        const conversationSummary = conversation
            .filter(m => m.content && !m.content.includes("[SHOW_FORM]"))
            .map(m => `${m.role === 'user' ? '👤 Customer' : '🤖 AI'}: ${m.content}`)
            .join('\n\n');

        // Log the lead
        console.log("═══════════════════════════════════════════════════");
        console.log("🎯 NEW LEAD RECEIVED!");
        console.log("═══════════════════════════════════════════════════");
        console.log(`📧 Name: ${name}`);
        console.log(`📧 Email: ${email}`);
        console.log("───────────────────────────────────────────────────");
        console.log("💬 Conversation:");
        console.log(conversationSummary);
        console.log("═══════════════════════════════════════════════════");

        // Send real emails via Resend (Parallel)
        try {
            await Promise.all([
                // 1. Email to Business Owner (You) - Notification
                resend.emails.send({
                    from: 'ZAY-G Leads <no-reply@tarzan.software>',
                    to: BUSINESS_EMAIL,
                    subject: `🎯 New Lead: ${name}`,
                    html: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <style>
                                body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; }
                                .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                                .header { background-color: #000000; padding: 40px 30px; text-align: center; }
                                .content { padding: 40px 30px; color: #333333; }
                                .details-box { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-top: 20px; }
                                .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
                                .detail-row:last-child { border-bottom: none; }
                                .label { font-weight: 600; color: #6b7280; }
                                .value { font-weight: 500; color: #111827; }
                                .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">New Lead Received</h1>
                                    <p style="color: #a1a1aa; margin: 8px 0 0; font-size: 14px;">Potential Client from Portfolio</p>
                                </div>
                                <div class="content">
                                    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                                        Someone just requested a free consultation via your website. Here are the details:
                                    </p>
                                    
                                    <div class="details-box">
                                        <div class="detail-row">
                                            <span class="label">Name</span>
                                            <span class="value">${name}</span>
                                        </div>
                                        <div class="detail-row">
                                            <span class="label">Email</span>
                                            <span class="value"><a href="mailto:${email}" style="color: #000; text-decoration: none; border-bottom: 1px solid #ccc;">${email}</a></span>
                                        </div>
                                    </div>

                                    ${conversationSummary ? `
                                    <div style="margin-top: 30px;">
                                        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; margin-bottom: 12px;">Conversation Context</h3>
                                        <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; font-size: 13px; line-height: 1.6; color: #4b5563; white-space: pre-wrap;">${conversationSummary}</div>
                                    </div>
                                    ` : ''}
                                </div>
                                <div class="footer">
                                    © ${new Date().getFullYear()} ZAY-G Portfolio System
                                </div>
                            </div>
                        </body>
                        </html>
                    `,
                }),

                // 2. Email to the User (Auto-Reply) - Thank You Card Style
                resend.emails.send({
                    from: 'Tarzan <info@tarzan.software>',
                    replyTo: BUSINESS_EMAIL,
                    to: email,
                    subject: `Thanks for reaching out, ${name}!`,
                    html: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <style>
                                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;500&display=swap');
                                body { margin: 0; padding: 0; background-color: #F2EFE9; width: 100%; }
                                .wrapper { width: 100%; table-layout: fixed; background-color: #F2EFE9; padding-bottom: 60px; }
                                .content-block { max-width: 600px; margin: 0 auto; background-color: #F2EFE9; border: 1px solid #e6e2d8; padding: 40px; text-align: center; color: #1a1a1a; }
                                .title { font-family: 'Playfair Display', 'Times New Roman', serif; font-size: 64px; margin: 40px 0 0; line-height: 0.9; font-weight: 400; letter-spacing: -2px; color: #000; text-transform: uppercase; }
                                .subtitle { font-family: 'Montserrat', sans-serif; font-size: 14px; letter-spacing: 4px; text-transform: uppercase; margin: 20px 0 40px; color: #333; display: flex; justify-content: space-between; align-items: center; }
                                .subtitle span { flex: 1; }
                                .divider { display: flex; align-items: center; justify-content: center; margin: 30px 0; color: #666; }
                                .divider-line { height: 1px; background-color: #999; width: 100px; margin: 0 15px; }
                                .diamond { font-size: 18px; color: #000; }
                                .message { font-family: 'Montserrat', sans-serif; font-size: 14px; line-height: 1.8; color: #333; max-width: 80%; margin: 0 auto; text-align: center; font-weight: 400; }
                                .footer-logo { font-family: 'Playfair Display', serif; font-size: 20px; letter-spacing: 2px; text-transform: uppercase; margin-top: 60px; color: #000; }
                                .website { font-family: 'Montserrat', sans-serif; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 10px; color: #666; }
                            </style>
                        </head>
                        <body style="background-color: #F2EFE9;">
                            <center class="wrapper">
                                <table class="content-block" width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                        <td>
                                            <!-- Main Title -->
                                            <h1 class="title">THANK YOU</h1>
                                            
                                            <div class="subtitle">
                                                <span>FOR</span>
                                                <span style="margin: 0 10px;">CHOOSING</span>
                                                <span>US</span>
                                            </div>

                                            <div class="divider">
                                                <div class="divider-line"></div>
                                                <div class="diamond">✦</div>
                                                <div class="divider-line"></div>
                                            </div>

                                            <div class="message">
                                                <p>Hi ${name},</p>
                                                <p>
                                                    Thank you so much for reaching out! I am thrilled to connect with you and genuinely appreciate your interest in building smarter business systems.
                                                </p>
                                                <p>
                                                    I review every inquiry personally and will get back to you within 24 hours to schedule our strategy call. If there's anything specifically on your mind, feel free to reply directly to this email.
                                                </p>
                                            </div>

                                            <div class="divider">
                                                <div class="divider-line"></div>
                                                <div class="diamond">✦</div>
                                                <div class="divider-line"></div>
                                            </div>

                                            <div class="footer-logo">TARZAN SOFTWARE</div>
                                            <div class="website">WWW.TARZAN.SOFTWARE</div>
                                        </td>
                                    </tr>
                                </table>
                            </center>
                        </body>
                        </html>
                    `,
                })
            ]);

            console.log("✅ Emails sent successfully!");
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
        }

        return NextResponse.json({
            success: true,
            message: "Lead received successfully"
        });

    } catch (error) {
        console.error("Lead API Error:", error);
        return NextResponse.json(
            { error: "Failed to process lead" },
            { status: 500 }
        );
    }
}
