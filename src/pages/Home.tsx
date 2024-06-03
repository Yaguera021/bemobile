import Header from "../components/Header/Header";
import Table from "../components/Table/Table";

import "./Home.scss";

const Home = () => {
  return (
    <div className='home-wrapper-container'>
      <Header />
      <section>
        <Table />
      </section>
    </div>
  );
};

export default Home;
