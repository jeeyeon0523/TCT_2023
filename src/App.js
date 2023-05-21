import { useState, useEffect } from "react";
import axios from "axios";
import "./res/index.css";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";

const USER_NO = "ME00001";
const PAGE_SIZE = 3;

function App() {
  const [userName, setUserName] = useState();
  const [ptype, setPtype] = useState(1);
  const [summary, setSummary] = useState();
  const [usedList, setUsedList] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);

  //infinite scroll 사용시
  const [scrollMore, setScrollMore] = useState(true);

  const getUserName = () => {
    axios
      .get(`http://localhost:8080/api/v1/user/${USER_NO}`)
      .then((response) => {
        setUserName(response.data?.name);
      });
  };

  const getSummary = () => {
    axios
      .get(
        `http://localhost:8080/api/v1/user/${USER_NO}/usage/summary?ptype=${ptype}`
      )
      .then((response) => {
        setSummary(response.data);
      });
  };

  // 1. 그냥 리스트
  // const getUsedList = () => {
  //   axios
  //     .get(`http://localhost:8080/api/v1/user/${USER_NO}/usage?ptype=${ptype}`)
  //     .then((response) => {
  //       setUsedList(response.data?.list);
  //     });
  // };
  //---------------------------------------------------

  // 2. infinite scroll 사용시
  const getUsedList = () => {
    axios
      .get(
        `http://localhost:8080/api/v1/user/${USER_NO}/usage?ptype=${ptype}&page_index=1&page_size=${PAGE_SIZE}`
      )
      .then((response) => {
        setUsedList(response.data?.list);
        setPageIndex((pageIndex) => pageIndex + 1);
      });
  };

  const fetchMoreData = () => {
    axios
      .get(
        `http://localhost:8080/api/v1/user/${USER_NO}/usage?ptype=${ptype}&page_index=${pageIndex}&page_size=${PAGE_SIZE}`
      )
      .then((response) => {
        setUsedList(usedList.concat(response.data?.list));
        setPageIndex((pageIndex) => pageIndex + 1);
      });
  };
  //--------------------------------------------------------

  const reset = () => {
    setUsedList(true);
    setUsedList([]);
  };

  // 날짜 포맷팅
  const formatDate = (date) => {
    return dayjs(date).format("YY.MM.DD HH:mm");
  };

  // 숫자 포맷팅
  const formatNumber = (number) => {
    if (isNaN(number)) {
      return 0;
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const changePtype = (type) => {
    setPtype(type);
  };

  useEffect(() => {
    getUserName();
  }, []);

  useEffect(() => {
    getSummary();
    getUsedList();
    reset();
    setPageIndex(1); // infinite scroll 사용시!
  }, [ptype]);

  return (
    <div>
      <div className="main-title">
        <h1>서비스 이용내역</h1>
        <div>{userName}</div>
      </div>
      <hr />

      <div className="service-summary">
        <div className="service-summary-tab">
          <button
            className={`tablinks ${ptype === 1 ? "on" : ""}`}
            onClick={() => {
              changePtype(1);
            }}
          >
            1주일
          </button>
          <button
            className={`tablinks ${ptype === 2 ? "on" : ""}`}
            onClick={() => {
              changePtype(2);
            }}
          >
            1개월
          </button>
          <button
            className={`tablinks ${ptype === 3 ? "on" : ""}`}
            onClick={() => {
              changePtype(3);
            }}
          >
            3개월
          </button>
        </div>
        <div className="spacer-20"></div>
        <div className="service-summary-detail-container">
          <div className="color-gray">이용건수</div>
          <div>{formatNumber(summary?.usage_count)} 건</div>
          <div className="color-gray">이용시간</div>
          <div>{summary?.usage_minute} 분</div>
          <div className="color-gray">이동거리</div>
          <div>{summary?.usage_meter} km</div>
          <div className="color-gray">탄소절감효과</div>
          <div>{summary?.carbon_reduction} kg</div>
        </div>
      </div>

      <hr />
      {usedList && usedList.length > 0 ? (
        // 1. 그냥 리스트
        // <div class="service-list-container">
        //   {usedList.map((item, idx) => {
        //     return (
        //       <>
        //         <div class="service-list-content">
        //           <div class="service-list-header">
        //             <span>{formatNumber(item.use_distance)}km</span>
        //             <span class="color-gray ml-10">
        //               {formatNumber(item.use_time)}분
        //             </span>
        //           </div>
        //           <div class="service-list-body">
        //             <div class="color-gray">이용시간</div>
        //             <div>
        //               {formatDate(item.use_start_dt)} ~{" "}
        //               {formatDate(item.use_end_dt)}
        //             </div>
        //             <div class="color-gray">결제일시</div>
        //             <div>{formatDate(item.pay_datetime)}</div>
        //             <div class="color-gray">결제수단</div>
        //             <div>
        //              {item.card_pay > 0
        //   ? `카드 ${formatNumber(item.card_pay)}원`
        //   : ""}
        // {item.card_pay > 0 && item.point_pay > 0 ? " + " : ""}
        // {item.point_pay > 0
        //   ? `포인트 ${formatNumber(item.point_pay)}P`
        //   : ""}
        //             </div>
        //           </div>
        //         </div>
        //         <hr />
        //       </>
        //     );
        //   })}
        // </div>

        <InfiniteScroll
          dataLength={usedList.length}
          next={fetchMoreData}
          hasMore={scrollMore}
        >
          {usedList.map((item, idx) => {
            return (
              <>
                <div class="service-list-content">
                  <div class="service-list-header">
                    <span>{formatNumber(item.use_distance)}km</span>
                    <span class="color-gray ml-10">
                      {formatNumber(item.use_time)}분
                    </span>
                  </div>
                  <div class="service-list-body">
                    <div class="color-gray">이용시간</div>
                    <div>
                      {formatDate(item.use_start_dt)} ~{" "}
                      {formatDate(item.use_end_dt)}
                    </div>
                    <div class="color-gray">결제일시</div>
                    <div>{formatDate(item.pay_datetime)}</div>
                    <div class="color-gray">결제수단</div>
                    <div>
                      {item.card_pay > 0
                        ? `카드 ${formatNumber(item.card_pay)}원`
                        : ""}
                      {item.card_pay > 0 && item.point_pay > 0 ? " + " : ""}
                      {item.point_pay > 0
                        ? `포인트 ${formatNumber(item.point_pay)}P`
                        : ""}
                    </div>
                  </div>
                </div>
                <hr />
              </>
            );
          })}
        </InfiniteScroll>
      ) : (
        <div className="service-empty">
          <div className="service-empty-container">
            <div className="service-empty-message">조회된 정보가 없습니다.</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
