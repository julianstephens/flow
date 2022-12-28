import { Prisma } from "@prisma/client";
import { BudgetType } from "./common.interfaces";

export interface IBudget {
  id: number;
  name: string;
  description: string;
  target: number;
  targetDate: string;
  budget: BudgetType;
  isActive: boolean;
  createdAt: string;
}
export interface IBudgetInput {
  name: string;
  description: string;
  target: number;
  targetDate: string;
  budget: BudgetType;
  income: number;
}
