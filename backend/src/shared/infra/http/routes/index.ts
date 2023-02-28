import { crawlerLinksRoutes } from '@modules/crawlers/infra/http/routes/crawlerLinks.routes';
import { searchRoutes } from '@modules/search/infra/http/routes/search.routes';
import { sessionsRoutes } from '@modules/sessions/infra/http/routes/sessions.routes';
import { usersRoutes } from '@modules/users/infra/http/routes/users.routes';
import { userTokensRoutes } from '@modules/users/infra/http/routes/userTokens.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/', searchRoutes);

routes.use('/users', userTokensRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/crawler-links', crawlerLinksRoutes);

export { routes };
