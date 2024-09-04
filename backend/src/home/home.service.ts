import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Home } from './home.entity';
import { User } from 'src/user/user.entity';
import { CreateHomeDto, UpdateHomeDto } from './home.dto';


@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home)
    private readonly homeRepository: Repository<Home>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findHomesByUser(userId: number, page: number = 1): Promise<Home[]> {
    const take = 50;
    const skip = (page - 1) * take;
    return this.homeRepository.find({
      where: { users: { id: userId } },
      relations: ['users'],
      take,
      skip,
    });
  }

  async updateUsersForHome(homeId: number, userIds: number[]): Promise<any> {
    const home = await this.homeRepository.findOne({ where: { id: homeId }, relations: ['users'] });
    const users = await this.userRepository.findByIds(userIds);
    home.users = users;
    await this.homeRepository.save(home);
    return home;

  }

  findAll(): Promise<Home[]> {
    return this.homeRepository.find();
  }



  async findById(id: number): Promise<Home> {
    return this.homeRepository.findOne({ where: { id: id }, relations: { users: true } });
  }

  async create(createHomeDto: CreateHomeDto): Promise<Home> {
    const home = this.homeRepository.create(createHomeDto);
    return this.homeRepository.save(home);
  }

  async update(id: number, updateHomeDto: UpdateHomeDto): Promise<Home> {
    await this.homeRepository.update(id, updateHomeDto);
    return this.homeRepository.findOne({ where: { id: id } })
  }

  async delete(id: number): Promise<void> {
    await this.homeRepository.delete(id);
  }

  async createHomeWithUsers(createHomeDto: CreateHomeDto): Promise<Home> {
    const { userIds, ...homeData } = createHomeDto;

    const home = this.homeRepository.create(homeData);

    if (userIds && userIds.length) {
      const users = await this.userRepository.findByIds(userIds);
      home.users = users;
    }
    return this.homeRepository.save(home);
  }
}
