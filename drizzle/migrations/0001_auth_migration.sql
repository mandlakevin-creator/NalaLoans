-- Remove Manus OAuth columns and add email/ID authentication
ALTER TABLE `users` 
DROP COLUMN `openId`,
DROP COLUMN `loginMethod`,
MODIFY COLUMN `email` VARCHAR(320) NOT NULL UNIQUE,
ADD COLUMN `idNumber` VARCHAR(13) NOT NULL UNIQUE AFTER `email`,
ADD COLUMN `passwordHash` VARCHAR(255) NOT NULL AFTER `idNumber`;

-- Update OTP table for email/ID authentication
ALTER TABLE `otpVerifications`
DROP COLUMN `userId`,
ADD COLUMN `email` VARCHAR(320) NOT NULL AFTER `id`,
ADD COLUMN `idNumber` VARCHAR(13) AFTER `email`,
MODIFY COLUMN `type` ENUM('email', 'phone', 'id_login') NOT NULL;

-- Create sessions table for email/ID authentication
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` VARCHAR(255) PRIMARY KEY,
  `userId` INT NOT NULL,
  `expiresAt` TIMESTAMP NOT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Add index for faster OTP lookups
CREATE INDEX `idx_otp_email` ON `otpVerifications`(`email`);
CREATE INDEX `idx_otp_idNumber` ON `otpVerifications`(`idNumber`);
CREATE INDEX `idx_sessions_userId` ON `sessions`(`userId`);
