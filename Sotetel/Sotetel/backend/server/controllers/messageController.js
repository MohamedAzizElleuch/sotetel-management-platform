import Message from "../models/Message.js";
import nodemailer from "nodemailer";

// 📩 Handle contact form submission
export const submitMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message." });
  }
};

// 🔒 Admin: Fetch all messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages." });
  }
};

// 📧 Admin: Send a reply via email & store reply in DB
export const sendReply = async (req, res) => {
  const { messageId, to, subject, text } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Sotetel Admin" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    // ✅ Update the specific message by ID
    const targetMessage = await Message.findById(messageId);
    if (!targetMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    targetMessage.replies = targetMessage.replies || [];
    targetMessage.replies.push({
      text,
      date: new Date(),
    });

    await targetMessage.save();

    res.status(200).json({ message: "Email sent and reply saved to correct message." });
  } catch (err) {
    console.error("Error sending or saving reply:", err);
    res.status(500).json({ error: "Email failed." });
  }
};
