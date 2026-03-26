/**
 * DeIdentificationController
 *
 * REST endpoints for the de-identification pipeline:
 *
 *   POST /de-identification/analyze     → run Presidio analyzer on text
 *   POST /de-identification/anonymize   → run Presidio anonymizer on analyzer results
 *   POST /de-identification/upload      → upload CSV/JSON/TXT file (multer, max 5 MB)
 *   GET  /de-identification/documents   → list user's processed documents (paginated)
 *   GET  /de-identification/documents/:id → get a single document by ID
 *
 * All endpoints require JWT authentication.
 * File uploads are validated: MIME type check → size limit → char cap + sanitization.
 */
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { DeIdentificationService } from './de-identification.service';
import type { MulterFile } from './de-identification.service';
import { AnalyzeTextDto } from './dto/analyze-text.dto';
import { AnonymizeTextDto } from './dto/anonymize-text.dto';
import { JwtAuthGuard } from '@/common/guards/auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import type { JwtPayload } from '@/modules/auth/strategies/jwt.strategy';

const ALLOWED_MIMETYPES = [
  'text/csv',
  'application/json',
  'text/plain',
  'text/tab-separated-values',
];

// Max upload: 5 MB — enough for any realistic clinical document batch
const MAX_FILE_BYTES = 5 * 1024 * 1024;

@ApiTags('De-Identification')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('de-identification')
export class DeIdentificationController {
  constructor(private readonly service: DeIdentificationService) {}

  @ApiOperation({
    summary: 'Analyze text for PII entities',
    description:
      'Calls the Presidio Analyzer container to detect PII entities. ' +
      'Returns a list of entity positions and confidence scores.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of detected PII entities',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          entity_type: { type: 'string', example: 'PERSON' },
          start: { type: 'number', example: 8 },
          end: { type: 'number', example: 19 },
          score: { type: 'number', example: 0.85 },
        },
      },
    },
  })
  @Post('analyze')
  analyze(@Body() dto: AnalyzeTextDto) {
    return this.service.analyzeText(dto);
  }

  @ApiOperation({
    summary: 'Anonymize text using Presidio',
    description:
      'Calls the Presidio Anonymizer container. ' +
      'Pass the analyzerResults from the /analyze endpoint. ' +
      'Saves the result to the database.',
  })
  @Post('anonymize')
  anonymize(
    @Body() dto: AnonymizeTextDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.service.anonymizeText(dto, user.sub);
  }

  @ApiOperation({ summary: 'List user documents (paginated)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @Get('documents')
  getDocuments(
    @CurrentUser() user: JwtPayload,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.service.getDocuments(user.sub, page, limit);
  }

  @ApiOperation({ summary: 'Get document by ID' })
  @Get('documents/:id')
  getDocument(@Param('id') id: string) {
    return this.service.getDocument(id);
  }

  @ApiOperation({ summary: 'Upload a file (CSV, JSON, TXT) for de-identification' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'File parsed and preview returned' })
  @ApiResponse({ status: 400, description: 'Unsupported format or empty file' })
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: MAX_FILE_BYTES },
      fileFilter: (_req, file, cb) => {
        if (ALLOWED_MIMETYPES.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Unsupported format. Use CSV, JSON or TXT'), false);
        }
      },
    }),
  )
  uploadFile(@UploadedFile() file: MulterFile) {
    return this.service.uploadFile(file);
  }
}
