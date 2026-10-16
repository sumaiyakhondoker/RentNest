import type { PropertyAvailability } from "../../../generated/prisma/enums";

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


export interface IUpdatePropertyPayload {
title?: string   
description?:string
picture?: string
amenities?: string[]
location?:string
price?:number 
availability?:PropertyAvailability
landlordId:string
categoryId?:string
}




