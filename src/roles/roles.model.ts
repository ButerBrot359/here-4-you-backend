import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreatinAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreatinAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ example: 'ADMIN', description: "User's role value" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @Column({ type: DataType.STRING, allowNull: true })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}

