import { Request, Response } from 'express';
import EmployeeInform from '../models/employee/EmployeeInform';
import { ObjectId } from 'mongodb'; // ObjectId 타입을 사용하기 위해 추가

export const getSchedule = async (req: Request, res: Response) => {
  if (!req.session.isUser) {
    return res
      .status(403)
      .json({ type: 'not User', error: '다시 로그인 해주세요' });
  }
  const { userId } = req.session;
  const { year, month } = req.query;

  try {
    const IYear: number = Number(year);
    const IMonth: number = Number(month);

    const prevMonth = IMonth === 1 ? 12 : IMonth - 1;
    const prevYear = IMonth === 1 ? IYear - 1 : IYear;

    const nextMonth = IMonth === 12 ? 1 : IMonth + 1;
    const nextYear = IMonth === 12 ? IYear + 1 : IYear;

    const startPrevMonth = new Date(
      Date.UTC(prevYear, prevMonth - 1, 1, 0, 0, 0)
    );
    const endNextMonth = new Date(
      Date.UTC(nextYear, nextMonth - 1, 31, 23, 59, 59)
    );

    const schedules = await EmployeeInform.find({
      writerId: new ObjectId(userId),
      $or: [
        // startDate가 해당 기간 내에 있는 경우
        {
          startDate: {
            $gte: startPrevMonth,
            $lte: endNextMonth,
          },
        },
        // endDate가 해당 기간 내에 있는 경우
        {
          endDate: {
            $gte: startPrevMonth,
            $lte: endNextMonth,
          },
        },
      ],
    });

    return res.status(200).json({ schedules });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};
