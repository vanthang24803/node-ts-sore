/*
  Warnings:

  - You are about to drop the column `optionId` on the `colors` table. All the data in the column will be lost.
  - Added the required column `planterId` to the `colors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "colors" DROP CONSTRAINT "colors_optionId_fkey";

-- AlterTable
ALTER TABLE "colors" DROP COLUMN "optionId",
ADD COLUMN     "planterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "colors" ADD CONSTRAINT "colors_planterId_fkey" FOREIGN KEY ("planterId") REFERENCES "planters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
