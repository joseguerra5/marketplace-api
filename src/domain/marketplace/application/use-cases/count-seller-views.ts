import { Either, left, right } from "@/core/either"
import { ProductRepository } from "../repositories/product-repository"
import { ValuesNotFoundError } from "./errors/value-not-found"
import { SellerRepository } from "../repositories/seller-repository"
import { NotAllowedError } from "@/core/errors/not-allowed-error"
import { ViewRepository } from "../repositories/view"

interface CountSellerViewsUseCaseRequest {
  sellerId: string
}

type CountSellerViewsUseCaseResponse = Either<ValuesNotFoundError | NotAllowedError, {
  amount: number
}>

export class CountSellerViewsUseCase {
  constructor(
    private productRepository: ProductRepository,
    private sellerRepository: SellerRepository,
    private viewRepository: ViewRepository,
  ) { }

  async execute({
    sellerId,
  }: CountSellerViewsUseCaseRequest): Promise<CountSellerViewsUseCaseResponse> {
    const seller = await this.sellerRepository.findById(sellerId)

    if (!seller) {
      return left(new NotAllowedError())
    }

    const toDay = new Date()
    const last30Days = new Date().setDate(toDay.getDate() - 30)

    const amount = await this.viewRepository.countBySeller({ sellerId, from: new Date(last30Days) })


    return right({
      amount
    })
  }
}