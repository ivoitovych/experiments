/**
 * SyntheticDataService
 *
 * Generates realistic synthetic values for each PHI/PII entity type using
 * @faker-js/faker. Values are statistically realistic but not real patient data.
 *
 * Each generated record is persisted to MySQL for audit trail purposes.
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { SyntheticRecord } from './entities/synthetic-record.entity';
import type { GenerateSyntheticDto } from './dto/generate-synthetic.dto';

type GeneratedRecord = {
  id: string;
  entityType: string;
  value: string;
  locale: string;
};

@Injectable()
export class SyntheticDataService {
  constructor(
    @InjectRepository(SyntheticRecord)
    private readonly recordRepository: Repository<SyntheticRecord>,
  ) {}

  private generateValue(entityType: string): string {
    switch (entityType) {
      case 'PERSON':
        return faker.person.fullName();

      case 'EMAIL_ADDRESS':
        return faker.internet.email();

      case 'PHONE_NUMBER':
        return faker.phone.number();

      case 'US_SSN':
        return faker.helpers.replaceSymbols('###-##-####');

      case 'US_DRIVER_LICENSE':
        return faker.helpers.replaceSymbols('??######');

      case 'US_PASSPORT':
        return faker.helpers.replaceSymbols('????????');

      case 'LOCATION':
        return `${faker.location.streetAddress()}, ${faker.location.city()} ${faker.location.zipCode()}`;

      case 'DATE_TIME':
        return faker.date.birthdate().toLocaleDateString('en-US');

      case 'CREDIT_CARD':
        return faker.finance.creditCardNumber();

      case 'IBAN_CODE':
        return faker.finance.iban();

      case 'MEDICAL_LICENSE':
        return `${faker.location.countryCode()}-MD-${faker.string.numeric(5)}`;

      case 'IP_ADDRESS':
        return faker.internet.ip();

      case 'URL':
        return faker.internet.url();

      case 'UK_NHS':
        // UK NHS number format: NNN NNN NNNN
        return faker.helpers.replaceSymbols('### ### ####');

      case 'NRP':
        // Nationality / Religious / Political affiliation (representative values)
        return faker.helpers.arrayElement([
          'British', 'German', 'French', 'Spanish', 'Swiss',
          'Italian', 'Dutch', 'Polish', 'Romanian', 'Swedish',
        ]);

      default:
        return `<${entityType}_${faker.string.alphanumeric(6)}>`;
    }
  }

  async generate(
    dto: GenerateSyntheticDto,
    userId: string,
  ): Promise<GeneratedRecord[]> {
    const locale = dto.locale ?? 'en_US';
    const generated: GeneratedRecord[] = [];

    for (let i = 0; i < dto.recordCount; i++) {
      const entityType = dto.entityTypes[i % dto.entityTypes.length];
      generated.push({
        id: uuidv4(),
        entityType,
        value: this.generateValue(entityType),
        locale,
      });
    }

    await this.recordRepository.save(
      generated.map((r) => ({ ...r, userId })),
    );

    return generated;
  }
}
