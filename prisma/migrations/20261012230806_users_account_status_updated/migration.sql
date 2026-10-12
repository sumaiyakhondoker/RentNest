/*
  Warnings:

  - You are about to drop the column `status` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'BANNED');

-- AlterTable
ALTER TABLE "users" DROP COLUMN "status",
ADD COLUMN     "accounStatus" "AccountStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "UserStatus";
