import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IPageRepository } from 'src/datasource/repositories/page';
import { IProjectRepository } from 'src/datasource/repositories/project';

@Injectable()
export class PageOwnerGuard implements CanActivate {
  constructor(
    @Inject(IPageRepository)
    private readonly pageRepository: IPageRepository,
    @Inject(IProjectRepository)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);

    const {
      req: { user },
    } = gqlContext.getContext();

    const args = gqlContext.getArgs();

    const pageId = this.extractPageId(args);

    const isOwner = await this.isPageOwner(user.id, +pageId);

    if (isOwner) {
      return true;
    }

    throw new ForbiddenException("You don't have an access to this page");
  }

  private extractPageId(args: any): string {
    let pageId = args.pageId || args.id;

    if (!pageId && args && typeof args === 'object') {
      Object.values(args).forEach((value: any) => {
        pageId = this.extractPageId(value);
      });
    }

    return pageId;
  }

  private async isPageOwner(userId: string, pageId: number): Promise<boolean> {
    try {
      const page = await this.pageRepository.findById(pageId);

      const project = await this.projectRepository.findOne({
        id: page.projectId,
        userId,
      });

      return !!project;
    } catch (err) {
      return false;
    }
  }
}
