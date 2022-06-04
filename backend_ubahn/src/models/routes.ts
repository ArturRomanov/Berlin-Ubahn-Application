import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "routes",
})
export class Routes extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  originStation!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  destinationStation!: string;
}