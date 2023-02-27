import { logger } from '@shared/utils/logger';

class AllowedOrigins {
  private origins: string[];

  constructor() {
    this.origins = [];
  }

  public addOrigin(origin: string) {
    this.origins.push(origin);
  }

  public authorizeOrigin(origin: string) {
    logger.debug(`Authorizing origin from ${origin} into ${this.origins}`);
    return this.origins.includes(origin);
  }

  public updateOrigin(oldValue: string, newValue: string) {
    const updatedOrigins = this.origins.map(origin => {
      if (origin === oldValue) {
        return newValue;
      }
      return origin;
    });

    this.origins = updatedOrigins;
  }

  public removeOrigin(originToRemove: string) {
    const updatedOrigins = this.origins.filter(
      origin => origin !== originToRemove,
    );
    this.origins = updatedOrigins;
  }
}

export default new AllowedOrigins();
