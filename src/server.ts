import app from "./app";
import config from "./config";
// import { prisma } from "./lib/prisma";

async function main() {
    const PORT = config.port ;
    try {

        //  await prisma.$connect();
        console.log('Connected to the database successfully!!');
        app.listen(PORT, ()=>{
            console.log(`Server is running on port: ${PORT}`);
        })
        
    } catch (error) {
        console.log('Error from the server:', error);
        //  await prisma.$disconnect();
        process.exit(1)
    }
}


main()