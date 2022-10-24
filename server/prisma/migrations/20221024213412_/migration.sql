/*
  Warnings:

  - The `calling_code` column on the `countries` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `currencies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "currencies" DROP CONSTRAINT "currencies_countryId_fkey";

-- AlterTable
ALTER TABLE "countries" DROP COLUMN "calling_code",
ADD COLUMN     "calling_code" TEXT[];

-- DropTable
DROP TABLE "currencies";
