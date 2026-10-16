/*
  Warnings:

  - The values [UNAVAILABLE] on the enum `PropertyAvailability` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PropertyAvailability_new" AS ENUM ('AVAILABLE', 'RENTED');
ALTER TABLE "public"."properties" ALTER COLUMN "availability" DROP DEFAULT;
ALTER TABLE "properties" ALTER COLUMN "availability" TYPE "PropertyAvailability_new" USING ("availability"::text::"PropertyAvailability_new");
ALTER TYPE "PropertyAvailability" RENAME TO "PropertyAvailability_old";
ALTER TYPE "PropertyAvailability_new" RENAME TO "PropertyAvailability";
DROP TYPE "public"."PropertyAvailability_old";
ALTER TABLE "properties" ALTER COLUMN "availability" SET DEFAULT 'AVAILABLE';
COMMIT;
