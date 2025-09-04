import express from "express";
import { AuthService } from "../services/auth.service.js";
import { ApiKeyService } from "../services/apiKey.service.js";

const router = express.Router();

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     summary: User registration
 *     description: Create a new user account with username and password. 
 *                  On successful registration, an API key is generated and returned. 
 *                  ⚠️ The API key is shown only once and must be stored securely by the client.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123
 *     responses:
 *       201:
 *         description: User registered successfully with API key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 apiKey:
 *                   type: string
 *                   example: key-9f8a7c6b5d4e3f2a1b0c9d8e7f6a5b4c
 *       400:
 *         description: Bad Request (e.g., username already exists)
 */


router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await AuthService.signup(username, password);
        if(result.status === 201) {
            res.status(result.status).json({ message: result.message, apiKey: result.apiKey });
        } else {
            res.status(result.status).json({ message: result.message });
        }
    } catch (err: any) {
        res.status(400).json({error: err.message});
    }
});

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and return an access token.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Unauthorized (invalid username or password)
 */


router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const { userId } = await AuthService.login(username, password);
        res.json({message: "Login successfull"});
    } catch (err: any) {
        res.status(400).json({error: err.message})
    }
});

export default router;