import { crawlersRoutes } from '@modules/crawlers/infra/http/routes/crawlers.routes';
import { pagesRoutes } from '@modules/pages/infra/http/routes/pages.routes';
import { searchRoutes } from '@modules/pages/infra/http/routes/search.routes';
import { sessionsRoutes } from '@modules/sessions/infra/http/routes/sessions.routes';
import { usersRoutes } from '@modules/users/infra/http/routes/users.routes';
import { userTokensRoutes } from '@modules/users/infra/http/routes/userTokens.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/', searchRoutes);
routes.use('/pages', pagesRoutes);

routes.use('/users', userTokensRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

routes.use('/crawlers', crawlersRoutes);

export { routes };
