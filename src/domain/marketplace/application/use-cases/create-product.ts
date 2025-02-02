import { Either, left, right } from "@/core/either"
import { Product } from "../../enterprise/entities/product"
import { ProductRepository } from "../repositories/product-repository"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { ProductAttachmentList } from "../../enterprise/entities/product-attachment-list"
import { ProductAttachment } from "../../enterprise/entities/product-attachment"
import { SellerRepository } from "../repositories/seller-repository"

interface CreateProductUseCaseRequest {
  categoryId: string
  sellerId: string
  title: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

type CreateProductUseCaseResponse = Either<Error, {
  product: Product
}>

export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private sellerRepository: SellerRepository,
  ) { }

  async execute({
    categoryId,
    sellerId,
    title,
    description,
    priceInCents,
    attachmentsIds,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const seller = this.sellerRepository.findByid(sellerId)

    if (!seller) {
      return left(new Error("seller not exist"))
    }

    const category = this.sellerRepository.findByid(sellerId)

    if (!category) {
      return left(new Error("category not exist"))
    }

    const attachmentEnpty = attachmentsIds.length === 0 || !attachmentsIds

    if (attachmentEnpty) {
      return left(new Error("Attachments not found"))
    }
    
    const product = Product.create({
      attachments:new ProductAttachmentList([]),
      categoryId: new UniqueEntityId(categoryId),
      description,
      priceInCents,
      sellerId: new UniqueEntityId(sellerId),
      title,
    })

    const ProductAttachments = attachmentsIds.map((attachmentId) => {
      return ProductAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        productId: product.id
      })
    })

    product.attachments = new ProductAttachmentList(ProductAttachments)

    await this.productRepository.create(product)

    return right({
      product
    })
  }
}