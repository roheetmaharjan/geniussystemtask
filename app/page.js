import PieChart from './components/PieChart';
import TotalUsersChart from './components/TotalUsersChart';


const Home = () => {

  return (
    <>
      <div className="box__title">
        <h2>Dashboard</h2>
      </div>
      <div className="box__body">
        <div className="grid two_column">
          <div className="card">
            <div className="card__header">
              <h3 className='card__title'>Users</h3>
            </div>
            <div className="card__body">
              <TotalUsersChart />
            </div>
          </div>
          <div className="card">
            <div className="card__header">
              <h3 className='card__title'>Packages</h3>
            </div>
            <div className="card__body">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home
