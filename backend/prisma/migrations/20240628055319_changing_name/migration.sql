/*
  Warnings:

  - You are about to drop the column `fullName` on the `Person` table. All the data in the column will be lost.
  - Added the required column `name` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Person" DROP COLUMN "fullName",
ADD COLUMN "name" TEXT NOT NULL DEFAULT 'Unknown';

ALTER TABLE "Person" ALTER COLUMN "name" DROP DEFAULT;
