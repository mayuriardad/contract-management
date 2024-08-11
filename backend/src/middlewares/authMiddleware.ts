import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { ServiceWorker } from "../entities/ServiceWorker";

export const fetchUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const employeeNumber = req.headers["employee-id"];

  if (!employeeNumber) {
    return res.status(401).json({ message: "Please login and try again" });
  }

  try {
    const workerRepository = AppDataSource.getRepository(ServiceWorker);
    const worker = await workerRepository.findOneBy({
      employeeNumber: Number(employeeNumber),
    });

    if (!worker) {
      return res.status(403).json({ message: "Permission denied" });
    }

    // Attach user details to request object
    req.user = worker;

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
