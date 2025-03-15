import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IProjectRepository } from 'src/datasource/repositories/project';

@Injectable()
export class ProjectOwnerGuard implements CanActivate {
  constructor(
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);

    const {
      req: { user },
    } = gqlContext.getContext();

    const args = gqlContext.getArgs();

    const projectId = this.extractProjectId(args);

    const isOwner = await this.isProjectOwner(user.id, projectId);

    if (isOwner) {
      return true;
    }

    throw new ForbiddenException("You don't have an access to this project");
  }

  private extractProjectId(args: any): string {
    let projectId = args.projectId || args.id;

    if (!projectId && args && typeof args === 'object') {
      Object.values(args).forEach((value: any) => {
        projectId = this.extractProjectId(value);
      });
    }

    return projectId;
  }

  private async isProjectOwner(
    userId: string,
    projectId: string,
  ): Promise<boolean> {
    try {
      await this.projectRepository.findOne({
        id: projectId,
        userId,
      });

      return true;
    } catch (err) {
      return false;
    }
  }
}
