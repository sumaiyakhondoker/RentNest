import app from "./app";

async function main() {

   
   
    const PORT = process.env.PORT || 5000;
    try {
        app.listen(PORT, ()=>{
            console.log(`Server is running on port: ${PORT}`);
        })
        
    } catch (error) {
        console.log('Error from the server:', error);
        process.exit(1)
    }
}


main()