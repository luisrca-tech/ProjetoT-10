/*
  Warnings:

  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[AuthorizationPkKey]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[listId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "password";
ALTER TABLE "users" ADD COLUMN     "AuthorizationPkKey" STRING;
ALTER TABLE "users" ADD COLUMN     "listId" STRING;

-- CreateIndex
CREATE UNIQUE INDEX "users_AuthorizationPkKey_key" ON "users"("AuthorizationPkKey");

-- CreateIndex
CREATE UNIQUE INDEX "users_listId_key" ON "users"("listId");
