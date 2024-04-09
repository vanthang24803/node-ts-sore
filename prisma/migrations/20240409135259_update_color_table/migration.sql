/*
  Warnings:

  - Added the required column `value` to the `colors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "colors" ADD COLUMN     "value" VARCHAR(12) NOT NULL;
