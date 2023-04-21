import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { randomUUID } from 'crypto';
import { ReportResponseDto } from 'src/dtos/report.dto';

interface Report {
  amount: number;
  source: string;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    return new ReportResponseDto(report);
  }

  createReport(
    { amount, source }: Report,
    type: ReportType
  ): ReportResponseDto {
    const newReport = {
      id: randomUUID(),
      amount: amount,
      source: source,
      created_at: new Date(),
      updated_at: new Date(),
      type: type,
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(
    { amount, source }: Report,
    type: ReportType,
    id: string
  ): ReportResponseDto {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id
    );

    if (!reportToUpdate) return;

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...{ amount, source },
    };
    return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
    return 'delete success';
  }
}
