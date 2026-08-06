import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

interface AuditLogInput {
  action: string;
  entity: string;
  entityId?: string;
  details?: Record<string, unknown>;
  userId?: string;
  ipAddress?: string;
}

export async function createAuditLog(input: AuditLogInput) {
  try {
    await prisma.auditLog.create({
      data: {
        action: input.action,
        entity: input.entity,
        entityId: input.entityId,
        details: input.details as Prisma.InputJsonValue | undefined,
        userId: input.userId,
        ipAddress: input.ipAddress,
      },
    });
  } catch (error) {
    console.error("Audit log error:", error);
  }
}
