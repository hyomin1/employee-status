// 이름, 차량, 행선지, 상태 추가 삭제 제어
import { Request, Response } from 'express';
import Name from '../models/Name';
import Destination from '../models/employee/Destination';
import Work from '../models/employee/Work';
import Car from '../models/Car';
import Inform from '../models/employee/EmployeeInform';
import Business from '../models/employee/Business';
import User from '../models/employee/User';

//이름

export const addName = async (req: Request, res: Response) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: '이름을 입력하세요.' });
  }
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
  try {
    await Name.create({ username });
    return res.status(200).json({ message: '이름 추가 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const removeName = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.session.isAdmin) {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
  try {
    const deletedName = await Name.deleteOne({ _id: id });
    if (!deletedName) {
      return res
        .status(404)
        .json({ error: '삭제할 이름이 존재하지 않습니다.' });
    }
    return res.status(200).json({ message: '이름 삭제 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const editName = async (req: Request, res: Response) => {
  const { id, username } = req.body;
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
  try {
    const editName = await Name.findByIdAndUpdate(
      id,
      { username },
      { new: true }
    );
    if (!editName) {
      return res
        .status(404)
        .json({ error: '수정할 이름이 존재하지 않습니다.' });
    }
    return res.status(200).json({ message: '이름 수정 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const getName = async (req: Request, res: Response) => {
  try {
    const allNames = await Name.find({}, { username: 1 });

    return res.status(200).json({ allNames });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

// 방문지

export const addDestination = async (req: Request, res: Response) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
  const { destination } = req.body;
  if (!destination) {
    return res.status(400).json({ error: '방문지를 입력하세요.' });
  }
  try {
    await Destination.create({ destination });
    return res.status(200).json({ message: '방문지 추가 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const removeDestination = async (req: Request, res: Response) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
  const { id } = req.params;
  try {
    const deletedDestination = await Destination.deleteOne({ _id: id });
    if (!deletedDestination) {
      return res
        .status(404)
        .json({ error: '삭제할 행선지가 존재하지 않습니다.' });
    }
    return res.status(200).json({ message: '방문지 삭제 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};
export const editDestination = async (req: Request, res: Response) => {
  const { id, destination } = req.body;
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
  try {
    const editDestination = await Destination.findByIdAndUpdate(
      id,
      { destination },
      { new: true }
    );
    if (!editDestination) {
      return res
        .status(404)
        .json({ error: '수정할 방문지가 존재하지 않습니다.' });
    }
    return res.status(200).json({ message: '방문지 수정 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const getDestination = async (req: Request, res: Response) => {
  try {
    const allDestinations = await Destination.find({}, { destination: 1 });

    return res.status(200).json({ allDestinations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

// 사업명

export const addBusiness = async (req: Request, res: Response) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
  const { business } = req.body;
  if (!business) {
    return res.status(400).json({ error: '사업명을 입력하세요.' });
  }
  try {
    await Business.create(req.body);
    return res.status(200).json({ message: '사업명 추가 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const removeBusiness = async (req: Request, res: Response) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
  const { id } = req.params;
  try {
    const deletedBusiness = await Business.deleteOne({ _id: id });
    if (!deletedBusiness) {
      return res
        .status(404)
        .json({ error: '삭제할 사업명이 존재하지 않습니다.' });
    }
    return res.status(200).json({ message: '사업명 삭제 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};
export const editBusiness = async (req: Request, res: Response) => {
  const { id, business } = req.body;
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
  try {
    const editBusiness = await Business.findByIdAndUpdate(
      id,
      { business },
      { new: true }
    );
    if (!editBusiness) {
      return res
        .status(404)
        .json({ error: '수정할 사업명이 존재하지 않습니다.' });
    }
    return res.status(200).json({ message: '사업명 수정 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const getBusinesses = async (req: Request, res: Response) => {
  try {
    const allBusinesses = await Business.find(
      {},
      { business: 1, destinationId: 1 }
    );

    return res.status(200).json({ allBusinesses });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const getBusiness = async (req: Request, res: Response) => {
  try {
    const business = await Business.findOne(
      { business: req.params.business },
      {
        business: 1,
        destinationId: 1,
      }
    );
    return res.status(200).json({ business });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

// 업무
export const addWork = async (req: Request, res: Response) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
  const { work } = req.body;
  if (!work) {
    return res.status(400).json({ error: '업무를 입력해야 합니다.' });
  }
  try {
    await Work.create({ work });
    return res.status(200).json({ message: '상태 추가 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const removeWork = async (req: Request, res: Response) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
  const { id } = req.params;
  try {
    const deletedWork = await Work.deleteOne({ _id: id });
    if (!deletedWork) {
      return res
        .status(404)
        .json({ error: '삭제할 업무가 존재하지 않습니다.' });
    }
    return res.status(200).json({ message: '상태 삭제 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};
export const editWork = async (req: Request, res: Response) => {
  const { id, work } = req.body;
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
  try {
    const editWork = await Work.findByIdAndUpdate(id, { work }, { new: true });
    if (!editWork) {
      return res
        .status(404)
        .json({ error: '수정할 업무가 존재하지 않습니다.' });
    }
    return res.status(200).json({ message: '업무 수정 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const getWork = async (req: Request, res: Response) => {
  try {
    const allWorks = await Work.find({}, { work: 1 });
    return res.status(200).json({ allWorks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const addCar = async (req: Request, res: Response) => {
  const { car } = req.body;
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
  if (!car) {
    return res.status(400).json({ error: '차량 정보를 입력해야 합니다.' });
  }
  try {
    await Car.create({ car });
    return res.status(200).json({ message: '차량 추가 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const removeCar = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
  try {
    const deletedCar = await Car.deleteOne({ _id: id });
    if (!deletedCar) {
      return res
        .status(404)
        .json({ error: '삭제할 차량이 존재하지 않습니다.' });
    }
    return res.status(200).json({ message: '차량 삭제 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const editCar = async (req: Request, res: Response) => {
  const { id, car } = req.body;
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
  try {
    const editCar = await Car.findByIdAndUpdate(id, { car }, { new: true });
    if (!editCar) {
      return res
        .status(404)
        .json({ error: '수정할 차량이 존재하지 않습니다.' });
    }
    return res.status(200).json({ message: '차량 수정 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const getCar = async (req: Request, res: Response) => {
  try {
    const allCars = await Car.find({}, { car: 1 });
    return res.status(200).json({ allCars });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const addInform = async (req: Request, res: Response) => {
  if (!req.session.isUser) {
    return res
      .status(403)
      .json({ type: 'not User', error: '다시 로그인 해주세요' });
  }
  const {
    username,
    destination,
    business,
    work,
    car,
    isDaily,
    startDate,
    endDate,
  } = req.body;

  try {
    if (
      !username ||
      !destination ||
      !business ||
      !work ||
      !car ||
      isDaily === 0
    ) {
      return res.status(400).json({ error: '정보를 입력해야 합니다.' });
    }

    const data = {
      ...req.body,
      writerId: req.session.userId,
      car: car === '선택 안함' ? '' : car,
      destination: destination === '선택 안함' ? '' : destination,
      business: business === '선택 안함' ? '' : business,
    };

    if (isDaily === 2) {
      if (!startDate || !endDate) {
        return res
          .status(400)
          .json({ error: '시작일과 종료일을 입력해야 합니다.' });
      }
      data.startDate = startDate;
      data.endDate = endDate;
    } else if (isDaily === 1) {
      data.startDate = new Date().setHours(0, 0, 0, 0) + 9 * 60 * 60 * 1000;
      data.endDate = new Date().setHours(0, 0, 0, 0) + 9 * 60 * 60 * 1000;
    }

    await Inform.create(data);

    return res.status(200).json({ message: '정보 입력 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const removeInform = async (req: Request, res: Response) => {
  if (!req.session.isUser) {
    return res
      .status(403)
      .json({ type: 'not User', error: '다시 로그인 해주세요' });
  }
  const { id } = req.params;
  try {
    const deletedInform = await Inform.deleteOne({ _id: id });
    if (!deletedInform) {
      return res
        .status(404)
        .json({ error: '삭제할 정보가 존재하지 않습니다.' });
    }
    return res.status(200).json({ message: '삭제 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const editInform = async (req: Request, res: Response) => {
  const { _id, username, destination, business, work, car } = req.body;
  try {
    const editInform = await Inform.findByIdAndUpdate(
      _id,
      {
        username,
        destination,
        business,
        work,
        car: car === '선택 안함' ? '' : car,
      },
      {
        new: true,
      }
    );
    if (!editInform) {
      return res.status(404).json({ error: '정보를 찾을 수 없습니다.' });
    }
    return res.status(200).json({ message: '정보 수정 완료' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const getInform = async (req: Request, res: Response) => {
  if (!req.session.isUser) {
    return res
      .status(403)
      .json({ type: 'not User', error: '다시 로그인 해주세요' });
  }

  try {
    const dateParam = req.query.date as string;
    const localDate = new Date(dateParam);

    const utcDate = new Date(localDate.getTime() - 9 * 60 * 60 * 1000);

    const startOfDay = new Date(utcDate).setHours(0, 0, 0, 0);
    const endOfDay = new Date(utcDate).setHours(23, 59, 59, 999);

    const Informs = await Inform.find(
      {
        $or: [
          { startDate: { $gte: startOfDay, $lte: endOfDay } }, // 시작일이 범위 내에 있는 경우
          { endDate: { $gte: startOfDay, $lte: endOfDay } }, // 종료일이 범위 내에 있는 경우
          { startDate: { $lte: startOfDay }, endDate: { $gte: endOfDay } }, // 범위에 포함된 경우
        ],
      },
      {
        username: 1,
        destination: 1,
        business: 1,
        work: 1,
        car: 1,
        writerId: 1,
        createdAt: 1,
        startDate: 1,
        endDate: 1,
      }
    );
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(400).json({ error: '유저 정보가 올바르지 않습니다.' });
    }

    const allInforms = Informs.map((inform) => {
      return {
        ...inform.toObject(),
        isOwner:
          inform.writerId.toString() === req.session.userId ||
          user.role === 'admin',
      };
    });

    return res.status(200).json({ allInforms });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const getUserStatistics = async (req: Request, res: Response) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: '관리자 권한이 필요합니다.' });
  }
  try {
    const { username, startDate, endDate } = req.query;

    const translateStartDate = new Date(startDate as string);
    const translateEndDate = new Date(endDate as string);

    const utcStartDate = new Date(
      translateStartDate.getTime() - 9 * 60 * 60 * 1000
    );
    const utcEndDate = new Date(
      translateEndDate.getTime() - 9 * 60 * 60 * 1000
    );

    const startOfDay = utcStartDate.setHours(0, 0, 0, 0);
    const endOfDay = utcEndDate.setHours(23, 59, 59, 999);
    const userStatistics = await Inform.find(
      {
        $and: [
          {
            $or: [
              { startDate: { $gte: startOfDay, $lte: endOfDay } }, // 시작일이 범위 내에 있는 경우
              { endDate: { $gte: startOfDay, $lte: endOfDay } }, // 종료일이 범위 내에 있는 경우
              { startDate: { $lte: startOfDay }, endDate: { $gte: endOfDay } }, // 범위에 포함된 경우
            ],
          },
          { username }, // 추가된 username 필터
        ],
      },
      {
        startDate: 1,
        endDate: 1,
        username: 1,
        destination: 1,
        business: 1,
        work: 1,
        car: 1,
      }
    );

    return res.status(200).json({ userStatistics });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};

export const getDestinationStatistics = async (req: Request, res: Response) => {
  if (!req.session.isAdmin) {
    return res
      .status(403)
      .json({ error: '관리자 권한이 필요합니다.', url: req.headers.referer });
  }
  try {
    const { destination } = req.query;
    const destinationStatistics = await Inform.find(
      { destination },
      {
        username: 1,
        destination: 1,
        startDate: 1,
        endDate: 1,
        business: 1,
        work: 1,
      }
    );
    return res.status(200).json({ destinationStatistics });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: '서버 에러' });
  }
};
