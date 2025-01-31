import { Either, left, right } from "@/core/either"
import { SellerRepository } from "../repositories/seller-repository"
import { HashComparer } from "../cryptography/hash-comparer"
import { Encrypter } from "../cryptography/encrypter"

interface AuthenticateSellerUseCaseRequest {
  email: string
  password: string
}

type AuthenticateSellerUseCaseResponse = Either<Error, {
  accessToken: string
}>

export class AuthenticateSellerUseCase {
  constructor(
    private sellerRepository: SellerRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) { }

  async execute({
    email,
    password
  }: AuthenticateSellerUseCaseRequest): Promise<AuthenticateSellerUseCaseResponse> {
    const seller = await this.sellerRepository.findByEmail(email)

    if (!seller) {
      return left(new Error('Invalid credentials'))
    }

    const isPasswordValid = await this.hashComparer.compare(password, seller.password)

    if (!isPasswordValid) {
      return left(new Error('Invalid credentials'))
    }

    const accessToken = await this.encrypter.encrypt({ sub: seller.id.toString() })


    return right({
      accessToken
    })
  }
}