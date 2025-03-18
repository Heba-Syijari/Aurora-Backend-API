import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateProjectContactMessageDto } from './dto';
import { ProjectService } from './project.service';

@Controller('api/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Public()
  @Post(':projectId/contact-message')
  async sendContactMessage(
    @Param('projectId') projectId,
    @Body() body: CreateProjectContactMessageDto,
  ) {
    return this.projectService.createProjectContactMessage({
      projectId,
      ...body,
    });
  }
  @Public()
  @Get('test')
  async sendHi() {
    return 'مرحبًا بك في خادم NestJS!';
  }
}
