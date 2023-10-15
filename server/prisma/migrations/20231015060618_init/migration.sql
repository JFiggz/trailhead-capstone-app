/*
  Warnings:

  - You are about to alter the column `lat` on the `lastlocation` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `lon` on the `lastlocation` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `set_lat` on the `userpref` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `set_lon` on the `userpref` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- DropForeignKey
ALTER TABLE `favourites` DROP FOREIGN KEY `favourites_ibfk_1`;

-- DropForeignKey
ALTER TABLE `lastlocation` DROP FOREIGN KEY `lastlocation_ibfk_1`;

-- DropForeignKey
ALTER TABLE `logindata` DROP FOREIGN KEY `logindata_ibfk_1`;

-- DropForeignKey
ALTER TABLE `packinglist` DROP FOREIGN KEY `packinglist_ibfk_1`;

-- DropForeignKey
ALTER TABLE `userpref` DROP FOREIGN KEY `userpref_ibfk_1`;

-- AlterTable
ALTER TABLE `lastlocation` MODIFY `lat` DOUBLE NOT NULL,
    MODIFY `lon` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `userpref` MODIFY `set_lat` DOUBLE NULL,
    MODIFY `set_lon` DOUBLE NULL;

-- AddForeignKey
ALTER TABLE `LoginData` ADD CONSTRAINT `LoginData_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPref` ADD CONSTRAINT `UserPref_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LastLocation` ADD CONSTRAINT `LastLocation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackingList` ADD CONSTRAINT `PackingList_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favourites` ADD CONSTRAINT `Favourites_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `logindata` RENAME INDEX `LoginData.userId_unique` TO `LoginData_userId_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User.auth_id_unique` TO `User_auth_id_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User.email_unique` TO `User_email_key`;

-- RenameIndex
ALTER TABLE `userpref` RENAME INDEX `UserPref.userId_unique` TO `UserPref_userId_key`;
