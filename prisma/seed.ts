import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import config from "../src/config";

async function main() {
    const adminName = config.admin_name;
    const adminEmail = config.admin_email;
    const adminPassword = config.admin_password;

    if (!adminName || !adminEmail || !adminPassword) {
        throw new Error("Admin name,email and password not found in .env");
    }

    const isAdminExist = await prisma.user.findUnique({
        where: {
             email:adminEmail 
            },
    });

    if (isAdminExist) {
         console.log("An admin already exists with this email.");
        return;

       
    }

    const hashedPassword = await bcrypt.hash(
        adminPassword,
        Number(config.bcrypt_salt_rounds)
    );

    const createdAdmin = await prisma.user.create({
        data: {
            name:adminName,
            email:adminEmail,
            password: hashedPassword,
            role: "ADMIN",
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });

    console.log("Admin data seed successfully completed into DB:", createdAdmin);
}

main()
    .catch((error) => {
        console.error("Admin data seeding failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });