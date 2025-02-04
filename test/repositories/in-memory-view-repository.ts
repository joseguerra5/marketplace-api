import { ViewRepository } from "@/domain/marketplace/application/repositories/view";
import { View } from "@/domain/marketplace/enterprise/entities/view";

export class InMemoryViewRepository extends ViewRepository {
  public items: View[] = [];
 
 
  async create(view: View): Promise<void> {
    this.items.push(view);
  }
  async findByViewerId(viewerId: string, productId: string): Promise<View | null> {
    const view = this.items.find((item) => item.viewerId.toString() === viewerId && item.productId.toString() === productId);

    if (!view) {
      return null;
    }

    return view;
  }

  async findManyByProductId(productId: string): Promise<View[]> {
     const view = this.items
      .filter((item) => item.productId.toString() === productId)

    return view
  }

}