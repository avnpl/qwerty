/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `userInterest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[interestID]` on the table `userInterest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userInterest_userId_key" ON "userInterest"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "userInterest_interestID_key" ON "userInterest"("interestID");
