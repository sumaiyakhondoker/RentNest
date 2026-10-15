import cookieParser from "cookie-parser";
import cors from "cors";

import express,{ Application, Request, Response } from "express";
import config from "./config";
import { landlordRoutes} from "./modules/landlord/landlord.route";
import { authRoutes } from "./modules/auth/auth.route";
import { categoryRoutes } from "./modules/category/category.route";
import { rentalRequestRoutes } from "./modules/rentalRequest/rentalRequest.route";
import { adminRoutes } from "./modules/admin/admin.route";

const app:Application = express()

app.use(cors({
    origin:config.app_url,
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/', (req:Request, res:Response)=>{
    res.send("Hello from RentNest!!")
})

app.use('/api/auth', authRoutes)
app.use('/api/landlord', landlordRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/rentals', rentalRequestRoutes)
app.use('/api/admin', adminRoutes)









export default app;