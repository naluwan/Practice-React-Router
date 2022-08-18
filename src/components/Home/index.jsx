import Authenticate from '@/containers/Authenticate';

const Home = () => {
  return (
    <section data-name="Home">
      <div className="jumbotron">
        <h3 className="display-3">Hello React</h3>
        <Authenticate>
          <h1>這裡只有登入才看的到喔</h1>
        </Authenticate>
        <Authenticate>{({ CPY_NAME }) => <h1>{CPY_NAME}你好</h1>}</Authenticate>
      </div>
    </section>
  );
};

export default Home;
