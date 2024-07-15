-- CreateTable
CREATE TABLE "credentials" (
    "id" STRING NOT NULL,
    "user_id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "password" STRING NOT NULL,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
