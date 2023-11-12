-- CreateTable
CREATE TABLE "Channels" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "create_timestamp" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "member_count" INTEGER NOT NULL,
    "last_message_id" INTEGER NOT NULL,

    CONSTRAINT "Channels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Channels_url_key" ON "Channels"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Channels_name_key" ON "Channels"("name");
