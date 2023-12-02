/*
  Warnings:

  - You are about to drop the column `member_count` on the `Channels` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Channels` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Channels` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[channel_id]` on the table `Channels` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `channel_id` to the `Channels` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Channels_name_key";

-- DropIndex
DROP INDEX "Channels_url_key";

-- AlterTable
ALTER TABLE "Channels" DROP COLUMN "member_count",
DROP COLUMN "type",
DROP COLUMN "url",
ADD COLUMN     "channel_id" TEXT NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "last_message_id" DROP NOT NULL,
ALTER COLUMN "last_message_id" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Channels_channel_id_key" ON "Channels"("channel_id");
