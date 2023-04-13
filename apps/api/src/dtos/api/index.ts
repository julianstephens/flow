import { StatusCodes } from "http-status-codes";
import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const APIRespSchema = z.object({
  status: z.nativeEnum(StatusCodes),
  message: z.string(),
  data: z.any().optional(),
});

export class APIRespDto extends createZodDto(APIRespSchema) {}
