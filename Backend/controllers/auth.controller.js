import * as authService from "../services/auth.service.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Normal Login
export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const { token, user } = await authService.login(email, password);

    return res.status(200).json({
      success: true,
      data: { token, user },
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message || "Login failed",
    });
  }
}

// Normal signup
export async function signupController(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const { token, user } = await authService.signup({
      name,
      email,
      password,
      role,
      oAuthProvider: "local",
    });

    return res.status(201).json({
      success: true,
      data: { token, user },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "Signup failed",
    });
  }
}

// OAuth signup


export async function oauthController(req, res) {
  try {
    const { token, role } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Google token is required",
      });
    }

    // 🔐 Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    const { token: jwtToken, user } =
      await authService.oauthLogin({
        provider: "google",
        email,
        name,
        role,
      });

    return res.status(200).json({
      success: true,
      data: { token: jwtToken, user },
    });
  } catch (err) {
    console.error("OAuth error:", err);
    return res.status(401).json({
      success: false,
      message: "Invalid Google token",
    });
  }
}
