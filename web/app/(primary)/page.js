const Home = () => {
  return (
    <main>
      <h1 className="text-4xl font-bold text-gray-900 leading-[1.5] mb-5">
        Online Learning Platform
      </h1>
      <h2 className="text-3xl font-bold text-gray-900 leading-[1] mb-2">
        Developed Using
      </h2>
      <p className="text-2xl text-gray-700 grid grid-flow-row grid-row-1">
        Front-End
        <div className="text-1xl text-gray-500 grid grid-flow-col">
          <div>Next.js</div>
          <div>PostCss</div>
          <div>React</div>
          <div>TailwindCss</div>
        </div>
      </p>
      <br></br>
      <p className="text-2xl text-gray-700 grid grid-flow-row grid-row-1">
        Database
        <div className="text-1xl text-gray-500 grid grid-flow-col">
          <div>SQlite</div>
          <div>PostgrSQL</div>
          <div>SQLAlchemy</div>
        </div>
      </p>
      <br></br>
      <p className="text-2xl text-gray-700 grid grid-flow-row grid-row-6">
        Back-End
        <div className="text-1xl text-gray-500 grid grid-flow-col">
          <div>Python</div>
          <div>FastApi</div>
          <div>Pydantic</div>
          <div>Uvicorn</div>
        </div>
      </p>
      <br></br>
      <p className="text-2xl text-gray-700 grid grid-flow-row grid-row-6">
        Unit Test
        <div className="text-1xl text-gray-500 grid grid-flow-col">
          <div>Pytest</div>
        </div>
      </p>
      <br></br>
      <p className="text-2xl text-gray-700 grid grid-flow-row grid-row-6">
        Containerization
        <div className="text-1xl text-gray-500 grid grid-flow-col">
          <div>Docker</div>
          <div>Docker-Compose</div>
        </div>
      </p>
      <br></br>
      <p className="text-2xl text-gray-700 grid grid-flow-row grid-row-6">
        Pipeline
        <div className="text-1xl text-gray-500 grid grid-flow-col">
          <div>Jenkins</div>
        </div>
      </p>
    </main>
  );
};

export default Home;
