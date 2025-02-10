import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig"


connect();

export async function GET(request : NextRequest){
    try {
         const userId = await getDataFromToken(request);
         const user = await User.findOne({_id: userId}).select("-password");
            if(!user){
                return NextResponse.json({
                    error: "User not found"
                }, { status: 404 })
            }
            return NextResponse.json({
                message: "User found",
                success: true,
                data : user
            }, { status: 200 })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: error.response?.status || 400 }
        );
        
    }
}