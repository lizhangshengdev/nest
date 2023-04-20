import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { randomUUID } from 'crypto';

interface Report {
  amount: number;
  source: string;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }

  getReportById(type: ReportType, id: string) {
    return data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
  }

  createReport({ amount, source }: Report, type: ReportType) {
    const newReport = {
      id: randomUUID(),
      amount: amount,
      source: source,
      created_at: new Date(),
      updated_at: new Date(),
      type: type,
    };
    data.report.push(newReport);
    return newReport;
  }

  updateReport({ amount, source }: Report, type: ReportType, id: string) {
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
    return 'update success';
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
    return 'delete success';
  }
}
