import searchRoutes from "./search/routes";
import userRoutes from "./user/routes";
import eventRoutes from "./event/routes";

export default [...searchRoutes, ...userRoutes, ...eventRoutes];
