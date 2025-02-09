import {connect} from "@/dbConfig/dbConfig" // Use correct case
import User from "@/models/userModel"
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log("Login First Step : ",reqBody);

        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({
                error: "Invalid credentials"
            }, { status: 400 })
        }
        console.log("User found : ",user);
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({
                error: "Invalid credentials"
            }, { status: 400 })
        }

        //create token data 
        const tokenData = {
            id : user._id,
            email: user.email

        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn: "1d"});
        console.log("Token generated : ",token);

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            token
        }, { status: 200
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            });




        console.log("Login successful");
        return response;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error :any) {
        return NextResponse.json(
            {error: "Something went wrong", message: error.message}, 
            { status: 500 }
        )
    }
}