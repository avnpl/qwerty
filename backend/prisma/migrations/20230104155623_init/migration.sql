-- CreateEnum
CREATE TYPE "match_status" AS ENUM ('MATCHED', 'REQUESTED', 'SUCCESS', 'REJECTED');

-- CreateTable
CREATE TABLE "user" (
    "userId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" STRING NOT NULL,
    "username" STRING NOT NULL,
    "email" STRING NOT NULL,
    "bio" STRING,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "interests" (
    "interestId" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "interestName" STRING NOT NULL,

    CONSTRAINT "interests_pkey" PRIMARY KEY ("interestId")
);

-- CreateTable
CREATE TABLE "userInterest" (
    "userId" STRING NOT NULL,
    "interestID" INT4 NOT NULL,

    CONSTRAINT "userInterest_pkey" PRIMARY KEY ("userId","interestID")
);

-- CreateTable
CREATE TABLE "socials" (
    "userId" STRING NOT NULL,
    "linkedin" STRING,
    "github" STRING,
    "twitter" STRING,
    "kaggle" STRING,

    CONSTRAINT "socials_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "matches" (
    "matched_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "useroneId" STRING NOT NULL,
    "usertwoId" STRING NOT NULL,
    "statone" BOOL NOT NULL,
    "stattwo" BOOL NOT NULL,
    "mfactor" FLOAT8 NOT NULL,
    "mstatus" "match_status" NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("useroneId","usertwoId")
);

-- CreateIndex
CREATE INDEX "user_userId_username_email_idx" ON "user"("userId", "username", "email");

-- CreateIndex
CREATE UNIQUE INDEX "interests_interestName_key" ON "interests"("interestName");

-- CreateIndex
CREATE INDEX "interests_interestId_interestName_idx" ON "interests"("interestId", "interestName");

-- CreateIndex
CREATE INDEX "userInterest_userId_interestID_idx" ON "userInterest"("userId", "interestID");

-- CreateIndex
CREATE UNIQUE INDEX "socials_userId_key" ON "socials"("userId");

-- CreateIndex
CREATE INDEX "socials_userId_idx" ON "socials"("userId");

-- CreateIndex
CREATE INDEX "matches_useroneId_usertwoId_mstatus_idx" ON "matches"("useroneId", "usertwoId", "mstatus");

-- CreateIndex
CREATE UNIQUE INDEX "matches_useroneId_usertwoId_key" ON "matches"("useroneId", "usertwoId");

-- AddForeignKey
ALTER TABLE "userInterest" ADD CONSTRAINT "userInterest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userInterest" ADD CONSTRAINT "userInterest_interestID_fkey" FOREIGN KEY ("interestID") REFERENCES "interests"("interestId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socials" ADD CONSTRAINT "socials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_useroneId_fkey" FOREIGN KEY ("useroneId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_usertwoId_fkey" FOREIGN KEY ("usertwoId") REFERENCES "user"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
