import { Router } from 'express';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profilerController = new ProfileController();

profileRouter.use(ensureAuthenticated);
profileRouter.get('/', profilerController.show);
profileRouter.put('/', profilerController.update);

export default profileRouter;
