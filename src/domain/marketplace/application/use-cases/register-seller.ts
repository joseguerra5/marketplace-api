import { Either, left, right } from "@/core/either"
import { SellerRepository } from "../repositories/seller-repository"
import { Seller } from "../../enterprise/entities/seller"
import { HashGenerator } from "../cryptography/hash-generator"

interface RegisterSellerUseCaseRequest {
  name: string
  phone: string
  email: string
  password: string
  passwordConfirmation: string
}

type RegisterSellerUseCaseResponse = Either<Error, {
  seller: Seller
}>

export class RegisterSellerUseCase {
  constructor(
    private sellerRepository: SellerRepository,
    private hashGenerator: HashGenerator,
  ) { }

  async execute({
    name,
    phone,
    email,
    password,
    passwordConfirmation,
  }: RegisterSellerUseCaseRequest): Promise<RegisterSellerUseCaseResponse> {
    const sellerWithSameEmail = await this.sellerRepository.findByEmail(email)

    if (sellerWithSameEmail) {
      return left(new Error('Email already in use'))
    }

    const sellerWithSamePhone = await this.sellerRepository.findByPhone(phone)

    if (sellerWithSamePhone) {
      return left(new Error('Phone already in use'))
    }

    if (password !== passwordConfirmation) {
      return left(new Error('Passwords not match'))
    }

    const passwordHash = await this.hashGenerator.hash(password)

    const seller = Seller.create({
      name,
      phone,
      email,
      password: passwordHash
    })

    await this.sellerRepository.create(seller)

    return right({
      seller
    })
  }
}