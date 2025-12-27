import * as authService from "../services/auth.service.js";

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
    const { provider, email, name } = req.body;

    if (!provider || !email) {
      return res.status(400).json({
        success: false,
        message: "OAuth provider and email are required",
      });
    }

    // Using OAuth
    const { token, user } = await authService.oauthLogin({
      provider,
      email,
      name,
    });

    return res.status(200).json({
      success: true,
      data: { token, user },
    });
  } catch (err) {
    console.error("OAuth error:", err);
    return res.status(400).json({
      success: false,
      message: err.message || "OAuth authentication failed",
    });
  }
}
