/*
  Warnings:

  - You are about to drop the column `name` on the `categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryName]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryName` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "name",
ADD COLUMN     "categoryName" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_categoryName_key" ON "categories"("categoryName");
