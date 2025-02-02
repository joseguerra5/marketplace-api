import { PaginationParams } from "@/core/repositories/pagination-params";
import { ProductRepository } from "@/domain/marketplace/application/repositories/product-repository";
import { Product } from "@/domain/marketplace/enterprise/entities/product";

export class InMemoryProductRepository implements ProductRepository {
  public items: Product[] = [];

  async save(product: Product): Promise<void> {
    this.items.push(product);
  }
  async findByid(id: string): Promise<Product | null> {
    const product = this.items.find((item) => item.id.toString() === id);

    if (!product) {
      return null;
    }

    return product;
  }
  async findManyBySellerId(sellerId: string,
    {page}: PaginationParams
  ): Promise<Product[]> {
    const Product = this.items
    .filter((item) => item.sellerId.toString() === sellerId)
    .slice((page - 1) * 20, page * 20)

    return Product
  }
 

  async create(attach: Product): Promise<void> {
    this.items.push(attach)
  }
}