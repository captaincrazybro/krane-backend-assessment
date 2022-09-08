import { PrismaService } from './prisma.service';

export default async function addUsersIfNotExist() {
    let prismaService = new PrismaService();

    let user = await prismaService.user.findFirst({
        where: {
            username: DEMO_USERS[0].username
        }
    })

    if (!user) {
        console.log("Adding demo users...");
        for (let i = 0; i < DEMO_USERS.length; i++) {
            await prismaService.user.create({
                data: DEMO_USERS[i]
            })
        }
    }
}

const DEMO_USERS = [
    {
        username: "lwenger",
        password: "testing123",
        aboutMe: "Hello, my name is Levi and I like programming!"
    }, {
        username: "root",
        password: "secure_password_here",
        aboutMe: "I am root user... :Z"
    }
]