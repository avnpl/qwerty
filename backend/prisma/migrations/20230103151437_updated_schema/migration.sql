/*
  Warnings:

  - You are about to drop the column `fname` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lname` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `socials` table. All the data in the column will be lost.
  - Added the required column `mstatus` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statone` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stattwo` to the `matches` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "match_status" AS ENUM ('MATCHED', 'REQUESTED', 'SUCCESS', 'REJECTED');

-- DropIndex
DROP INDEX "matches_useroneId_usertwoId_idx";

-- DropIndex
DROP INDEX "user_id_idx";

-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "mstatus" "match_status" NOT NULL;
ALTER TABLE "matches" ADD COLUMN     "statone" BOOL NOT NULL;
ALTER TABLE "matches" ADD COLUMN     "stattwo" BOOL NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "fname";
ALTER TABLE "user" DROP COLUMN "lname";
ALTER TABLE "user" ADD COLUMN     "email" STRING NOT NULL;
ALTER TABLE "user" ADD COLUMN     "name" STRING;
ALTER TABLE "user" ADD COLUMN     "username" STRING NOT NULL;

-- RedefineTables
CREATE TABLE "_prisma_new_socials" (
    "userId" STRING NOT NULL,
    "linkedin" STRING,
    "github" STRING,
    "twitter" STRING,
    "kaggle" STRING,

    CONSTRAINT "socials_pkey" PRIMARY KEY ("userId")
);
DROP INDEX "socials_userId_idx";
DROP INDEX "socials_userId_key";
INSERT INTO "_prisma_new_socials" ("github","kaggle","linkedin","twitter","userId") SELECT "github","kaggle","linkedin","twitter","userId" FROM "socials";
DROP TABLE "socials" CASCADE;
ALTER TABLE "_prisma_new_socials" RENAME TO "socials";
CREATE UNIQUE INDEX "socials_userId_key" ON "socials"("userId");
CREATE INDEX "socials_userId_idx" ON "socials"("userId");
ALTER TABLE "socials" ADD CONSTRAINT "socials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX "matches_useroneId_usertwoId_mstatus_idx" ON "matches"("useroneId", "usertwoId", "mstatus");

-- CreateIndex
CREATE INDEX "user_id_username_email_idx" ON "user"("id", "username", "email");
