CREATE TABLE `educationalContent` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`category` enum('financial_literacy','loan_management','budgeting','savings','faq') NOT NULL,
	`content` text NOT NULL,
	`excerpt` text,
	`author` varchar(100),
	`isPublished` boolean DEFAULT false,
	`viewCount` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`publishedAt` timestamp,
	CONSTRAINT `educationalContent_id` PRIMARY KEY(`id`),
	CONSTRAINT `educationalContent_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `eligibilityCriteria` (
	`id` int AUTO_INCREMENT NOT NULL,
	`minAge` int DEFAULT 18,
	`maxAge` int DEFAULT 75,
	`minMonthlyIncome` decimal(10,2),
	`employmentRequired` boolean DEFAULT false,
	`allowedEmploymentStatus` varchar(255),
	`minCreditScore` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `eligibilityCriteria_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `loanApplications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`productId` int NOT NULL,
	`requestedAmount` decimal(10,2) NOT NULL,
	`requestedPeriodDays` int NOT NULL,
	`purpose` varchar(255),
	`status` enum('draft','submitted','under_review','approved','rejected','cancelled') DEFAULT 'draft',
	`submittedAt` timestamp,
	`reviewedAt` timestamp,
	`reviewedBy` int,
	`rejectionReason` text,
	`eligibilityScore` int,
	`riskLevel` enum('low','medium','high'),
	`approvedAmount` decimal(10,2),
	`approvedPeriodDays` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `loanApplications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `loanProducts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`minAmount` decimal(10,2) NOT NULL,
	`maxAmount` decimal(10,2) NOT NULL,
	`minPeriodDays` int NOT NULL,
	`maxPeriodDays` int NOT NULL,
	`interestRate` decimal(5,2) NOT NULL,
	`processingFee` decimal(5,2),
	`isActive` boolean DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `loanProducts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `loans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`applicationId` int NOT NULL,
	`productId` int NOT NULL,
	`principal` decimal(10,2) NOT NULL,
	`interestRate` decimal(5,2) NOT NULL,
	`processingFee` decimal(10,2),
	`totalRepayment` decimal(10,2) NOT NULL,
	`monthlyInstallment` decimal(10,2) NOT NULL,
	`startDate` date NOT NULL,
	`endDate` date NOT NULL,
	`durationDays` int NOT NULL,
	`status` enum('active','completed','defaulted','cancelled') DEFAULT 'active',
	`disbursedAt` timestamp,
	`amountPaid` decimal(10,2) DEFAULT '0',
	`nextPaymentDue` date,
	`paymentsCompleted` int DEFAULT 0,
	`totalPayments` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `loans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `otpVerifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`otp` varchar(6) NOT NULL,
	`type` enum('email','phone','id') NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`verified` boolean DEFAULT false,
	`attempts` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `otpVerifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `payments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`loanId` int NOT NULL,
	`userId` int NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`paymentMethod` enum('bank_transfer','card','eft','other') NOT NULL,
	`status` enum('pending','processing','completed','failed','refunded') DEFAULT 'pending',
	`stripePaymentIntentId` varchar(255),
	`description` text,
	`reference` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`completedAt` timestamp,
	CONSTRAINT `payments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `idNumber` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `dateOfBirth` date;--> statement-breakpoint
ALTER TABLE `users` ADD `address` text;--> statement-breakpoint
ALTER TABLE `users` ADD `city` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `province` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `postalCode` varchar(10);--> statement-breakpoint
ALTER TABLE `users` ADD `monthlyIncome` decimal(10,2);--> statement-breakpoint
ALTER TABLE `users` ADD `employmentStatus` enum('employed','self-employed','unemployed','retired');--> statement-breakpoint
ALTER TABLE `users` ADD `employerName` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `bankName` varchar(100);--> statement-breakpoint
ALTER TABLE `users` ADD `accountNumber` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `accountType` enum('savings','cheque');--> statement-breakpoint
ALTER TABLE `users` ADD `idVerified` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `users` ADD `emailVerified` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `users` ADD `phoneVerified` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `users` ADD `bankVerified` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `users` ADD `eligibilityScore` int;--> statement-breakpoint
ALTER TABLE `users` ADD `maxLoanAmount` decimal(10,2);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_idNumber_unique` UNIQUE(`idNumber`);