/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "token" TEXT,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'user';
