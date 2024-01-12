import Header from './Header';
import Footer from './Footer';

const RootLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-4xl px-4 pt-8 pb-1">
      <div className="flex-grow">
        <Header />
        <main className="my-0 py-16">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
