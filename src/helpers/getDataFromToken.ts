import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
        if (typeof decodedToken === 'string') {
            throw new Error("Invalid token: decoded token is a string");
        }
        return decodedToken.id;
     
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Invalid token: " + error.message);
        } else {
            throw new Error("Invalid token");
        }
    }
}