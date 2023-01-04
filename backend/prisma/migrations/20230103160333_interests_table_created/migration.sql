/*
  Warnings:

  - You are about to drop the column `inters` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "socials_userId_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "inters";

-- DropEnum
DROP TYPE "interests";

-- CreateTable
CREATE TABLE "interests" (
    "interId" INT4 NOT NULL,
    "interestName" STRING NOT NULL,

    CONSTRAINT "interests_pkey" PRIMARY KEY ("interId")
);

-- CreateTable
CREATE TABLE "userInterest" (
    "userId" STRING NOT NULL,
    "interID" INT4 NOT NULL,

    CONSTRAINT "userInterest_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "userInterest_interID_key" ON "userInterest"("interID");

-- CreateIndex
CREATE UNIQUE INDEX "userInterest_userId_interID_key" ON "userInterest"("userId", "interID");

-- AddForeignKey
ALTER TABLE "userInterest" ADD CONSTRAINT "userInterest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userInterest" ADD CONSTRAINT "userInterest_interID_fkey" FOREIGN KEY ("interID") REFERENCES "interests"("interId") ON DELETE RESTRICT ON UPDATE CASCADE;
