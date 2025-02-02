import { InMemorySellerRepository } from "test/repositories/in-memory-seller-repository";
import { makeSeller } from "test/factories/make-seller";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryProductRepository } from "test/repositories/in-memory-produc";
import { CreateProductUseCase } from "./create-product";

let inMemoryProductRepository: InMemoryProductRepository
let inMemorySellerRepository: InMemorySellerRepository
let sut: CreateProductUseCase

describe("Create a product", () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductRepository()
    inMemorySellerRepository = new InMemorySellerRepository()
    sut = new CreateProductUseCase(inMemoryProductRepository, inMemorySellerRepository)
  });
  it("should be able to create a product", async () => {
    const seller = makeSeller({ password: "test-hashed" }, new UniqueEntityId("test"))
    await inMemorySellerRepository.create(seller)

    const result = await sut.execute({
      attachmentsIds: ["2", "3"],
      categoryId: "123123",
      description: "Description test",
      priceInCents: 123432,
      sellerId: "1231231",
      title: "Teste title"
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductRepository.items[0]).toEqual(result.value?.product)
    expect(inMemoryProductRepository.items[0]).toEqual(result.value?.product)
  })
})