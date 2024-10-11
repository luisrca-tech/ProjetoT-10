/*
  Warnings:

  - You are about to drop the column `AuthorizationPkKey` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `listId` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_AuthorizationPkKey_key";

-- DropIndex
DROP INDEX "users_listId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "AuthorizationPkKey";
ALTER TABLE "users" DROP COLUMN "listId";

-- CreateTable
CREATE TABLE "configuration_keys" (
    "id" STRING NOT NULL,
    "AuthorizationPkKey" STRING,
    "listId" STRING,
    "userId" STRING,

    CONSTRAINT "configuration_keys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "configuration_keys_userId_key" ON "configuration_keys"("userId");

-- AddForeignKey
ALTER TABLE "configuration_keys" ADD CONSTRAINT "configuration_keys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
