/*
  Warnings:

  - Added the required column `publicUrlId` to the `billboards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "billboards" ADD COLUMN     "publicUrlId" TEXT NOT NULL;
