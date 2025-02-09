import {connect} from "@/dbConfig/dbConfig" // Use correct case
import User from "@/models/userModel"
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs"



connect()




export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody
        if(!username || !email || !password){
            return NextResponse.json({
                error: "Please provide all fields"
            }, { status: 400 })
        }


        //check if user already exists
        const useremail = await User.findOne({email});
        const userName = await User.findOne({username});
        if(useremail){
            return NextResponse.json({
                error: "User already exists"
            }, { status: 400 })
        }
        if(userName){
            return NextResponse.json({
                error: "Username already exists"
            }, { status: 400 })
        }


        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //create user
        const newUser = new User ({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log("All User Data filler by user at Signup time :",savedUser);
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        }, { status: 201 })



    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
        
    }
}