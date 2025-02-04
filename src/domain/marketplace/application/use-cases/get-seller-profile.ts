import { Either, left, right } from "@/core/either"
import { ValuesNotFoundError } from "./errors/value-not-found"
import { ProductRepository } from "../repositories/product-repository"
import { Seller } from "../../enterprise/entities/seller"
import { SellerRepository } from "../repositories/seller-repository"

interface GetSellerProfileUseCaseRequest {
  sellerId: string
}

type GetSellerProfileUseCaseResponse = Either<ValuesNotFoundError, {
  seller: Seller
}>

export class GetSellerProfileUseCase {
  constructor(
    private sellerRepository: SellerRepository,
  ) { }

  async execute({
    sellerId
  }: GetSellerProfileUseCaseRequest): Promise<GetSellerProfileUseCaseResponse> {
    const seller = await this.sellerRepository.findByid(sellerId)

    if (!seller) {
      return left(new ValuesNotFoundError("seller"))
    }

    return right({
      seller
    })
  }
}