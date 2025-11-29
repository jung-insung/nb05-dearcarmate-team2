import { DashBoardViewEntity } from "../../../2_domain/entities/dashboard/dashboard-view.entity";
import { getDashboardDataReqDto } from "../../requests/dashboard-shema.request";

export interface IDashboardService {
 
  /**
 * - 동시성 문제
 * - 여러 행을 사용하거나, 테이블 단위로 데이터를 처리함
 * - 테이블 전체 수준에서 동시성 문제
 * - 테이블을 읽은 작업들로 구성됨 -> 논 리피터블 리드 문제
 * - unitOfWork에 트랜잭션으로 격리 수준 RepeatableRead 올림
 */
  getData(dto: getDashboardDataReqDto): Promise<DashBoardViewEntity>;
}