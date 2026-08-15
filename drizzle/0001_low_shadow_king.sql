CREATE TABLE `exercise_answers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`lessonId` varchar(96) NOT NULL,
	`questionId` varchar(96) NOT NULL,
	`userAnswer` text NOT NULL,
	`isCorrect` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `exercise_answers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `exercise_answers_user_lesson_index` ON `exercise_answers` (`userId`,`lessonId`);