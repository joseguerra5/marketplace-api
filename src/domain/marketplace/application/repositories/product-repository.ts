import { PaginationParams } from "@/core/repositories/pagination-params";
import { Product } from "../../enterprise/entities/product";

export abstract class ProductRepository {
  abstract create(product: Product): Promise<void>
  abstract save(product: Product): Promise<void>
  abstract findByid(id: string): Promise<Product | null>
  abstract findManyBySellerId(
    sellerId: string,
    params: PaginationParams
  ): Promise<Product[]>
}