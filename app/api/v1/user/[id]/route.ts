import db from "@/prisma/instance";
import { SingleReactQueryUserTypesResponse } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}:{params:Promise<{id:string}>}):Promise<NextResponse<SingleReactQueryUserTypesResponse>> {
    try {
        const { id } = await params
        const getUser = await db.user.findUnique({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            success: true,
            statusCode: 200,
            data: getUser,
            message: 'User Fetched Successfully...!!!✅',
            error: null,
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            statusCode: 500,
            data: null,
            error: '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
            message: 'Failed To Fetch User From The DataBase...!!!🥺😔',
            status: 500
        }, {
            status: 500
        })
    }
}
