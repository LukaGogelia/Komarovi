import dbConnect from "../../data/mongoDb/utils/database";
import { User } from "../../data/mongoDb/models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST"); // Inform the client what's allowed
    return res.status(405).end("Method Not Allowed"); // 405 is "Method Not Allowed" HTTP status code
  }

  try {
    await dbConnect();

    const { identifier, password } = req.body;
    identifier.trim();

    const user = await User.findOne({
      $or: [
        { email: identifier },
        { phone: identifier },
        { nationalIdNumber: identifier },
      ],
    });

    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const expiresIn = req.body.stayLoggedIn ? 30 * 24 * 3600 : 3600;

    const token = JWT.sign(payload, process.env.JWT_SECRET, {
      expiresIn: expiresIn,
      alg: "HS256", // Example algorithm, you might need a different one
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
