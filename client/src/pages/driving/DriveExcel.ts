import { IDrivingInform } from "../../interfaces/interface";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { calCarDay, calYearMonth } from "../../api";
import { drivingExcelHeaders } from "../../constants/headers";

export default function downloadExcel(
  drivingInform: IDrivingInform[] | undefined,
  currentDate: Date | null,
  car: string,
  totalFuelCost: number,
  totalToll: number,
  totalEtcCost: number,
  totalDrivingKM: number,
  grandTotal: number,
) {
  if (!drivingInform) return;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(
    `${calYearMonth(currentDate ?? new Date())} 차량운행일지 (${car})`,
  );

  const titleRow = worksheet.addRow([
    `${calYearMonth(currentDate ?? new Date())} 차량운행일지 (${car})`,
  ]);

  worksheet.mergeCells(`A1:J1`);
  titleRow.font = { bold: true, size: 16, color: { argb: "FFFFFF" } };
  titleRow.alignment = { vertical: "middle", horizontal: "center" };
  titleRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "000000" },
    };
  });

  worksheet.eachRow((row) => {
    row.height = 25;
  });

  worksheet.addRow([]);

  // 1. 헤더 추가 (스타일 적용)
  const headerRow = worksheet.addRow(drivingExcelHeaders);

  headerRow.font = { bold: true };
  headerRow.alignment = { vertical: "middle", horizontal: "left" };
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D3D3D3" },
    };
    cell.border = {
      top: { style: "medium" },
      left: { style: "medium" },
      bottom: { style: "medium" },
      right: { style: "medium" },
    };
  });

  // 2. 데이터 행 추가 (테두리 추가)
  drivingInform.forEach((drive) => {
    const dataRow = worksheet.addRow([
      calCarDay(drive.driveDay),
      drive.username,
      drive.drivingDestination,
      drive.startKM.toLocaleString(),
      drive.endKM.toLocaleString(),
      drive.totalKM.toLocaleString(),
      drive.fuelCost ? drive.fuelCost.toLocaleString() : "",
      drive.toll ? drive.toll.toLocaleString() : "",
      drive.etc.cost > 0
        ? `${drive.etc.cost.toLocaleString()}(${drive.etc.name})`
        : "",
      "",
    ]);
    dataRow.alignment = { vertical: "middle" };
    dataRow.eachCell((cell) => {
      cell.border = {
        top: { style: "medium" },
        left: { style: "medium" },
        bottom: { style: "medium" },
        right: { style: "medium" },
      };
    });
  });

  // 3. 마지막 합계 행 추가 (스타일 적용)
  const totalRow = worksheet.addRow([
    "",
    "",
    "",
    "",
    "",
    `${totalDrivingKM.toLocaleString()}km`,
    totalFuelCost.toLocaleString(),
    totalToll.toLocaleString(),
    totalEtcCost.toLocaleString(),
    grandTotal.toLocaleString(),
  ]);
  totalRow.alignment = { vertical: "middle" };

  worksheet.mergeCells(`A${totalRow.number}:E${totalRow.number}`);

  totalRow.font = { bold: true };
  totalRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D3D3D3" },
    };
    cell.border = {
      top: { style: "medium" },
      left: { style: "medium" },
      bottom: { style: "medium" },
      right: { style: "medium" },
    };
  });

  // 4. 열 너비 설정
  const columnWidths = [
    { width: 6 }, // 날짜
    { width: 14 }, // 운전자
    { width: 49 }, // 행선지
    { width: 8 }, // 출발km
    { width: 8 }, // 도착km
    { width: 8 }, // 주행거리
    { width: 8 }, // 주유비
    { width: 8 }, // 하이패스
    { width: 12 }, // 기타
  ];
  worksheet.columns = columnWidths.map((col) => ({
    width: col.width,
  }));

  // 5. 행 높이 설정
  worksheet.eachRow((row) => {
    row.height = 35;
  });

  // 6. 파일 생성 및 다운로드
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(
      new Blob([buffer]),
      `${calYearMonth(currentDate ?? new Date())} 차량운행일지 (${car}).xlsx`,
    );
  });
}
