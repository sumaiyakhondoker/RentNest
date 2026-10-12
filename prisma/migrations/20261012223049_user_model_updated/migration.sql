/*
  Warnings:

  - You are about to drop the column `facilities` on the `properties` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "PropertyAvailability" ADD VALUE 'RENTED';

-- AlterTable
ALTER TABLE "properties" DROP COLUMN "facilities",
ADD COLUMN     "amenities" TEXT[];
