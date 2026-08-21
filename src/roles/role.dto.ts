import { AutoMap } from '@automapper/classes';
import { RawRuleOf } from '@casl/ability';
import { AppAbility } from 'src/casl/casl-ability.factory';

export class RoleDto {
  @AutoMap()
  id: number;

  permissions: RawRuleOf<AppAbility>[];

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  isCustom: boolean;
}
