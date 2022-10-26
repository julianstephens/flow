/*
  Warnings:

  - You are about to drop the column `country` on the `addresses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[abbrev]` on the table `countries` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `countryId` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `abbrev` to the `countries` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_addressId_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "country",
ADD COLUMN     "countryId" INTEGER NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "countries" ADD COLUMN     "abbrev" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "addressId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "countries_abbrev_key" ON "countries"("abbrev");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
