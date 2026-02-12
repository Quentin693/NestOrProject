import { Controller, Get, Param } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getFullMenu() {
    return this.menuService.getFullMenu();
  }

  @Get(':category')
  getMenuByCategory(@Param('category') category: string) {
    return this.menuService.getMenuByCategory(category);
  }
}
