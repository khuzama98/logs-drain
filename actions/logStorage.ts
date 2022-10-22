import prisma from "../prisma/prisma";

interface ILog {
  message: string;
  timestamp: Date;
  drainId: string;
}

interface IDrain {
  host: string;
  source: string;
}

enum Source {
  build,
  client
}

const storeLog = async (body: ILog) => {
  try {
    const log = await prisma.log.create({
      data: {
        ...body,
      },
    });
    return log;
  } catch (e) {
    console.log("Error while creating log", e);
    throw new Error(e as string);
  }
};

const createDrain = async (body: IDrain) => {
  try {
    const drain = await prisma.drain.create({
      data: {
        ...body,
      },
    });

    return drain;
  } catch (e) {
    console.log("Error while creating log", e);
    throw new Error(e as string);
  }
};

const findDrain = async (host: string, source: string): Promise<any> => {
  try {
    const drain = await prisma.drain.findFirst({
      where: {
        AND: [
          {
            host: {
              equals: host
            }
          },
          {
            source : {
              equals : source
            }
          },
        ],
      },
    });
    return drain;
  } catch (e) {
    console.log("Error while finding darin", e);
    throw new Error(e as string);
  }
};

const findAllDrains = async () => {
  try {
    const drains = await prisma.drain.findMany({});
    return drains;
  } catch (e) {
    console.log("Error in finding Log", e);
    throw new Error(e as string);
  }
};

const findLogs = async (drainId: string, timestamp: number) => {
  try {
    const filteredLog = await prisma.log.findMany({
      where: {
        drainId,
        createdAt: {
          lt: new Date(timestamp - 1 * 60 * 1000),
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      take: Number(process.env.BATCH_SIZE),
    });
    return filteredLog;
  } catch (e) {
    console.log("Error in finding Log", e);
    throw new Error(e as string);
  }
};

const deleteLog = async (id: string) => {
  try {
    const deletedLog = await prisma.log.delete({
      where: {
        id,
      },
    });
    return deletedLog;
  } catch (e) {
    console.log("Error in deleting Log", e);
    throw new Error(e as string);
  }
};

export { storeLog, createDrain, findDrain, deleteLog, findLogs, findAllDrains };
