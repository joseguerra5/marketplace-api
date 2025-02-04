import { View } from "../../enterprise/entities/view";

export abstract class ViewRepository {
  abstract create(view: View): Promise<void>
  abstract findByViewerId(viewerId: string, productId: string): Promise<View | null>
  abstract findManyByProductId(productId: string): Promise<View[]>
}