import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { ReturnLoginDto } from './dtos/returnLogin.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { compare } from 'bcrypt';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';

@Injectable()
export class AuthService {
  // O construtor recebe duas dependências: UserService e JwtService,
  // que são injetadas automaticamente pelo NestJS através do mecanismo de Injeção de Dependência.
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  // O método login recebe um objeto LoginDto, que contém as credenciais do usuário,
  // e retorna uma Promise de um objeto do tipo ReturnLoginDto.
  async signIn(loginDto: LoginDto): Promise<ReturnLoginDto> {
    // O serviço userService é usado para buscar um usuário pelo email fornecido.
    // Se ocorrer um erro (como usuário não encontrado), a exceção é tratada e `undefined` é retornado.
    const user: UserEntity | undefined = await this.userService
      .getAllUserByEmail(loginDto.email)
      .catch(() => undefined);

    // O método compare do bcrypt é usado para verificar se a senha fornecida
    // corresponde à senha armazenada no banco de dados (que é criptografada).
    // Se o usuário for undefined, ele compara com uma string vazia, o que resulta em false.
    const isMatch = await compare(loginDto.password, user?.password || '');

    // Se o usuário não for encontrado ou se a senha não corresponder,
    // uma exceção do tipo NotFoundException é lançada.
    if (!user || !isMatch) {
      throw new NotFoundException(`Email or password invalid`);
    }

    // Se o login for bem-sucedido, um token JWT é gerado contendo os dados do usuário,
    // e um objeto do tipo ReturnLoginDto é retornado, contendo o token e os dados do usuário.

    return {
      acessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDto(user),
    };
  }
}
