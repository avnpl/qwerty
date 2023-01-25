-- DropForeignKey
ALTER TABLE "Matches" DROP CONSTRAINT "Matches_useroneId_fkey";

-- DropForeignKey
ALTER TABLE "Matches" DROP CONSTRAINT "Matches_usertwoId_fkey";

-- DropForeignKey
ALTER TABLE "Socials" DROP CONSTRAINT "Socials_userId_fkey";

-- AlterTable
ALTER TABLE "Matches" ALTER COLUMN "useroneId" SET DEFAULT 'Anonymous';
ALTER TABLE "Matches" ALTER COLUMN "usertwoId" SET DEFAULT 'Anonymous';

-- AddForeignKey
ALTER TABLE "Socials" ADD CONSTRAINT "Socials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "Matches_useroneId_fkey" FOREIGN KEY ("useroneId") REFERENCES "User"("userId") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Matches" ADD CONSTRAINT "Matches_usertwoId_fkey" FOREIGN KEY ("usertwoId") REFERENCES "User"("userId") ON DELETE SET DEFAULT ON UPDATE CASCADE;
