import { Category } from "../../enterprise/entities/category";

export abstract class CategoryRepository {
  abstract create(category: Category): Promise<void>
  abstract save(category: Category): Promise<void>
  abstract findById(id: string): Promise<Category | null>
  abstract findAll(): Promise<Category[]>
}