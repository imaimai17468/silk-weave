/*
  Warnings:

  - You are about to drop the column `conclusion` on the `Detail` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Detail` table. All the data in the column will be lost.
  - You are about to drop the column `keyPoints` on the `Detail` table. All the data in the column will be lost.
  - You are about to drop the column `nextActions` on the `Detail` table. All the data in the column will be lost.
  - Added the required column `contents` to the `Detail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Detail" DROP COLUMN "conclusion",
DROP COLUMN "description",
DROP COLUMN "keyPoints",
DROP COLUMN "nextActions",
ADD COLUMN     "contents" TEXT NOT NULL;
