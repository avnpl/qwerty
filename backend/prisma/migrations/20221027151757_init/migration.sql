-- CreateEnum
CREATE TYPE "interests" AS ENUM ('AIML', 'WEBDEV', 'FRONTEND', 'BACKEND', 'FULLSTACK');

-- CreateTable
CREATE TABLE "user" (
    "id" STRING NOT NULL,
    "fname" STRING NOT NULL,
    "lname" STRING,
    "bio" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inters" "interests"[],

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "socials" (
    "id" STRING NOT NULL,
    "linkedin" STRING,
    "github" STRING,
    "twitter" STRING,
    "kaggle" STRING,
    "userId" STRING NOT NULL,

    CONSTRAINT "socials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matches" (
    "matched_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "useroneId" STRING NOT NULL,
    "usertwoId" STRING NOT NULL,
    "mfactor" FLOAT8 NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("useroneId","usertwoId")
);

-- CreateIndex
CREATE INDEX "user_id_idx" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "socials_userId_key" ON "socials"("userId");

-- CreateIndex
CREATE INDEX "socials_userId_idx" ON "socials"("userId");

-- CreateIndex
CREATE INDEX "matches_useroneId_usertwoId_idx" ON "matches"("useroneId", "usertwoId");

-- CreateIndex
CREATE UNIQUE INDEX "matches_useroneId_usertwoId_key" ON "matches"("useroneId", "usertwoId");

-- AddForeignKey
ALTER TABLE "socials" ADD CONSTRAINT "socials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_useroneId_fkey" FOREIGN KEY ("useroneId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_usertwoId_fkey" FOREIGN KEY ("usertwoId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
