/*
  Warnings:

  - You are about to drop the column `billboardId` on the `categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[categoryId]` on the table `billboards` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `billboards` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_billboardId_fkey";

-- DropIndex
DROP INDEX "categories_billboardId_key";

-- AlterTable
ALTER TABLE "billboards" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "billboardId";

-- CreateIndex
CREATE UNIQUE INDEX "billboards_categoryId_key" ON "billboards"("categoryId");

-- AddForeignKey
ALTER TABLE "billboards" ADD CONSTRAINT "billboards_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
