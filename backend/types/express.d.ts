// types/express.d.ts
import { ServiceWorker } from "../entities/ServiceWorker";

declare global {
  namespace Express {
    interface Request {
      user?: ServiceWorker;
    }
  }
}
