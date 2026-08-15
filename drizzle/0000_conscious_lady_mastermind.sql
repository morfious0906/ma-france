CREATE TABLE `learner_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`selectedLevel` varchar(8) NOT NULL DEFAULT 'A1',
	`xp` int NOT NULL DEFAULT 0,
	`currentStreak` int NOT NULL DEFAULT 0,
	`lastActiveAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `learner_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `learner_profiles_user_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `lesson_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`lessonId` varchar(96) NOT NULL,
	`status` enum('started','completed') NOT NULL DEFAULT 'started',
	`score` int NOT NULL DEFAULT 0,
	`correctAnswers` int NOT NULL DEFAULT 0,
	`attempts` int NOT NULL DEFAULT 0,
	`xpEarned` int NOT NULL DEFAULT 0,
	`completedAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lesson_progress_id` PRIMARY KEY(`id`),
	CONSTRAINT `lesson_progress_user_lesson_unique` UNIQUE(`userId`,`lessonId`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
--> statement-breakpoint
CREATE TABLE `vocabulary_reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`vocabularyId` varchar(96) NOT NULL,
	`category` varchar(48) NOT NULL,
	`reviewStage` int NOT NULL DEFAULT 0,
	`intervalDays` int NOT NULL DEFAULT 1,
	`nextReviewAt` timestamp,
	`lastReviewedAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `vocabulary_reviews_id` PRIMARY KEY(`id`),
	CONSTRAINT `vocabulary_reviews_user_vocab_unique` UNIQUE(`userId`,`vocabularyId`)
);
--> statement-breakpoint
CREATE TABLE `writing_entries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`lessonId` varchar(96),
	`level` varchar(8) NOT NULL DEFAULT 'A1',
	`entryText` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `writing_entries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `lesson_progress_user_index` ON `lesson_progress` (`userId`);--> statement-breakpoint
CREATE INDEX `vocabulary_reviews_due_index` ON `vocabulary_reviews` (`userId`,`nextReviewAt`);--> statement-breakpoint
CREATE INDEX `writing_entries_user_created_index` ON `writing_entries` (`userId`,`createdAt`);