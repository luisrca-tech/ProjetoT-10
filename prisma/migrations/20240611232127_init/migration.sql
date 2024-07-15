-- CreateTable
CREATE TABLE "users" (
    "id" STRING NOT NULL,
    "username" STRING NOT NULL,
    "name" STRING NOT NULL,
    "bio" STRING,
    "email" STRING,
    "avatar_url" STRING,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
