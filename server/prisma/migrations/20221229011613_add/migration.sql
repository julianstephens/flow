-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "BudgetType" AS ENUM ('TRADITIONAL', 'GOAL', 'FIFTY_THIRTY_TWENTY');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "short_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dob" INTEGER NOT NULL,
    "address" JSONB NOT NULL,
    "roles" "Role"[] DEFAULT ARRAY['USER']::"Role"[],
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "budgetType" "BudgetType" NOT NULL DEFAULT 'TRADITIONAL',
    "isActive" BOOLEAN NOT NULL,
    "description" TEXT,
    "target" DECIMAL(65,30),
    "targetDate" INTEGER,
    "income" DECIMAL(65,30),
    "expenses" DECIMAL(65,30),
    "catergoryMap" JSONB,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
