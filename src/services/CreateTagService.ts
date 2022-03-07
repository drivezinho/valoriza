import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

interface ITagRquest {
  name: string;
}

class CreateTagService {
  async execute({ name }: ITagRquest) {
    const tagRepository = getCustomRepository(TagsRepositories);

    if (!name) {
      throw new Error("Incorret name!");
    }

    const tagAlreadyExist = await tagRepository.findOne({ name });

    if (tagAlreadyExist) {
      throw new Error("Tag Already exists");
    }

    const tag = tagRepository.create({
      name,
    });

    await tagRepository.save(tag);

    return tag;
  }
}

export { CreateTagService };
