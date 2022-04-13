import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { formatPrice } from 'utils';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Avatar } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useEffect, useState } from 'react';
import statisticApi from 'api/statisticApi';
export default function FeaturedInfo() {
  const [income, setIncome] = useState(0)
  const [preInc, setPreInc] = useState(0)
  const [profit, setProfit] = useState(0)
  const [preProf, setPreProf] = useState(0)
  const [cost, setCost] = useState(0)
  const [preCost, setPreCost] = useState(0)
  useEffect(() => {
    (async () => {
      try {
        const { data } = await statisticApi.getReportLastTwoMonth()

        setIncome(data[1] ? data[1].income : data[0].income)
        setPreInc(data[1] ? ((Number.parseFloat(data[1].income) * 100) / (Number.parseFloat(data[0].profit)) - 100) : 0)
        setProfit(data[1] ? data[1].profit : data[0].profit)
        setPreProf(data[1] ? ((Number.parseFloat(data[1].profit) * 100) / (Number.parseFloat(data[0].profit)) - 100) : 0)
        setCost(data[1] ? data[1].cost : data[0].cost)
        setPreCost(data[1] ? ((Number.parseFloat(data[1].cost) * 100) / (Number.parseFloat(data[0].cost)) - 100) : 0)
      }




      catch (e) {
        alert(e.message)
      }
    })()
  })
  return (
    <div className="featured">
      <div className="featuredItem income">
        <p className="featuredTitle">

          <AccountBalanceIcon />
          <span>Doanh thu</span></p>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{formatPrice(income)}</span>
          <span className="featuredMoneyRate">
            {Math.floor(preInc)} {preInc < 0 ? <ArrowDownward className="featuredIcon negative" /> : <ArrowUpward className="featuredIcon" />}
          </span>
        </div>
        <span className="featuredSub">So với tháng trước</span>

      </div>
      <div className="featuredItem profit">
        <p className="featuredTitle"><AttachMoneyIcon /><span>Lợi nhuận</span></p>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{formatPrice(profit)}</span>
          <span className="featuredMoneyRate">
            {Math.floor(preProf)} {preProf < 0 ? <ArrowDownward className="featuredIcon negative" /> : <ArrowUpward className="featuredIcon" />}
          </span>
        </div>
        <span className="featuredSub">So với tháng trước</span>

      </div>
      <div className="featuredItem cost">
        <p className="featuredTitle"><MonetizationOnIcon /><span>Chi phí</span></p>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{formatPrice(cost)}</span>
          <span className="featuredMoneyRate">
            {Math.floor(preCost)} {preCost < 0 ? <ArrowDownward className="featuredIcon negative" /> : <ArrowUpward className="featuredIcon" />}
          </span>
        </div>
        <span className="featuredSub">So với tháng trước</span>

      </div>
    </div>
  );
}