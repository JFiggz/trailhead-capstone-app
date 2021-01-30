/*
  Warnings:

  - The migration will change the primary key for the `logindata` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `user` table. If it partially fails, the table could be left without primary key constraint.

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
ALTER TABLE `favourites` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `lastlocation` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `logindata` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `packinglist` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `userpref` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Favourites` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LastLocation` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LoginData` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PackingList` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPref` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
