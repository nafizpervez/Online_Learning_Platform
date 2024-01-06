import RootLayout from '@/components/Layout';

const Home = () => {
  return (
    <main>
      <h1 className="text-5xl font-bold text-gray-900 leading-[1.4] mb-5">
        Online Learning Platform
      </h1>
      <h2 className="text-3xl font-bold text-gray-900 leading-[1] mb-2">
        Developed by NafizPervez
      </h2>

    </main>
  );
};

Home.getLayout = (page) => {
  return <RootLayout>{page}</RootLayout>;
};

export default Home;
