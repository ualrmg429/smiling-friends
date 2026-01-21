import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({ 
        description: 'Unique identifier of the user (UUID)',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    id: string;

    @ApiProperty({ 
        description: 'Email address of the user',
        example: 'user@example.com'
    })
    email: string;

    @ApiProperty({ 
        description: 'Role of the user in the system',
        example: 'ADMIN',
        enum: ['ADMIN', 'USER']
    })
    role: string;

    @ApiProperty({ 
        description: 'JWT authentication token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    })
    token: string;
}