ALTER TABLE `activities` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `activities` MODIFY COLUMN `station1` datetime DEFAULT NULL;--> statement-breakpoint
ALTER TABLE `activities` MODIFY COLUMN `station2` datetime DEFAULT NULL;--> statement-breakpoint
ALTER TABLE `activities` MODIFY COLUMN `station3` datetime DEFAULT NULL;--> statement-breakpoint
ALTER TABLE `activities` MODIFY COLUMN `station4` datetime DEFAULT NULL;--> statement-breakpoint
ALTER TABLE `activities` MODIFY COLUMN `station5` datetime DEFAULT NULL;--> statement-breakpoint
ALTER TABLE `activities` MODIFY COLUMN `created_at` datetime DEFAULT NULL;--> statement-breakpoint
ALTER TABLE `activities` MODIFY COLUMN `updated_at` datetime DEFAULT NULL;--> statement-breakpoint
ALTER TABLE `activities` ADD PRIMARY KEY(`id`);