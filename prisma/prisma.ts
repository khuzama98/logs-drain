import { PrismaClient } from "@prisma/client";
import { MongoMemoryServer } from "mongodb-memory-server";

const initializePrisma = async () => {
  let prisma: PrismaClient;
  let mongoServer;
  let uri;
  let config = {};
  console.log("TESTING",process.env.TESTING)
  if (process.env.TESTING === "true") {
    mongoServer = await MongoMemoryServer.create();
    uri = mongoServer.getUri();
    console.log("uri---",uri);
    config = {
      datasources: {
        db: {
          url: uri,
        },
      },
    };
  }
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient(config);
  } else {
    let globalWithPrisma = global as typeof globalThis & {
      prisma: PrismaClient;
    };
    if (!globalWithPrisma.prisma) {
      globalWithPrisma.prisma = new PrismaClient(config);
    }
    prisma = globalWithPrisma.prisma;
  }
  return prisma;
};

export default initializePrisma;
