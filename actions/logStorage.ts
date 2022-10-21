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

const findDrain = async (host: string) => {
  try {
    const drain = await prisma.drain.findUnique({
      where: {
        host,
      },
    });
    return drain;
  } catch (e) {
    console.log("Error while finding darin", e);
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

export { storeLog, createDrain, findDrain, deleteLog };
