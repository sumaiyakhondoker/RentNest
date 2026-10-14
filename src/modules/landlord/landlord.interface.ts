import type { PropertyAvailability } from "../../../generated/prisma/enums";

/** Fields accepted when creating a property listing. Database-generated fields
 * (id, timestamps, and relations) are intentionally excluded.
 */
export interface ICreatePropertyPayload {
title: string   
description:string
picture?: string
amenities: string[]
location:string
price:number 
availability:PropertyAvailability
landlordId:string
categoryId:string
}



