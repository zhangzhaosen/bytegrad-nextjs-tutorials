-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "create_user" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
