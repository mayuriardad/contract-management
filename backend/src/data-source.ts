import { DataSource } from "typeorm";
import { ServiceWorker } from "./entities/ServiceWorker";
import { ServiceContract } from "./entities/ServiceContract";
import { WorkerContractMapping } from "./entities/WorkerContractMapping";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  entities: [ServiceWorker, ServiceContract, WorkerContractMapping],
  migrations: ["src/migration/**/*.ts"],
  synchronize: false,
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => console.error("Database connection failed:", error));
